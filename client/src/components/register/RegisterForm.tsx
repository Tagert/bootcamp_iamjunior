import styles from "./RegisterForm.module.scss";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { validateEmail } from "../../utils/helpers/email.validation";
import { validatePassword } from "../../utils/helpers/password.validation";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setMatch] = useState(false);

  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const register = async () => {
    const registerBody = {
      name: name,
      email: email,
      password: password,
      role: "user",
    };

    if (!name || !email || !password || !confirmPassword) {
      setError(true);
      setErrorMessage("Please fill in all fields");

      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage("Invalid email format");

      return;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== true) {
      setError(true);
      setErrorMessage(passwordValidationResult);
      return;
    }

    if (password !== confirmPassword) {
      setMatch(true);
      setErrorMessage("Passwords don't match");

      return;
    }

    setError(false);
    setMatch(false);

    try {
      const res = await axios.post("http://localhost:3000/users", registerBody);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log("response:", res.data);
    } catch (err) {
      setError(true);
      console.log("err:", err);
    }
  };

  const handleRegister = () => {
    register();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      register();
    }
  };

  return (
    <div className={styles.register_card}>
      <div className={styles.register_modal} id="loginModal">
        <div className={styles.active_login}>
          <h4>Create Account</h4>
          <p>Please sign-up to continue!</p>

          <div className={styles.input}>
            <div className={styles.name_box}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="on"
                onKeyDown={handleKeyDown}
                className={styles.topInput}
              />
            </div>

            <div className={styles.username_info_error}>
              <p className={styles.username_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.username_box}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Email"
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
                type="password"
                placeholder="Password"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.password_info_error}>
              <p className={styles.password_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.password_box}>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.password_info_error}>
              <p className={styles.password_info}></p>
            </div>
          </div>
        </div>

        <div className={styles.btn_info}>
          <Button
            className={styles.registerBtn}
            onClick={handleRegister}
            title="Sign up"
          />
          {isError && <p className={styles.error}>{errorMessage}</p>}
          {/* {isMatch && <p className={styles.error}>Passwords don&#39;t match</p>} */}
          {/* {isBadData && <p className={styles.error}>{errorMessage}</p>} */}
        </div>
      </div>

      <Link to={routes.LOGIN} className={styles.register}>
        Already have an account? Log in
      </Link>
    </div>
  );
};
