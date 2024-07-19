import styles from "./BusinessExtrasWrapper.module.scss";
import bookingIcon from "../../../assets/booking_icon.svg";
import uploadIcon from "../../../assets/upload_icon.svg";
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
      <ButtonImage imgSrc={uploadIcon} className={styles.uploadBtn} />
      <p>test</p>
      <p>test</p>
      <ButtonImage
        imgSrc={bookingIcon}
        className={styles.bookingBtn}
        text={"Booking Appointment"}
      />
    </section>
  );
};
