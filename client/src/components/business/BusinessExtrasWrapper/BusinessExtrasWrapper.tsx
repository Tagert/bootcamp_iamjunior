import styles from "./BusinessExtrasWrapper.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { ImagesType, WorkingHoursType } from "../../../types/business.type";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";
import { Spinner } from "../../common/Spinner/Spinner";
import { useSimilarBusiness } from "../../../api/business/queries/fetchSimilarBusinesses";
import { SimilarBusinessesCard } from "../SimilarBusinessesCard/SimilarBusinessesCard";
import { CalendarModal } from "../CalendarModal/CalendarModal";

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

  const {
    data: similarBusinesses,
    isLoading,
    error,
  } = useSimilarBusiness(business_id);

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const [enlargedImage, setEnlargedImage] = useState<ImagesType | null>(null);

  const openModal = () => {
    setIsCalendarModalVisible(true);
  };

  const handleCardClick = (id: string) => {
    navigate(`/business/${id}`);
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

      <CalendarModal
        business_id={business_id}
        working_hours={working_hours}
        isCalendarModalVisible={isCalendarModalVisible}
        setIsCalendarModalVisible={setIsCalendarModalVisible}
      />

      {enlargedImage && (
        <Modal
          opened={true}
          onClose={closeImageModal}
          size={800}
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
