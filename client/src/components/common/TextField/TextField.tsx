import styles from "./TextField.module.scss";
import { ErrorMessage, Field } from "formik";

type TextFieldProps = {
  label: string;
  name: string;
  placeholder: string;
};

export const TextField = ({ label, name, placeholder }: TextFieldProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>

      <Field as="textarea" id={name} name={name} placeholder={placeholder} />

      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};
