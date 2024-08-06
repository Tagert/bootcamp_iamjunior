import styles from "./FormField.module.scss";
import { ErrorMessage, Field } from "formik";

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
};

export const FormField = ({ label, name, type }: FormFieldProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>

      <Field id={name} name={name} type={type} />

      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};
