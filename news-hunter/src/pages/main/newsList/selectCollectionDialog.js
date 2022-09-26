import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectionsStateActions } from "../../../reducers/collectionsState";

function SelectCollectionDialog({
  open,
  onClose,
  fetchCollections,
  onSubmit,
  onClickAddCollection,
}) {
  const collectionsState = useSelector((state) => state.collectionsState);
  const dispach = useDispatch();

  useEffect(() => {
    fetchCollections().then((collections) =>
      dispach(collectionsStateActions.setCollectionsState(collections))
    );
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        className="bg-dark"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p className="fs-2 fw-bold">Where you need to store?</p>

        <div style={{ width:"100%", maxHeight: "40vh", overflowY: "scroll" }}>
          {collectionsState.map((col, index) => (
            <button
              className="btn btn-primary m-1"
              style={{ width: "80%", backgroundColor: "royalblue" }}
              key={index}
              onClick={() => {
                onSubmit(col);
              }}
            >
              {col.colName}
            </button>
          ))}
        </div>

        <button
          className="btn btn-secondary mt-3"
          style={{ width: "80%" }}
          onClick={() => onClickAddCollection()}
        >
          create new collection
        </button>
      </div>
    </Dialog>
  );
}

export default SelectCollectionDialog;
