import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Your name is too short!")
    .max(30, "Sorry, but your name is too long!")
    .required("Name required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format")
    .required("Email required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .matches(/[A-Z]/, "Need at least one uppercase letter")
    .matches(/\d/, "Need at least one number")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format")
    .required("Email required"),
  password: Yup.string().required("Password required"),
});

export const userContactsValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
  contact_email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
});

export const userAddressValidationSchema = Yup.object({
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  birthday: Yup.date().required("Required"),
});

export const userPasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

export const leaveReviewValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(
      3,
      "Please provide a longer title. It should be at least 3 characters."
    )
    .required("Please enter a title for your review."),
  description: Yup.string()
    .min(
      10,
      "Please provide more details in your review. It should be at least 10 characters."
    )
    .max(
      100,
      "Please keep your review concise. It should be no more than 100 characters."
    )
    .required("Please share your experience in the review."),
});
