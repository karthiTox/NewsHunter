import styles from "./newsCard.module.css";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router";
import { margin } from "@mui/system";

function NewsCard({ className, width, height, news, onSave, isSaved }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/newsDetails", { state: news, replace: true });
  };
  
  return (
    <div style={{ width, position: "relative", backgroundColor:"royalblue", borderRadius:"20px" }}>
      <div className={styles.shadow} onClick={handleClick} />
      <img
        className={styles.newsImage}
        style={{
          zIndex: "0",
        }}
        src={news.imgUrl}
        alt={""}
        onError={(e) => (e.target.style.display = "none")}
      />

      <div className={styles.shadow} onClick={handleClick} />

      <div style={{ position: "relative", zIndex: "1", padding: "10px" }}>
        <div style={{ height, display: "flex" }}>
          <a
            style={{ height: "100%", width: "100%" }}
            href={news.url}
            target="_blank"
          ></a>
        </div>
        <div className={styles.buttonRow}>
          <a
            style={{ width: "55%", borderRadius: "999px", marginRight: "5%" }}
            className="btn btn-dark"
            href={news.url}
            target="_blank"
          >
            <div
              className="fs-6 fw-bold text-center"
              style={{
                margin: "5%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {news.url}
            </div>
          </a>
          <button
            style={{ width: "40%", borderRadius: "999px" }}
            className={`btn ${isSaved ? "btn-success" : "btn-secondary"}`}
            onClick={onSave}
          >
            <div
              className="fs-6 fw-bold text-center"
              style={{
                margin: "5%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isSaved ? "remove" : "Save"}
            </div>
          </button>
        </div>
        <p className="fs-6 fw-bold text-white text-center p-3">
          {news.headlines}
        </p>
      </div>
    </div>
    // <div
    //   style={{ width, height }}
    //   className={className + " " + styles.newsCard}
    // >
    //   <img
    //     className={styles.newsImage}
    //     src={news.imgUrl}
    //     alt={""}
    //     onError={(e) => (e.target.style.display = "none")}
    //   />
    //   <div className={styles.shadow} onClick={handleClick} />

    //   <div className={styles.content}>
    //     <a
    //       style={{ height: "100%", width: "100%" }}
    //       href={news.url}
    //       target="_blank"
    //     ></a>
    //     <div className={styles.buttonRow}>
    //       <a
    //         style={{ width: "55%", borderRadius: "999px", marginRight: "5%" }}
    //         className="btn btn-dark"
    //         href={news.url}
    //         target="_blank"
    //       >
    //         <div
    //           className="fs-6 fw-bold text-center"
    //           style={{
    //             margin: "5%",
    //             whiteSpace: "nowrap",
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //           }}
    //         >
    //           {news.url}
    //         </div>
    //       </a>
    //       <button
    //         style={{ width: "40%", borderRadius: "999px" }}
    //         className={`btn ${isSaved ? "btn-success" : "btn-secondary"}`}
    //         onClick={onSave}
    //       >
    //         <div
    //           className="fs-6 fw-bold text-center"
    //           style={{
    //             margin: "5%",
    //             whiteSpace: "nowrap",
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //           }}
    //         >
    //           {isSaved ? "remove" : "Save"}
    //         </div>
    //       </button>
    //     </div>
    //     <div className={styles.headlinesRow}>
    //       <div
    //         className="fs-6 fw-bold text-center"
    //         style={{
    //           margin: "5%",
    //           whiteSpace: "nowrap",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //         }}
    //       >
    //         {news.headlines}
    //       </div>
    //     </div>
    //   </div>

    /* <div className={styles.content}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <a
            style={{
              borderRadius: "999px",
              width: "60%",
              marginRight: "5%",
              overflow: "hidden",
            }}
            className={styles.truncate + " btn btn-dark"}
            href="#"
          >
            https://i.pinimg.com/originals/dd/b2/bc/ddb2bc5f6a127be7d0c493a9617ab466.jpg
          </a>
          <a
            style={{ borderRadius: "999px", width: "35%" }}
            className={styles.truncate + " btn btn-light"}
            onClick={onSave}
          >
            {isSaved ? "remove" : "Save"}
          </a>
        </div>
        <p className="fs-4 fw-bold" style={{textOverflow:"ellipsis", width:"100%", height:"20"}}>{news.headlines}</p>
      </div> */
    // </div>
  );
}

export default NewsCard;
