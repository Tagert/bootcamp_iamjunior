import styles from "./UserContactForm.module.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { useAuthStore } from "../../../store/use-auth.store";
import { useUpdateUser } from "../../../api/user/mutation/updateUser";
import { userContactsValidationSchema } from "../../../constants/yup.schemas";
import { useUser } from "../../../api/user/queries/fetchUserById";
import { Spinner } from "../../common/Spinner/Spinner";
import { toast } from "react-toastify";
import { FormField } from "../../common/FormField/FormField";
import { SelectField } from "../../common/SelectField/SelectField";
import { ContactsFormValues } from "../../../types/form.type";
import { handleKeyDown } from "../../../utils/handle-key-down";

type UserContactFormProps = {
  className?: string;
};

export const UserContactForm = ({ className }: UserContactFormProps) => {
  const { user } = useAuthStore();
  const { mutate, isPending: isUpdating } = useUpdateUser();
  const { data: userData, isLoading: isLoadingUser } = useUser(user?.id || "");

  const initialValues: ContactsFormValues = {
    name: userData?.name || user?.name || "",
    gender: userData?.gender || "",
    phone_number: userData?.phone_number || "",
    contact_email: userData?.contact_email || "",
  };

  const handleSubmit = (
    values: ContactsFormValues,
    { setSubmitting }: FormikHelpers<ContactsFormValues>
  ) => {
    if (user?.id) {
      mutate({ id: user.id, ...values });
    } else {
      console.error("User ID is undefined");
    }

    toast.success("Contacts have been successfully updated.");
    setSubmitting(false);
  };

  if (isLoadingUser || !user?.id) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userContactsValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ submitForm }) => (
        <Form
          className={className}
          onKeyDown={(e) => handleKeyDown(e, submitForm, "Enter")}
        >
          <div className={styles.userContacts}>
            <FormField label="Name" name="name" type="text" />

            <SelectField
              label="Gender"
              name="gender"
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            <FormField label="Phone Number" name="phone_number" type="text" />

            <FormField
              label="Contact Email"
              name="contact_email"
              type="email"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isUpdating || !user?.id}
          >
            {isUpdating ? "Updating..." : "Update Profile Info"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
