import NewsService from "../services/newsService";
import AuthService from "../services/authService";
import SelectCollectionDialog from "./main/newsList/selectCollectionDialog";
import NewsCard from "./main/newsList/newsCard";

function TestPage() {
  return (
    <NewsCard width="300px" news={{

      newsId: "wdw",
      url:"this is test",
      imgUrl:"",
      headlines:"this is test this is test this is test this is test this is test this is test this is test this is test"

    }}/>
  );
}

export default TestPage;
