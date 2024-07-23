import styles from "./BusinessExtrasWrapper.module.scss";
import calendar_modal from "../../../styles/mantine_ui/calendar-modal.module.scss";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ImagesType, WorkingHoursType } from "../../../types/business.type";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";
import { useInsertBooking } from "../../../api/insertBooking";
import { handleDateChange } from "../../../utils/handle-date-change";
import { formatDate } from "../../../utils/format_date";
import { useSimilarBusiness } from "../../../api/fetchSimilarBusinesses";
import { Spinner } from "../../common/Spinner/Spinner";
import { SimilarBusinessesCard } from "../SimilarBusinessesCard/SimilarBusinessesCard";
import { useNavigate } from "react-router-dom";

type BusinessExtrasWrapperProps = {
  className?: string;
  business_id: string;
  description: string;
  images_url: ImagesType[];
  working_hours: WorkingHoursType;
};

export const BusinessExtrasWrapper = ({
  className,
  business_id,
  description,
  images_url,
  working_hours,
}: BusinessExtrasWrapperProps) => {
  const navigate = useNavigate();
  //TODO: implement loading, error handling and add success message
  const {
    mutate: insertBooking,
    // isPending,
    // isError,
    // isSuccess,
  } = useInsertBooking();

  const {
    data: similarBusinesses,
    isLoading,
    error,
  } = useSimilarBusiness(business_id);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const [enlargedImage, setEnlargedImage] = useState<ImagesType | null>(null);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleCardClick = (id: string) => {
    navigate(`/business/${id}`);
  };

  const handleBooking = () => {
    if (business_id && selectedDate && selectedTime) {
      const formattedDate = formatDate(selectedDate);
      const newBooking = {
        booking_date: formattedDate,
        time: selectedTime,
      };

      insertBooking({ booking: newBooking, business_id });
      closeModal();
    } else {
      console.error(
        "Business ID, selected date, or selected time is not available",
        { business_id, selectedDate, selectedTime }
      );
    }
  };

  const handleImageClick = (image: ImagesType) => {
    setEnlargedImage(image);
  };

  const closeImageModal = () => {
    setEnlargedImage(null);
  };

  return (
    <section className={`${styles.businessExtrasWrapper} ${className}`}>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionBox}>
          <h2>Description</h2>

          <p className={styles.descriptionText}>{description}</p>
        </div>

        <div className={styles.galleryBox}>
          <h2>Gallery</h2>

          <div className={styles.imagesWrapper}>
            {images_url.map((image) => (
              <div className={styles.imageBox} key={image.id ?? image.url}>
                <img
                  src={image.url}
                  alt={image.alt_text}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bookingContainer}>
        <ButtonImage
          imgSrc={
            "https://img.icons8.com/?size=100&id=4DqMzI0F7ksp&format=png&color=ffffff"
          }
          className={styles.bookingBtn}
          text={"Booking Appointment"}
          onClick={openModal}
        />

        <div className={styles.similarBusinessWrapper}>
          <h3>Similar business</h3>
          {isLoading && <Spinner />}
          {error && <p>Error loading similar businesses: {error.message}</p>}
          {!isLoading &&
            !error &&
            similarBusinesses &&
            similarBusinesses.length > 0 && (
              <div className={styles.similarBusinessList}>
                {similarBusinesses.map((similarBusiness) => (
                  <SimilarBusinessesCard
                    key={similarBusiness.id}
                    className={styles.similarBusinessCard}
                    id={similarBusiness.id as string}
                    name={similarBusiness.name}
                    provider={similarBusiness.provider}
                    address={similarBusiness.address}
                    images_url={similarBusiness.images_url}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          {!isLoading &&
            !error &&
            similarBusinesses &&
            similarBusinesses.length === 0 && (
              <p>No similar businesses found.</p>
            )}
        </div>
      </div>

      <Modal
        classNames={{
          close: calendar_modal.close,
          title: calendar_modal.title,
          content: calendar_modal.content,
        }}
        opened={isModalVisible}
        onClose={closeModal}
        title="Book a Service"
        transitionProps={{ transition: "rotate-right" }}
      >
        <div className={styles.modalContent}>
          <h3>Select Date and Time to book a service</h3>

          <h4>Select Date</h4>

          <DatePicker
            classNames={{
              levelsGroup: calendar_modal.levelsGroup,
              calendarHeaderControl: calendar_modal.calendarHeaderControl,
            }}
            className={styles.calendarBody}
            value={selectedDate}
            minDate={new Date()}
            highlightToday={true}
            size="lg"
            onChange={(date) =>
              handleDateChange({
                date,
                working_hours,
                setSelectedDate,
                setTimeSlots,
              })
            }
          />

          {timeSlots.length > 0 ? (
            <>
              <h5>Select Time Slot</h5>

              <div className={styles.timeSlots}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={slot === selectedTime ? styles.selected : ""}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>
              No time slots available for the selected date. The business may be
              closed on this day.
            </p>
          )}
          <div className={styles.modalActions}>
            <Button onClick={handleBooking} size="md">
              Book Now
            </Button>

            <Button variant="outline" onClick={closeModal} size="md">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {enlargedImage && (
        <Modal
          opened={true}
          onClose={closeImageModal}
          size={1000}
          title="Image Preview"
        >
          <div className={styles.enlargedImageWrapper}>
            <img
              src={enlargedImage.url}
              alt={enlargedImage.alt_text}
              className={styles.enlargedImage}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};
