import styles from "./BusinessExtrasWrapper.module.scss";
import { useState } from "react";
import { Modal, Tabs } from "@mantine/core";
import { ImagesType, WorkingHoursType } from "../../../types/business.type";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";
import { useSimilarBusiness } from "../../../api/business/queries/fetchSimilarBusinesses";
import { CalendarModal } from "../CalendarModal/CalendarModal";
import { SimilarBusinessWrapper } from "../SimilarBusinessesWrapper/SimilarBusinessesWrapper";
import { BusinessReviewWrapper } from "../BusinessReviewWrapper/BusinessReviewWrapper";

type BusinessExtrasWrapperProps = {
  className?: string;
  business_id: string;
  provider: string;
  business_category: string;
  description: string;
  images_url: ImagesType[];
  working_hours: WorkingHoursType;
};

export const BusinessExtrasWrapper = ({
  className,
  business_id,
  provider,
  business_category,
  description,
  images_url,
  working_hours,
}: BusinessExtrasWrapperProps) => {
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

  const handleImageClick = (image: ImagesType) => {
    setEnlargedImage(image);
  };

  const closeImageModal = () => {
    setEnlargedImage(null);
  };

  return (
    <section className={`${styles.businessExtrasWrapper} ${className}`}>
      <Tabs
        defaultValue="about"
        classNames={{
          list: styles.list,
          tab: styles.tab,
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="photos">Photos</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="about">
          <div className={styles.descriptionContainer}>
            <div className={styles.descriptionBox}>
              <h2>Description</h2>

              <p className={styles.descriptionText}>{description}</p>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="reviews">
          <div className={styles.reviewContainer}>
            <BusinessReviewWrapper
              provider={provider}
              business_id={business_id}
            />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="photos">
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
        </Tabs.Panel>
      </Tabs>

      <div className={styles.bookingContainer}>
        <ButtonImage
          imgSrc={
            "https://img.icons8.com/?size=100&id=4DqMzI0F7ksp&format=png&color=ffffff"
          }
          className={styles.bookingBtn}
          text={"Booking Appointment"}
          onClick={openModal}
        />

        <CalendarModal
          business_id={business_id}
          business_category={business_category}
          working_hours={working_hours}
          isCalendarModalVisible={isCalendarModalVisible}
          setIsCalendarModalVisible={setIsCalendarModalVisible}
        />

        {similarBusinesses && (
          <SimilarBusinessWrapper
            similarBusinesses={similarBusinesses}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>

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
