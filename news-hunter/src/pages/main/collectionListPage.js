import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionList from "./collectionList/collectionList";
import NavBar from "./navBar";

function CollectionListPage({ authService, newsService }) {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    authService.isAuth().then(setIsAuth);
  }, []);

  return (
    <div>
      <NavBar />
      {isAuth == true ? (
        <CollectionList
          fetchCollection={(page) => newsService.fetchAllCollections(page)}
        />
      ) : (
        <div className="text-white mt-5" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <p className="fs-5 text-center">In case if your not logged In! please Login</p>
          <button className="btn btn-secondary" onClick={() => navigate("/app/welcome")}>Login</button>
        </div>
      )}
    </div>
  );
}

export default CollectionListPage;
