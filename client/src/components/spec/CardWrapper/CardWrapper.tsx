import styles from "./styles/CardWrapper.module.css";
import { services } from "../../../constants/services";

export const CardWrapper = () => {
  return (
    <section className={styles.container}>
      {services.map((s) => (
        <div>test</div>
      ))}
    </section>
  );
};
