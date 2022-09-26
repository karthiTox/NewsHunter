import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import NavBar from "./navBar";
import NewsList from "./newsList/newsList";

function SearchPageRedirectPage() {
  const p = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/search/" + p.searchText);
  }, []);

  return <div></div>;
}

export default SearchPageRedirectPage;
