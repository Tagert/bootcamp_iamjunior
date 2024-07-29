import styles from "./UserContactForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

type UserContactFormProps = {
  className?: string;
};

export const UserContactForm = ({ className }: UserContactFormProps) => {
  const profileFormik = useFormik({
    initialValues: {
      username: "",
      gender: "",
      phoneNumber: "",
      email: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Profile Updated:", values);
    },
  });

  return (
    <form onSubmit={profileFormik.handleSubmit} className={className}>
      <div className={styles.userContacts}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            value={profileFormik.values.username}
          />
          {profileFormik.touched.username && profileFormik.errors.username ? (
            <div className={styles.error}>{profileFormik.errors.username}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            name="gender"
            type="text"
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            value={profileFormik.values.gender}
          />
          {profileFormik.touched.gender && profileFormik.errors.gender ? (
            <div className={styles.error}>{profileFormik.errors.gender}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            value={profileFormik.values.phoneNumber}
          />
          {profileFormik.touched.phoneNumber &&
          profileFormik.errors.phoneNumber ? (
            <div className={styles.error}>
              {profileFormik.errors.phoneNumber}
            </div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={profileFormik.handleChange}
            onBlur={profileFormik.handleBlur}
            value={profileFormik.values.email}
          />
          {profileFormik.touched.email && profileFormik.errors.email ? (
            <div className={styles.error}>{profileFormik.errors.email}</div>
          ) : null}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Update Profile Info
      </button>
    </form>
  );
};
