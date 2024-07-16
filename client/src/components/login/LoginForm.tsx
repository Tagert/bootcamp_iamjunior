import styles from "./LoginForm.module.scss";
import eyeShow from "../../assets/eye_see_show_icon.svg";
import eyeInactive from "../../assets/disable_eye_inactive_icon.svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { useLoginUser } from "../../api/loginUser";

type LoginFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: LoginFormProps) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate: loginUser, isPending, isError, error } = useLoginUser();

  const handleLogin = () => {
    loginUser(
      { email, password },
      {
        onSuccess: () => {
          navigate(routes.HOME);
        },
      }
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    return error?.message || "An unexpected error occurred";
  };

  if (error) {
    console.log(error.response?.data?.message || error.message);
  }

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
            disabled={isPending}
          />

          {isError && <p className={styles.error}>{getErrorMessage(error)}</p>}
        </div>
      </div>

      <Link to={routes.REGISTER} className={styles.login}>
        Don't have an account? Sign up
      </Link>
    </div>
  );
};
