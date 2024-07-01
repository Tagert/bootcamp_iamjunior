import styles from "./Login.module.scss";
import { useState } from "react";
import { LoginForm } from "../components/login/LoginForm";
import { RegisterForm } from "../components/register/RegisterForm";
import { Page } from "../components/template/Page";

export const Login: React.FC = () => {
  const [type, setType] = useState<string>("signIn");

  const handleOnClick = (text: string): void => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    styles.container +
    " " +
    (type === "signUp" ? styles["right-panel-active"] : "");

  return (
    <Page>
      <div className={styles.loginContainer}>
        <h2>Sign in/up Form</h2>
        <div className={containerClass} id="container">
          <div
            className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
          >
            <LoginForm />
          </div>
          <div
            className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
          >
            <RegisterForm />
          </div>
          <div className={styles["overlay-container"]}>
            <div className={styles.overlay}>
              <div
                className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
              >
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={styles.ghost}
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div
                className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
              >
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className={styles.ghost}
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
