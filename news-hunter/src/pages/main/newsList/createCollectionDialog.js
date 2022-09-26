import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { collectionsStateActions } from "../../../reducers/collectionsState";

function CreateCollectionDialog({ open, onClose, onClickCreateCollection }) {
  let colName = "";

  const dispach = useDispatch();

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        className="bg-dark"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10vh 5vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p className="fs-2 fw-bold">Create new collection?</p>
        <input
          type="text"
          class="form-control mt-3"
          id="floatingInput"
          placeholder="collection name!"
          onChange={(e) => (colName = e.target.value)}
        />
        <button
        className="btn btn-secondary mt-4" style={{}}
          onClick={() =>
            onClickCreateCollection(colName).then((collection) => {
              if (collection != null) {
                dispach(collectionsStateActions.addCollection(collection));
              }
              onClose();
            })
          }
        >
          create
        </button>
      </div>
    </Dialog>
  );
}

export default CreateCollectionDialog;
