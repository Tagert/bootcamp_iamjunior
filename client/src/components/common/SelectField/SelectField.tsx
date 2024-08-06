import styles from "./SelectField.module.scss";
import { ErrorMessage, Field } from "formik";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
};

export const SelectField = ({ label, name, options }: SelectFieldProps) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>

    <Field as="select" id={name} name={name}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>

    <ErrorMessage name={name} component="div" className={styles.error} />
  </div>
);
