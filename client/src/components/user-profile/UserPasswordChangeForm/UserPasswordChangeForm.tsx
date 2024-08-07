import styles from "./UserPasswordChangeForm.module.scss";
import { Form, Formik, FormikHelpers } from "formik";
import { useChangePassword } from "../../../api/user/mutation/changePassword";
import { toast } from "react-toastify";
import { FormField } from "../../common/FormField/FormField";
import { userPasswordValidationSchema } from "../../../constants/yup.schemas";
import { PasswordFormValues } from "../../../types/form.type";
import { handleKeyDown } from "../../../utils/handle-key-down";

type UserPasswordChangeFormProps = {
  className?: string;
  user_id: string | null;
};

export const UserPasswordChangeForm = ({
  className,
  user_id,
}: UserPasswordChangeFormProps) => {
  const changePasswordMutation = useChangePassword();

  const initialValues: PasswordFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: PasswordFormValues,
    { resetForm }: FormikHelpers<PasswordFormValues>
  ) => {
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
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userPasswordValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form
          className={className}
          onKeyDown={(e) => handleKeyDown(e, submitForm, "Enter")}
        >
          <div className={styles.userResetPassword}>
            <FormField
              label="Current Password"
              name="currentPassword"
              type="password"
            />
            <FormField
              label="New Password"
              name="newPassword"
              type="password"
            />
            <FormField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Change Password
          </button>
        </Form>
      )}
    </Formik>
  );
};
