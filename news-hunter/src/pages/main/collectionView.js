import { useLocation } from "react-router-dom";
import NavBar from "./navBar";
import NewsList from "./newsList/newsList";

function CollectionViewPage({ authService, newsService }) {
  const location = useLocation();
  const state = location.state;

  return (
    <div>
      <NavBar />
      <p className="fs-4 fw-bold text-center text-white mt-3">{state.colName}</p>      
      
      <NewsList
        fetchNewsFromServer={(page) =>
          page == 0 ? newsService.fetchAllNewsOfCol(state) : []
        }
        authService={authService}
        newsService={newsService}
      />
    </div>
  );
}

export default CollectionViewPage;
