import styles from "./UserPasswordChangeForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangePassword } from "../../../api/user/mutation/changePassword";
import { toast } from "react-toastify";

type UserPasswordChangeFormProps = {
  className?: string;
  user_id: string | null;
};

export const UserPasswordChangeForm = ({
  className,
  user_id,
}: UserPasswordChangeFormProps) => {
  const changePasswordMutation = useChangePassword();

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!user_id) {
        toast.error("User information is not available. Please log in again.");
        return;
      }

      try {
        await changePasswordMutation.mutateAsync({
          id: user_id,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        toast.success("Password changed successfully");
        resetForm();
      } catch {
        toast.error(
          "Failed to change password. Please check your current password and try again."
        );
      }
    },
  });

  return (
    <form onSubmit={passwordFormik.handleSubmit} className={className}>
      <div className={styles.userResetPassword}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.currentPassword}
          />
          {passwordFormik.touched.currentPassword &&
          passwordFormik.errors.currentPassword ? (
            <div className={styles.error}>
              {passwordFormik.errors.currentPassword}
            </div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.newPassword}
          />
          {passwordFormik.touched.newPassword &&
          passwordFormik.errors.newPassword ? (
            <div className={styles.error}>
              {passwordFormik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
            value={passwordFormik.values.confirmPassword}
          />
          {passwordFormik.touched.confirmPassword &&
          passwordFormik.errors.confirmPassword ? (
            <div className={styles.error}>
              {passwordFormik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Change Password
      </button>
    </form>
  );
};
