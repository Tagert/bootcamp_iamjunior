import styles from "./RegisterForm.module.scss";
import React from "react";
import { RegisterFormValues } from "../../types/user.types";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../constants/yup.schemas";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const handleSubmit = (values: RegisterFormValues) => {
    console.log("Form data:", values);
    // Add your register logic here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.register_card}>
          <div className={styles.register_modal} id="loginModal">
            <div className={styles.active_login}>
              <h4>Create Account</h4>
              <p>Please sign-up to continue!</p>

              <div className={styles.input}>
                <div className={styles.name_box}>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="on"
                    className={styles.topInput}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.input}>
                <div className={styles.username_box}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="on"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.input}>
                <div className={styles.password_box}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={
                      touched.password && errors.password
                        ? styles.errorInput
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.input}>
                <div className={styles.password_box}>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <div className={styles.btn_info}>
              <Button
                type="submit"
                className={styles.registerBtn}
                title="Sign up"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Link to={routes.LOGIN} className={styles.register}>
            Already have an account? Log in
          </Link>
        </Form>
      )}
    </Formik>
  );
};
