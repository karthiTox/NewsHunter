import bg from "./assets/img/bg.jpg";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="main">
      <img className="bg-image" src={bg} alt="" />

      <div className="app">
        <h1>Signup</h1>
        <input className="text-field" placeholder="Email" />
        <input className="text-field" placeholder="password" />
        <p style={{ textAlign: "center" }}>Forget your password?</p>
        <button className="btn">Login</button>
        <p style={{ textAlign: "center" }}>OR</p>
        <button className="btn">Continue with google</button>

        <Link to="/" style={{ textAlign: "center" }}>
          Not have an acount? Signup
        </Link>
      </div>
    </div>
  );
}

export default Signup;
