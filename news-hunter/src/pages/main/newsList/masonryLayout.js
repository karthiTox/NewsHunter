import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";
import NewsCard from "./newsCard";

function MasonryLayout({
  fetchNewsFromServer,
  onClickSave,
  onClickRemove,
  checkIfNewsSaved,
}) {
  const breakpoints = {
    320: 1,
    500: 2,
    760: 3,
    1024: 4,
    1440: 5,
    1750: 7,
  };

  const width = "100%";
  const small = "100px";
  const medium = "150px";
  const large = "175px";

  const [newsList, setNewsList] = useState([]);
  const [newsListHeight, setNewsListHeight] = useState([]);
  let isLoading = false;
  let page = 0;

  // on init
  useEffect(() => {
    fetchNews();
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pickRandomHeight = () => {
    const rand = Math.random() * 100;
    if (rand < 33) {
      return small;
    } else if (rand > 66) {
      return large;
    } else {
      return medium;
    }
  };

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    let offset = 200;

    if (userScrollHeight >= windowBottomHeight - offset) {
      fetchNews();
    }
  };

  const fetchNews = async () => {
    if (isLoading) return;
    isLoading = true;

    console.count("fetching news!");

    const news = await fetchNewsFromServer(page);
    setNewsList((data) => data.concat(news));
    setNewsListHeight((data) =>
      data.concat(news.map(() => pickRandomHeight()))
    );

    if (news.length != 0) page++;

    isLoading = false;
  };

  return (
    <div>
      {newsList.length != 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
          <Masonry>
            {newsList.map((newsData, index) => (
              <div key={index} style={{ padding: "5px" }}>
                <NewsCard
                  width={width}
                  height={newsListHeight[index]}
                  news={newsData}
                  onSave={() =>
                    checkIfNewsSaved(newsData)
                      ? onClickRemove(newsData)
                      : onClickSave(newsData)
                  }
                  isSaved={checkIfNewsSaved(newsData)}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="text-white text-center">
          <p className="fs-4">May be empty or data is loading</p>
          <p className="fs-6">please wait or try again later!</p>
        </div>
      )}
    </div>
  );
}

export default MasonryLayout;
