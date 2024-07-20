import styles from "./BusinessExtrasWrapper.module.scss";
import bookingIcon from "../../../assets/booking_icon.svg";

import { ContactType } from "../../../types/contact.type";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";

type BusinessExtrasWrapperProps = {
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

export const BusinessExtrasWrapper = ({
  className,
  contacts,
}: BusinessExtrasWrapperProps) => {
  return (
    <section className={`${styles.businessExtrasWrapper} ${className}`}>
      {/* {contacts.map((contact, index) => (
        <div key={index} className={styles.contact}>
          <h4>{contact.contact_person}</h4>
          <h4>{contact.phone_number}</h4>
          <h4>{contact.email}</h4>
        </div>
      ))} */}

      {/* <ButtonImage
        imgSrc={bookingIcon}
        className={styles.bookingBtn}
        text={"Booking Appointment"}
      /> */}
      <div className={styles.descriptionBox}>
        <h4>Description</h4>
        {/* <p className={styles.descriptionText}>{description}</p> */}
      </div>
    </section>
  );
};
