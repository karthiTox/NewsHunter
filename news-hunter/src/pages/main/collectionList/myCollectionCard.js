import styles from "./colCard.module.css";
import Arrow from "@mui/icons-material/ArrowForwardIosRounded";
import { display } from "@mui/system";

function MyCollectionCard({ col, onClickCol, onRemove }) {
  return (
    <div
      className={`bg-dark col text-white`}
      style={{
        padding: "20px",
        margin: "10px",
        borderRadius: "15px",
        color: "white",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center"
      }}
    >
      <div style={{width:"100%"}} onClick={()=>onClickCol(col)}>
        <p className="fs-4 fw-bold">{col.colName}</p>
        <p className="fs-6">collected by You</p>
      </div>
      <div style={{display:"flex", flexDirection:"column"}}>
        <button
          className="btn btn-dark"
          onClick={() => onClickCol(col)}
        >
          edit
        </button>
        <button
          className="btn btn-dark"
          onClick={() => onRemove(col)}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default MyCollectionCard;
