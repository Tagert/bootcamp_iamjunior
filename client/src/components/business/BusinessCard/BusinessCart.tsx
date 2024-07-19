import styles from "./BusinessCard.module.scss";
import { ContactType } from "../../../types/contact.type";

export type BusinessCardProps = {
  className?: string;
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
  className,
  name,
  description,
  category,
  address,
  contacts,
  images_url,
  price,
}: BusinessCardProps) => {
  return (
    <div className={`${styles.businessCard} ${className}`}>
      <div className={styles.businessDetails}>
        <div className={styles.imageBox}>
          <img src={images_url} alt={`${name} business`} />
        </div>

        <div className={styles.businessBox}>
          <p>{category}</p>
          <h2>{name}</h2>
          <p>{address}</p>

          <div className={styles.contactBox}>
            <h3>Contacts:</h3>

            {contacts.map((contact, index) => (
              <div key={index} className={styles.contact}>
                <h4>{contact.contact_person}</h4>
                <h4>{contact.phone_number}</h4>
                <h4>{contact.email}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.descriptionText}>{description}</p>

      <p>{price}</p>
    </div>
  );
};
