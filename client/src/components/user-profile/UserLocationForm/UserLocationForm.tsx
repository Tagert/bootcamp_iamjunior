import styles from "./UserLocationForm.module.scss";
import { Formik, Form, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { format, isValid } from "date-fns";
import { useUser } from "../../../api/user/queries/fetchUserById";
import { useUpdateUser } from "../../../api/user/mutation/updateUser";
import { useAuthStore } from "../../../store/use-auth.store";
import { userAddressValidationSchema } from "../../../constants/yup.schemas";
import { Spinner } from "../../common/Spinner/Spinner";
import { FormField } from "../../common/FormField/FormField";
import { LocationFormValues } from "../../../types/form.type";
import { handleKeyDown } from "../../../utils/handle-key-down";

type UserLocationFormProps = {
  className?: string;
};

export const UserLocationForm = ({ className }: UserLocationFormProps) => {
  const { user } = useAuthStore();
  const { mutate, isPending: isUpdating } = useUpdateUser();
  const { data: userData, isLoading: isLoadingUser } = useUser(user?.id || "");

  const initialValues: LocationFormValues = {
    city: userData?.city || "",
    address: userData?.address || "",
    birthday:
      userData?.birthday && isValid(new Date(userData.birthday))
        ? format(new Date(userData.birthday), "yyyy-MM-dd")
        : "",
  };

  const handleSubmit = (
    values: LocationFormValues,
    { setSubmitting }: FormikHelpers<LocationFormValues>
  ) => {
    if (user?.id) {
      const updatedValues = {
        ...values,
        birthday: values.birthday ? new Date(values.birthday) : undefined,
      };

      mutate({ id: user.id, ...updatedValues });
    } else {
      console.error("User ID is undefined");
    }

    toast.success("Address have been successfully updated.");
    setSubmitting(false);
  };

  if (isLoadingUser || !user?.id) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userAddressValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ submitForm }) => (
        <Form
          className={className}
          onKeyDown={(e) => handleKeyDown(e, submitForm, "Enter")}
        >
          <div className={styles.userAddress}>
            <FormField label="City" name="city" type="text" />

            <FormField label="Address" name="address" type="text" />

            <FormField label="Birthday" name="birthday" type="date" />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isUpdating || !user?.id}
          >
            {isUpdating ? "Updating..." : "Update Address Info"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
