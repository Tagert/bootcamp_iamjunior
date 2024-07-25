import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.loader}></span>
    </div>
  );
};

export { Spinner };
