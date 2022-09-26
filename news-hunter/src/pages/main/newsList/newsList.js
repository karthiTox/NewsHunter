import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateCollectionDialog from "./createCollectionDialog";
import Masonry from "./masonryLayout";
import SelectCollectionDialog from "./selectCollectionDialog";
import { mappingsStateActions } from "../../../reducers/mappingsState";
import UnAuthAckDialog from "./unAuthAckDialog";

function NewsList({ fetchNewsFromServer, authService, newsService }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [openCreateCol, setOpenCreateCol] = useState(false);
  const [openUnAuthAck, setOpenUnAuthAck] = useState(false);

  const mappingsState = useSelector((state) => state.mappingsState);
  const dispach = useDispatch();

  useEffect(() => {
    newsService
      .getMyMappings()
      .then((mappings) =>
        dispach(mappingsStateActions.setMappingsState(mappings))
      );
  }, []);

  const showCollectionsList = (news) => {
    setSelectedNews(news);
  };

  const closeCollectionsList = () => {
    setSelectedNews(null);
  };

  const showCreateCollection = (news) => {
    setOpenCreateCol(true);
  };

  const closeCreateCollection = () => {
    setOpenCreateCol(false);
  };

  const showUnAuthAck = (news) => {
    setOpenUnAuthAck(true);
  };

  const closeUnAuthAck = () => {
    setOpenUnAuthAck(false);
  };

  return (
    <div style={{ margin: "20px 10%" }}>
      <Masonry
        fetchNewsFromServer={fetchNewsFromServer}
        onClickSave={async (news) => {
          const isAuth = await authService.isAuth();
          if (isAuth) {
            showCollectionsList(news);
          } else {
            showUnAuthAck();
          }
        }}
        onClickRemove={(news) => {
          newsService
            .removeNews(news.newsId, mappingsState[news.newsId])
            .then(() => {
            });
            dispach(mappingsStateActions.removeMappingsByNewsId(news.newsId));
        }}
        checkIfNewsSaved={(news) => news.newsId in mappingsState}
      />

      <UnAuthAckDialog open={openUnAuthAck} onClose={closeUnAuthAck} />

      <SelectCollectionDialog
        open={selectedNews != null}
        onClose={closeCollectionsList}
        fetchCollections={() => newsService.fetchMyCollections()}
        onSubmit={(selectedCol) => {
          newsService.saveNews(selectedNews, selectedCol).then(() => {});
          dispach(
            mappingsStateActions.addMappings([
              { [selectedNews.newsId]: selectedCol.colId },
            ])
          );
          closeCollectionsList();
        }}
        onClickAddCollection={showCreateCollection}
      />

      <CreateCollectionDialog
        open={openCreateCol}
        onClose={closeCreateCollection}
        onClickCreateCollection={(colName) =>
          newsService.createCollection(colName)
        }
      />
    </div>
  );
}

export default NewsList;
