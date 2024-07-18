import styles from "./RegisterForm.module.scss";
import { RegisterFormValues } from "../../types/user.types";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { Button } from "../common/Button/Button";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { registerValidationSchema } from "../../constants/yup.schemas";
import { useCreateUser } from "../../api/createUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateUser();

  const handleSubmit = (
    values: RegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userValues } = values;
    mutate(userValues, {
      onSuccess: (data) => {
        toast.success(`User ${data.user.name} was created successfully`);

        setTimeout(() => {
          navigate(routes.LOGIN);
        }, 3500);
        setSubmitting(false);
        resetForm();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || "An error occurred");
        setSubmitting(false);
      },
    });
  };

  return (
    <>
      <ToastContainer />
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
                  disabled={isSubmitting || isPending}
                />
              </div>
            </div>

            <Link to={routes.LOGIN} className={styles.register}>
              Already have an account? Log in
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};
