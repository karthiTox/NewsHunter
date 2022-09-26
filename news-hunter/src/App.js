import bg from "./assets/img/bg.jpg";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

function App() {
  return (
    <div className="main">
      <img className="bg-image" src={bg} alt="" />

      <Stack spacing={2} className="app">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <input className="text-field" placeholder="Email" />
        <input className="text-field" placeholder="password" />
        <p style={{ textAlign: "center" }}>Forget your password?</p>
        <button className="btn">Login</button>
        <p style={{ textAlign: "center" }}>OR</p>
        <button className="btn">Continue with google</button>

        <Link to="/signup" style={{ textAlign: "center", color: "blue" }}>
          Not have an acount? Signup
        </Link>
      </Stack>
    </div>
  );
}

export default App;
