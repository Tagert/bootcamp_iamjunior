import styles from "./BookingCard.module.scss";
import open_modal from "../../styles/mantine_ui/open-confirm-modal.module.scss";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { BookingType } from "../../types/booking.type";
import { useBusiness } from "../../api/business/queries/fetchBusinessById";
import { formatDate } from "../../utils/format-date";
import { ButtonImage } from "../common/ButtonImage/ButtonImage";
import { useDeleteBooking } from "../../api/booking/mutation/deleteBooking";
import { useAuthStore } from "../../store/use-auth.store";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

type BookingCardProps = {
  booking: BookingType;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const navigate = useNavigate();
  const { data: business } = useBusiness(booking.business_id ?? "");
  const { mutate: deleteBooking, isPending } = useDeleteBooking();
  const { user } = useAuthStore();

  const handleDeleteBooking = () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (!booking.id) {
      console.error("Booking ID is missing");
      return;
    }

    modals.openConfirmModal({
      title: "Cancel Booking",
      centered: true,
      children: (
        <Text size="lg">
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Cancel Booking", cancel: "No, don't cancel it" },
      confirmProps: { color: "red" },
      classNames: {
        title: open_modal.title,
        content: open_modal.content,
        body: open_modal.body,
      },
      onCancel: () =>
        toast("Till the next time", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          draggable: true,
          progress: undefined,
        }),
      onConfirm: () => {
        if (booking.id && user.id) {
          deleteBooking(
            { booking_id: booking.id, user_id: user.id },
            {
              onSuccess: () => {
                toast.success(
                  `Booking cancellation request has been successful.`
                );
              },
              onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                toast.error(
                  axiosError.response?.data?.message || "An error occurred"
                );
              },
            }
          );
        } else {
          console.error("Booking ID or User ID is missing");
        }
      },
    });
  };

  const handleNavigateToBusinessCard = () => {
    if (business?.id) {
      navigate(`/business/${business.id}`);
    }
  };

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
      <div
        className={styles.imageContainer}
        onClick={handleNavigateToBusinessCard}
      >
        <img src={business.images_url[0].url} alt="" />
      </div>

      <div className={styles.bookingDetailsContainer}>
        <div className={styles.bookingTitleBox}>
          <h3>{business.name}</h3>

          <ButtonImage
            imgSrc="https://img.icons8.com/?size=100&id=3062&format=png&color=a8a8a8"
            className={styles.removeBookingBtn}
            onClick={handleDeleteBooking}
            disabled={isPending}
          />
        </div>

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
          <p>
            Service on:
            <span>{formatDate(new Date(booking.booking_date))}</span>
          </p>
        </div>

        <div className={styles.bookingTime}>
          <img
            src="https://img.icons8.com/?size=100&id=16838&format=png&color=8056eb"
            alt="clock icon"
          />
          <p>
            Service on: <span>{booking.time}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
