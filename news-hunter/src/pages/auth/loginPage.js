import styles from "./loginPage.module.css";
import bgImg from "../../assets/img/bg.jpg"

function LoginPage({ authRepository }) { 
  return (
    <div className={styles.container}>
      <h2 className="text-white" style={{textAlign:"center"}}>Powered by ZOHO catalyst</h2>
      <div className={styles.box} id="login-catalyst-frame"></div>     
      {window.catalyst.auth.signIn("login-catalyst-frame")}
    </div>
  );
}

export default LoginPage;
