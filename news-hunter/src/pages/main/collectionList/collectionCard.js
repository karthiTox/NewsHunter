import styles from "./colCard.module.css"
import Arrow from "@mui/icons-material/ArrowForwardIosRounded";

function CollectionCard({ col, onClickCol }) {
  return (
    <div
      className={`${styles.colCard} col text-white`}
      style={{
        padding: "20px",
        margin: "10px",
        borderRadius: "15px",
        color: "white",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"      
      }}
      onClick={() => onClickCol(col)}
    >
      <div>        
        <p className="fs-4 fw-bold">{col.colName}</p>
        <p className="fs-6">
          collected by {col.extra.owner.firstName} {col.extra.owner.lastName}
        </p>
      </div>
      <Arrow />
    </div>
  );
}

export default CollectionCard;
