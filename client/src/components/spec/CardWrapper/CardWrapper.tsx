import styles from "./CardWrapper.module.scss";
import { services } from "../../../constants/services";
import { Card } from "../Card/Card";

type CardWrapperProp = {
  category?: string;
};

export const CardWrapper = ({ category }: CardWrapperProp) => {
  const filteredServices = category
    ? services.filter(
        (service) =>
          service.category.toLocaleLowerCase() === category.toLocaleLowerCase()
      )
    : services;

  return (
    <section className={styles.cardWrapper}>
      <div className={styles.cardHolder}>
        {filteredServices.map((service) => (
          <Card key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};
