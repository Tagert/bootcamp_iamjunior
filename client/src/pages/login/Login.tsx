// import styles from "./Login.module.scss";
import { useState } from "react";
import { LoginForm } from "../../components/login/LoginForm";
import { Page } from "../../components/template/Page";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Page>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Page>
  );
};
