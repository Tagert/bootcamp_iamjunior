import styles from "./BusinessWrapper.module.scss";
import { BusinessCard } from "../BusinessCard/BusinessCart";
import { BusinessExtrasWrapper } from "../BusinessExtrasWrapper/BusinessExtrasWrapper";
import { BusinessType } from "../../../types/business.type";

type BusinessWrapperProps = {
  business: BusinessType | undefined;
  error: Error | null;
};

export const BusinessWrapper = ({ business, error }: BusinessWrapperProps) => {
  return (
    <section className={styles.businessWrapper}>
      {business && (
        <>
          <BusinessCard
            className={styles.businessCard}
            user_id={business.user_id ?? "unknown-user-id"}
            {...business}
          />

          <BusinessExtrasWrapper
            className={styles.businessExtrasWrapper}
            {...business}
          />
        </>
      )}
      {error && <p>Error loading business: {error.message}</p>}
    </section>
  );
};
