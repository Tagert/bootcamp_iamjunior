import styles from "./BusinessCard.module.scss";
import test from "./test.module.css";
import uploadIcon from "../../../assets/upload_icon.svg";
import { Modal } from "@mantine/core";
import { ContactType } from "../../../types/contact.type";
import { WorkingHoursType } from "../../../types/business.type";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";
import { useState } from "react";
import { findFirstOpenDay } from "../../../utils/find-first-open-day";
import { formatWorkingHours } from "../../../utils/formating-working-hours";

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
  working_hours: WorkingHoursType;
};

export const BusinessCard = ({
  className,
  name,
  category,
  address,
  contacts,
  images_url,
  working_hours,
}: BusinessCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const firstOpenDay = findFirstOpenDay(working_hours);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`${styles.businessCard} ${className}`}>
      <div className={styles.businessDetails}>
        <div className={styles.imageBox}>
          <img src={images_url} alt={`${name} business`} />
        </div>

        <div className={styles.businessBox}>
          <p className={styles.categoryBadge}>{category}</p>

          <div className={styles.serviceBox}>
            <h2>{name}</h2>

            <ButtonImage imgSrc={uploadIcon} className={styles.uploadBtn} />
          </div>

          {contacts.map((contact, index) => (
            <div key={index} className={styles.contactBox}>
              <div className={styles.contactEmail}>
                <img
                  src="https://img.icons8.com/?size=100&id=114083&format=png&color=a8a8a8"
                  alt=""
                />

                <p>{contact.email}</p>
              </div>

              <div className={styles.contactName}>
                <img
                  src="https://img.icons8.com/?size=100&id=23400&format=png&color=8056eb"
                  alt=""
                />

                <p id={styles["contactName"]}>{contact.contact_person}</p>
              </div>
            </div>
          ))}

          <div className={styles.locationBox}>
            <div className={styles.contactAddress}>
              <img
                src="https://img.icons8.com/?size=100&id=113148&format=png&color=a8a8a8"
                alt="location pin icon"
              />

              <p>{address}</p>
            </div>

            <div className={styles.workingHours}>
              <img
                src="https://img.icons8.com/?size=100&id=16838&format=png&color=a8a8a8"
                alt="clock icon"
              />

              {firstOpenDay && (
                <p id={styles["workingHours"]} onClick={showModal}>
                  {`Available from ${firstOpenDay.hours.open} to
                  ${firstOpenDay.hours.close}.`}
                </p>
              )}

              <Modal
                classNames={{
                  close: test.close,
                  content: test.content,
                  title: test.title,
                  inner: test.inner,
                  root: test.root,
                  header: test.header,
                  body: test.body,
                }}
                opened={isModalVisible}
                onClose={closeModal}
                title="Working Hours"
                transitionProps={{ transition: "rotate-left" }}
              >
                {Object.entries(working_hours).map(([day, hours]) => (
                  <p key={day}>{formatWorkingHours(day, hours)}</p>
                ))}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
