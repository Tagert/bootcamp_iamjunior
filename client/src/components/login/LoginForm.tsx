import styles from "./LoginForm.module.scss";
import eyeShow from "../../assets/eye_see_show_icon.svg";
import eyeInactive from "../../assets/disable_eye_inactive_icon.svg";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { useLoginUser } from "../../api/auth/loginUser";
import { LoginFormValues } from "../../types/user.types";
import { loginValidationSchema } from "../../constants/yup.schemas";

type LocationState = {
  fromRegister?: boolean;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { validateAndLogin, isPending } = useLoginUser();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.fromRegister) {
      toast.success(`Account was created successfully`);
      toast.info("Your account has been created. Please log in.");

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    validateAndLogin(values.email, values.password);
    setSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, submitForm: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form
          className={styles.login_card}
          onKeyDown={(e) => handleKeyDown(e, submitForm)}
        >
          <div className={styles.login_modal} id="loginModal">
            <div className={styles.active_login}>
              <h4>Welcome back</h4>
              <p>Please enter your login and password!</p>

              <div className={styles.input}>
                <div className={styles.username_box}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your email"
                    autoComplete="on"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.input}>
                <div className={styles.password_box}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                  />
                  <img
                    className={styles.eyeIcon}
                    src={showPassword ? eyeShow : eyeInactive}
                    alt="show/hide password"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.btn_info}>
              <Button
                type="submit"
                className={styles.loginBtn}
                title="Login"
                disabled={isPending}
              />
            </div>
          </div>

          <Link to={routes.REGISTER} className={styles.login}>
            Don't have an account? Sign up
          </Link>
        </Form>
      )}
    </Formik>
  );
};
