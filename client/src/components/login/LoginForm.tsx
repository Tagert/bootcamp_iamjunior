import styles from "./LoginForm.module.scss";
import eyeShow from "../../assets/eye_see_show_icon.svg";
import eyeInactive from "../../assets/disable_eye_inactive_icon.svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { useAuth } from "../../context/auth/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { user, login, isError, errorMessage } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (user !== null) {
        navigate(routes.HOME);
      }
    }, 800);
  }, [user, navigate]);

  const handleLogin = () => {
    login(email, password);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className={styles.login_card}>
      <div className={styles.login_modal} id="loginModal">
        <div className={styles.active_login}>
          <h4>Welcome back</h4>
          <p>Please enter your login and password!</p>
          <div className={styles.input}>
            <div className={styles.username_box}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Your email"
                autoComplete="on"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.username_info_error}>
              <p className={styles.username_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.password_box}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                onKeyDown={handleKeyDown}
              />

              <img
                className={styles.eyeIcon}
                src={showPassword ? eyeShow : eyeInactive}
                alt="show/hide password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className={styles.password_info_error}>
              <p className={styles.password_info}></p>
            </div>
          </div>
        </div>

        <div className={styles.btn_info}>
          <Button
            className={styles.loginBtn}
            onClick={handleLogin}
            title="Login"
          />

          {isError && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>

      <Link to={routes.REGISTER} className={styles.login}>
        Don't have an account? Sign up
      </Link>
    </div>
  );
};
