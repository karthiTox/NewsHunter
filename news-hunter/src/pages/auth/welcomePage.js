import styles from "./welcomePage.module.css";
import { useNavigate } from "react-router-dom";

import bgImg from "../../assets/img/bg.jpg"

function WelcomePage({ authRepository }) {
  let navigate = useNavigate(); 
  
  const navigateToLoginPage = () =>{     
    navigate("/app/login");
  }

  const navigateToSignupPage = () =>{     
    navigate("/app/signup");
  }

  return (
    <div class={`text-secondary px-4 py-5 text-center`} style={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
    <div class="py-5">,
      <h1 class="display-5 fw-bold text-white">Welcome to the NewsHunter</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4" style={{overflowWrap:"break-word"}}>WOOOOOOOOOOWWWWWWW!</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-primary btn-lg" style={{backgroundColor:"royalblue"}} onClick={() => navigate("/app/main")}>Jump right in!</button>
          <button type="button" class="btn btn-secondary btn-lg px-4" onClick={navigateToLoginPage}>Login</button>
          <button type="button" class="btn btn-secondary btn-lg px-4" onClick={navigateToSignupPage}>Register</button>
        </div>
      </div>
    </div>
  </div>
    // <div className={styles.container}>
    //   <div className={styles.box}>
    //     <h2 className={styles.text}>Welcome to the NewsHunter!</h2>
    //     <button className="btn" onClick={navigateToLoginPage}>Login</button>
    //     <button className="btn" style={{marginTop:"10px"}} onClick={navigateToSignupPage}>Signup</button>
    //   </div>
    // </div>
  );
}

export default WelcomePage;
