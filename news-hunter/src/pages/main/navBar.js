import styles from "./navBar.module.css";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { useDispatch, useSelector } from "react-redux";
import { searchTextStateActions } from "../../reducers/searchTextState";
import { useNavigate } from "react-router";

function NavBar() {
  const dispach = useDispatch();

  const navigate = useNavigate();

  let search = "";

  const onSearch = (e) => {
    e.preventDefault();
    navigate("/app/search-redirect/" + search);
  };

  return (
    <div className={styles.navBar}>
      <button
        onClick={() => navigate("/app/main")}
        className="btn btn-dark fw-bold m-2"
        style={{ borderRadius: "999px" }}
      >
        Home
      </button>
      <button
        onClick={() => navigate("/app/collection")}
        className="btn btn-dark fw-bold m-2"
        style={{ borderRadius: "999px" }}
      >
        Collection
      </button>

      <form className={`${styles.searchBar} m-1 bg-dark text-white`} onSubmit={onSearch}>
        <SearchIcon style={{ marginLeft:"10px", marginRight:"5px" }} />
        <input
          onChange={(e) => (search = e.target.value)}
          style={{ marginRight: "10px" }}
          className={styles.searchInput}
          type="text"
        />
      </form>
      <button
        onClick={() => navigate("/app/profile")}
        className="btn btn-dark fw-bold m-2"
        style={{ borderRadius: "999px" }}
      >
        Profile
      </button>
    </div>
  );
}

export default NavBar;
