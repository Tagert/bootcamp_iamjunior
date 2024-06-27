import styles from "./styles/CardWrapper.module.css";
import { services } from "../../../constants/services";
import { Card } from "../Card/Card";

export const CardWrapper = () => {
  return (
    <section className={styles.cardWrapper}>
      <div className={styles.description}>
        <h4>Popular businesses</h4>
      </div>

      <div className={styles.cardHolder}>
        {services.map((service) => (
          <Card key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};
