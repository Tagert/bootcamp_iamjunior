import styles from "./BusinessWrapper.module.scss";
import { BusinessCard } from "../BusinessCard/BusinessCart";
import { BusinessExtrasWrapper } from "../BusinessExtrasWrapper/BusinessExtrasWrapper";
import { BusinessType } from "../../../types/business.type";

type BusinessWrapperProps = {
  business: BusinessType | undefined;
  business_params_id: string;
  error: Error | null;
};

export const BusinessWrapper = ({
  business,
  business_params_id,
  error,
}: BusinessWrapperProps) => {
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
            business_id={business_params_id}
            description={business.description}
            images_url={business.images_url}
            working_hours={business.working_hours}
          />
        </>
      )}
      {error && <p>Error loading business: {error.message}</p>}
    </section>
  );
};
