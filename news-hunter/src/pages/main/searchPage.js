import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import NavBar from "./navBar";
import NewsList from "./newsList/newsList";

function SearchPage({ authService, newsService }) {
  
  const p = useParams();

  const fechNews = (page) => {
    return newsService.fetchNewsBySearch(
      p.searchText.split("%20").join("+"),
      page
    )
  }

  return (
    <div>
      <NavBar />
      <div>
        {  
        <div id={p.searchText}>
          <NewsList
            fetchNewsFromServer={fechNews}
            authService={authService}
            newsService={newsService}
          />
        </div>      
        }
      </div>
    </div>
  );
}

export default SearchPage;
