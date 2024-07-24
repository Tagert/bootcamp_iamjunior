import styles from "./BookingCard.module.scss";
import { BookingType } from "../../types/booking.type";
import { useBusiness } from "../../api/business/queries/fetchBusinessById";
import { formatDate } from "../../utils/format-date";

type BookingCardProps = {
  booking: BookingType;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const { data: business } = useBusiness(booking.business_id ?? "");

  if (!business) {
    return (
      <section className={styles.bookingCard}>
        <p>Error: No business information available for this booking.</p>
        <p>Service on: {booking.booking_date}</p>
        <p>Time: {booking.time}</p>
      </section>
    );
  }

  return (
    <section className={styles.bookingCard}>
      <div className={styles.imageContainer}>
        <img src={business.images_url[0].url} alt="" />
      </div>

      <div className={styles.bookingDetailsContainer}>
        <h3>{business.name}</h3>

        <div className={styles.contactName}>
          <img
            src="https://img.icons8.com/?size=100&id=23400&format=png&color=8056eb"
            alt=""
          />
          <p id={styles["contactName"]}>{business.provider}</p>
        </div>

        <div className={styles.contactAddress}>
          <img
            src="https://img.icons8.com/?size=100&id=113148&format=png&color=8056eb"
            alt="location pin icon"
          />
          <p>{business.address}</p>
        </div>

        <div className={styles.bookingDate}>
          <img
            src="https://img.icons8.com/?size=100&id=4sb8MbMbBFch&format=png&color=8056eb"
            alt="clock icon"
          />
          <p>Service on: {formatDate(new Date(booking.booking_date))}</p>
        </div>

        <div className={styles.bookingTime}>
          <img
            src="https://img.icons8.com/?size=100&id=16838&format=png&color=8056eb"
            alt="clock icon"
          />
          <p>Service on: {booking.time}</p>
        </div>
      </div>
    </section>
  );
};
