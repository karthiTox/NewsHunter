import styles from "./signupPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../reducers/authReducer";
import { useState } from "react";
import { Alert } from "@mui/material";
import bgImg from "../../assets/img/bg.jpg"

function SignupPage({ authService }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const authReducer = useSelector((state) => state.authReducer);
  const dispach = useDispatch();

  const handleSignup = function (e) {
    e.preventDefault();

    authService.signup(firstName, lastName, authReducer.email).then(isSuccess => {
      navigate("/app/checkMail")
    }).catch((error)=>{
      setError(error.message)
    })
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignup} className={styles.box}>
        <h2 className={styles.text}>Signuuuuuuuuuuppppppp!</h2>
        <input
          type="text"
          class="form-control mt-2"
          id="floatingInput"
          placeholder="Firstname"
          onChange={(e) => (setFirstName(e.target.value))}
        />
        <input
          type="text"
          class="form-control mt-2"
          id="floatingInput"
          placeholder="Lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          class="form-control mt-2"
          id="floatingInput"
          placeholder="email"          
          onChange={(e) => (dispach(authActions.changeEmail(e.target.value)))}
        />
        <p style={{color:"white"}}>{error}</p>
        <button className="btn btn-primary" style={{backgroundColor:"royalblue"}} type="submit">
          register
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
