import styles from "./UserLocationForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

type UserLocationFormProps = {
  className?: string;
};

export const UserLocationForm = ({ className }: UserLocationFormProps) => {
  const addressFormik = useFormik({
    initialValues: {
      city: "",
      address: "",
      birthday: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      birthday: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log("Address Updated:", values);
    },
  });

  return (
    <form onSubmit={addressFormik.handleSubmit} className={className}>
      <div className={styles.userAddress}>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={addressFormik.handleChange}
            onBlur={addressFormik.handleBlur}
            value={addressFormik.values.city}
          />
          {addressFormik.touched.city && addressFormik.errors.city ? (
            <div className={styles.error}>{addressFormik.errors.city}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={addressFormik.handleChange}
            onBlur={addressFormik.handleBlur}
            value={addressFormik.values.address}
          />
          {addressFormik.touched.address && addressFormik.errors.address ? (
            <div className={styles.error}>{addressFormik.errors.address}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            onChange={addressFormik.handleChange}
            onBlur={addressFormik.handleBlur}
            value={addressFormik.values.birthday}
          />
          {addressFormik.touched.birthday && addressFormik.errors.birthday ? (
            <div className={styles.error}>{addressFormik.errors.birthday}</div>
          ) : null}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Update Address Info
      </button>
    </form>
  );
};
