import { Button } from "../../common/Button/Button";
import styles from "./Card.module.scss";

type CardProp = {
  imgUrl: string;
  category: string;
  title: string;
  provider: string;
  address: string;
  price: number;
};

export const Card = ({
  imgUrl,
  category,
  title,
  provider,
  address,
  price,
}: CardProp) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imgUrl} alt="" />
      </div>

      <div className={styles.descriptionBox}>
        <p>{category}</p>

        <p>{title}</p>

        <p>{provider}</p>

        <p>{address}</p>

        <div className={styles.bookBox}>
          <Button className={styles.bookBtn} title="Book Now" />

          <p>{`from ${price} €`}</p>
        </div>
      </div>
    </div>
  );
};
