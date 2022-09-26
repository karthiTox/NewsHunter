import { Dialog } from "@mui/material";
import { textAlign } from "@mui/system";
import { useNavigate } from "react-router";

function UnAuthAckDialog({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <div
        className="bg-dark"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p className="fs-2 fw-bold">Oops! Your are not logged-in!</p>
        <p className="fs-6 mt-3">You can save the news when you are logged-in</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/app/welcome")}
        >
          log in
        </button>
      </div>
    </Dialog>
  );
}

export default UnAuthAckDialog;
