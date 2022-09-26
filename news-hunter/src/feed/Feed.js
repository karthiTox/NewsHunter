import "./feed.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../reducers/authReducer";

function Feed() {
  // const Post = ({ widthV, heightV }) => {
  //   const s = { width: widthV + "px", height: heightV + "px" };

  //   return (
  //     <div className="news-post" style={s}>
  //       <img className="news-image" src={img} alt="" />

  //       <div className="news-content">
  //         <button className="button">Link</button>
  //         <div className="bottom-content">
  //           <p style={{ margin: "0px 20px" }}>Galaxy!!! Let's occupy it!</p>
  //           <div className="action-bar">
  //             <button className="button" style={{ flexGrow: 8 }}>
  //               box
  //             </button>
  //             <button className="button">Save</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const min = 300;
  // const max = 400;
  // const random = () => min + Math.random() * (max - min);

  const authReducer = useSelector((state) => state.authReducer);
  const dispach = useDispatch();

  return (
    <div>
      <p>value: {authReducer.isAuth ? "true" : "false"}</p>
      <button onClick={() => dispach(authActions.setIsAuth(true))}>click</button>
    </div>
  );

  // <div>
  //   <div id="list">
  //     <div className="item" style={{ height: "14em" }}>1</div>
  //     <div className="item" style={{ height: "26em" }}>2</div>
  //     <div className="item" style={{ height: "8em" }}>3</div>
  //     <div className="item" style={{ height: "14em" }}>4</div>
  //     <div className="item" style={{ height: "8em" }}>5</div>
  //     <div className="item" style={{ height: "18em" }}>6</div>
  //     <div className="item" style={{ height: "16em" }}>7</div>
  //     <div className="item" style={{ height: "12em" }}>8</div>

  //   </div>
  // </div>
  // );
}

export default Feed;
