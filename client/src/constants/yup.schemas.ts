import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Your name is too short!")
    .max(30, "Sorry, but your name is too long!")
    .required("Required field"),
  email: Yup.string().email("Invalid email").required("Required field"),
  password: Yup.string()
    .min(6, "Password is too short - the minimum length is 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Required field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required field"),
});
