import styles from "./BusinessCard.module.scss";
import { ContactType } from "../../../types/contact.type";

export type BusinessCardProps = {
  user_id?: string;
  name: string;
  description: string;
  category: string;
  address: string;
  contacts: ContactType[];
  images_url: string;
  price: number;
};

export const BusinessCard = ({
  user_id,
  name,
  description,
  category,
  address,
  contacts,
  images_url,
  price,
}: BusinessCardProps) => {
  return (
    <div className={styles.businessCard}>
      <p>{user_id ? user_id : "No User ID"}</p>
      <p>{name}</p>
      <p>{description}</p>
      <p>{category}</p>
      <p>{address}</p>
      {/* <p>{contacts}</p> */}
      <p>{images_url}</p>
      <p>{price}</p>
    </div>
  );
};
