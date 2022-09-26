import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

import { collectionsStateActions } from "../../reducers/collectionsState";
import { mappingsStateActions } from "../../reducers/mappingsState";
import MyCollectionCard from "./collectionList/myCollectionCard";
import CreateCollectionDialog from "./newsList/createCollectionDialog";

function ProfilePage({ authService, newsService }) {
  const [isAuth, setIsAuth] = useState(false);
  const [openCreateCol, setOpenCreateCol] = useState(false);

  const collectionsState = useSelector((state) => state.collectionsState);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService.isAuth().then(setIsAuth);
    newsService
      .fetchMyCollections()
      .then((collections) =>
        dispach(collectionsStateActions.setCollectionsState(collections))
      );
  }, []);

  const handelOnRemove = (col) => {
    newsService.removeCollection(col.colId).then(() => {
      dispach(collectionsStateActions.removeCollection(col.colId));
      dispach(mappingsStateActions.removeMappingsByColId(col.colId));
    });
  };

  const showCreateCollection = (news) => {
    setOpenCreateCol(true);
  };

  const closeCreateCollection = () => {
    setOpenCreateCol(false);
  };

  return (
    <div>
      <NavBar />
      {isAuth == true ? (
        <div>
          <p className="fs-3 fw-bold text-white text-center mt-2">
            My Collections
          </p>
          <p className="fs-6 text-white text-center mt-2">
            if you don't see any collections then start creating collctions!
          </p>
          <div
            className="row row-cols-1 row-cols-lg-3 justify-content-center align-items-stretch"
            style={{ margin: "20px 10vw" }}
          >
            <button
              style={{ padding: "20px", margin: "10px", borderRadius: "15px" }}
              className="fs-5 col btn btn-dark"
              onClick={showCreateCollection}
            >
              create new collection
            </button>

            {collectionsState.map((c, index) => (
              <MyCollectionCard
                key={index}
                col={c}
                onRemove={handelOnRemove}
                onClickCol={(col) => {
                  navigate("/app/collectionView", {
                    state: col,
                    replace: true,
                  });
                }}
              />
            ))}

            <button
              style={{ padding: "20px", margin: "10px", borderRadius: "15px" }}
              className="fs-5 col btn btn-dark"
              onClick={() => {
                authService.logout();
                dispach(collectionsStateActions.setCollectionsState({}));
                dispach(mappingsStateActions.setMappingsState({}));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div
          className="text-white mt-5"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="fs-5 text-center">
            In case if your not logged In! please Login
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/app/welcome")}
          >
            Login
          </button>
        </div>
      )}
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

export default ProfilePage;
