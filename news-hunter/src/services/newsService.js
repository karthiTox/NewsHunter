import sha1 from "crypto-js/sha1";
import base64 from "crypto-js/enc-base64url";

class NewsService {
  static newsService = null;

  static getInstance() {
    if (this.newsService == null) {
      this.newsService = new NewsService();
    }
    return this.newsService;
  }

  constructor() {
    this.auth = window.catalyst.auth;
    this.datastore = window.catalyst.table;
    this.zcql = window.catalyst.ZCatalystQL;

    this.userTable = this.datastore.tableId("users");
    this.colTable = this.datastore.tableId("collections");
    this.newsTable = this.datastore.tableId("news");
    this.mappingsTable = this.datastore.tableId("mappings");

    this.userManagement = window.catalyst.userManagement;

    this.function = window.catalyst.function;
    this.bing_news_fetcher = this.function.functionId("bing_news_fetcher");

    this.createUser();
  }

  async createUser() {
    const response = await this.userManagement.getCurrentProjectUser();
    if ((await this.getUser(response.content.user_id)) == null) {
      await this.userTable.addRow([
        {
          userId: response.content.user_id,
          firstName: response.content.first_name,
          lastName: response.content.last_name,
        },
      ]);
      console.log("created user");
    } else {
      console.log("user exists");
    }
  }

  size = 30;

  async fetchNewsBySearch(searchTerm, page) {
    var functionPromise = this.bing_news_fetcher.execute({
      args: { searchTerm, count: this.size, offset: page * this.size },
      method: "GET",
    });
    const response = await functionPromise;

    if (response.status == 200) {
      return await response.json();
    } else {
      return [];
    }
  }

  async fetchAllNewsIdsOfCol(col) {
    const query = `select * from mappings where colId = '${col.colId}'`;

    var zcqlResponse = await this.zcql.executeQuery(query);

    const result = {};

    zcqlResponse.content.forEach((d) => {
      const map = d.mappings;
      result[map.newsId] = map.colId;
    });

    return result;
  }

  async fetchAllNewsById(newsIds) {
    if (newsIds == null || newsIds.length == 0) return [];

    const query = `select * from news where newsId in (${newsIds
      .map((c) => `'${c}'`)
      .join(",")})`;

    var zcqlResponse = await this.zcql.executeQuery(query);

    return zcqlResponse.content.map((d) => {
      const news = d.news;
      return {
        newsId: news.newsId,
        url: news.url,
        imgUrl: news.imgUrl,
        headlines: news.headlines,
        description: news.description,
      };
    });
  }

  async fetchAllNewsOfCol(col) {
    return this.fetchAllNewsById(
      Object.keys(await this.fetchAllNewsIdsOfCol(col))
    );
  }

  async createCollection(name) {
    // TODO check globally
    const response = await this.userManagement.getCurrentProjectUser();

    const col = {
      colId: base64.stringify(sha1(response.content.user_id + "_" + name)),
      colName: name,
      ownerId: response.content.user_id,
    };

    var zcqlResponse = await this.zcql.executeQuery(
      "select * from collections where colName = " +
        col.colName +
        " and ownerId = " +
        col.ownerId
    );

    if (zcqlResponse.content.length > 0) return null;

    await this.colTable.addRow([col]);

    return col;
  }

  async removeCollection(collectionId) {
    if (collectionId == null) return;

    await this.zcql.executeQuery(
      "delete from collections where colId = '" + collectionId + "'"
    );

    await this.zcql.executeQuery(
      "delete from mappings where colId = '" + collectionId + "'"
    );

    return collectionId;
  }

  async fetchMyCollections() {
    const response = await this.userManagement.getCurrentProjectUser();

    var zcqlResponse = await this.zcql.executeQuery(
      "select * from collections where ownerId = " + response.content.user_id
    );

    return zcqlResponse.content.map((d) => {
      return {
        colId: d.collections.colId,
        colName: d.collections.colName,
        ownerId: response.content.user_id,
      };
    });
  }

  async fetchAllCollections(page) {
    const response = await this.userManagement.getCurrentProjectUser();

    var zcqlResponse = await this.zcql.executeQuery(
      `select * from collections limit ${this.size} offset ${
        page * this.size + 1
      }`
    );

    const result = [];

    for (let index = 0; index < zcqlResponse.content.length; index++) {
      const d = zcqlResponse.content[index];
      result.push({
        colId: d.collections.colId,
        colName: d.collections.colName,
        ownerId: d.collections.ownerId,
        // totalItemsCount: await this.fetchCollectionItemsCount(
        //   d.collections.colName
        // ),
        extra: {
          owner: await this.getUser(d.collections.ownerId),
        },
      });
    }

    return result;
  }

  async fetchCollectionItemsCount(colId) {
    await this.userManagement.getCurrentProjectUser();

    var zcqlResponse = await this.zcql.executeQuery(
      `select count(newsId) from mappings where colId = '${colId}'`
    );

    return zcqlResponse.content[0].mappings.newsId;
  }

  async getMyMappings() {
    const mycols = await this.fetchMyCollections();
    const query =
      "select * from mappings where colId in (" +
      mycols.map((c) => `'${c.colId}'`).join(",") +
      ")";

    var zcqlResponse = await this.zcql.executeQuery(query);

    const result = {};

    zcqlResponse.content.forEach((d) => {
      const map = d.mappings;
      result[map.newsId] = map.colId;
    });

    console.log(result);
    return result;
  }

  async saveNews(news, collection) {
    if (news == null || collection == null) return;
    console.log("saving", news, "on", collection);

    const map = {
      newsId: news.newsId,
      colId: collection.colId,
    };

    var zcqlResponse = await this.zcql.executeQuery(
      "select * from mappings where newsId = '" +
        map.newsId +
        "' and colId = '" +
        map.colId +
        "'"
    );

    if (zcqlResponse.content.length > 0)
      return console.log("mappings already exists");

    zcqlResponse = await this.zcql.executeQuery(
      "select * from news where newsId = '" + news.newsId + "'"
    );

    if (zcqlResponse.content.length == 0) await this.newsTable.addRow([news]);

    await this.mappingsTable.addRow([map]);

    return map;
  }

  async removeNews(newsId, collectionId) {
    if (newsId == null || collectionId == null) return;
    console.log("remove", newsId, "on", collectionId);

    const map = {
      newsId: newsId,
      colId: collectionId,
    };

    await this.zcql.executeQuery(
      "delete from mappings where newsId = '" +
        map.newsId +
        "' and colId = '" +
        map.colId +
        "'"
    );

    return map;
  }

  cache = {};

  async getUser(userId) {
    if (userId in this.cache) {
      return this.cache[userId];
    }

    var zcqlResponse = await this.zcql.executeQuery(
      "select * from users where userId = '" + userId + "' limit 1"
    );

    if (zcqlResponse.content.length <= 0) return null;

    this.cache[userId] = {
      userId: userId,
      firstName: zcqlResponse.content[0].users.firstName,
      lastName: zcqlResponse.content[0].users.lastName,
    };

    return this.cache[userId];
  }
}

export default NewsService;
