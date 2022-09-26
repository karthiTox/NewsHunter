import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CollectionCard from "./collectionCard";

function CollectionList({ fetchCollection }) {
  const [colList, setColList] = useState([]);
  const navigate = useNavigate();

  let page = 0;
  let isLoading = false;

  useEffect(() => {
    fetchCollections();
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    let offset = 200;

    if (userScrollHeight >= windowBottomHeight - offset) {
      fetchCollections();
    }
  };

  const fetchCollections = async () => {
    if (isLoading == true) return;
    isLoading = true;

    console.count("fetching collections " + page);
    const collections = await fetchCollection(page);
    if (collections.length != 0) {
      setColList((data) => data.concat(collections));
      page++;
    }

    isLoading = false;
  };

  const handleOnClickCol = (col) => {
    navigate("/app/collectionView", { state: col, replace: true });
  };

  return (
    <div>
      <p className="fs-3 fw-bold text-white text-center mt-2">collections of others</p>
      <p className="fs-6 text-white text-center mt-2">Scroll down to load more!</p>
      <div
        className="row row-cols-1 row-cols-lg-3 justify-content-center align-items-stretch"
        style={{ margin: "20px 10vw" }}
      >
        {colList.map((c, index) => {
          return (
            <CollectionCard
              key={index}
              col={c}
              onClickCol={(col) => handleOnClickCol(col)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CollectionList;
