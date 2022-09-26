"use strict";

const urlLib = require("url");
const axios = require("axios");
const sha1 = require("crypto-js/sha1");
const base64 = require("crypto-js/enc-base64url");

const news = require("./news.json");
const tokens = require("./keys.json");

module.exports = async (req, res) => {
  const urlObject = urlLib.parse(req.url, true);  
  const query = urlObject.query;

  try {
    const v = await fetchNews(query.searchTerm, query.count, query.offset);    
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(v));
    res.end();
  } catch (error) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(news));
    res.end();
  }
};

const rapid_api_bing_host = "bing-news-search1.p.rapidapi.com";
const rapid_api_token = tokens.rapid_api_token;

async function fetchNews(query, count, offset) {
  const bing_req_headers = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": rapid_api_bing_host,
    "X-RapidAPI-Key": rapid_api_token,
  };

  const world = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: (query || "").split(" ").join("+"),
      count: count,
      offset: offset,
      cc: "IN",
      safeSearch: "Off",
      textFormat: "Raw",
    },
    headers: bing_req_headers,
  };

  const world_response = await axios.request(world);

  if (world_response.data.value.length < count / 2) {
    return [];
  } else {
    const result = [];

    world_response.data.value.forEach((data) => {
      try {
        let imageUrl = "";

        try {
          const image = data.image.thumbnail;
          imageUrl = `${image.contentUrl}&w=${image.width}&h=${image.height}`;
        } catch {
          imageUrl = "";
        }

        result.push({
          newsId: base64.stringify(sha1(data.url)),
          url: data.url,
          imgUrl: imageUrl,
          headlines: data.name,
          description: data.description,
        });
        return result;
      } catch {
        return;
      }
    });

    return result;
  }
}
