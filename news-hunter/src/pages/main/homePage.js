import NavBar from "./navBar";
import NewsList from "./newsList/newsList";

function HomePage({ authService, newsService }) {
  return (
    <div className="app-background">
      <NavBar />
      <NewsList
        fetchNewsFromServer={(page) =>
          newsService.fetchNewsBySearch("world+news", page)
        }
        authService={authService}
        newsService={newsService}
      />
    </div>
  );
}

export default HomePage;
