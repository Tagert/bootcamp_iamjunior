import styles from "./BusinessWrapper.module.scss";
import { BusinessCard } from "../BusinessCard/BusinessCart";
import { BusinessExtrasWrapper } from "../BusinessExtrasWrapper/BusinessExtrasWrapper";
import { BusinessType } from "../../../types/business.type";

type BusinessWrapperProps = {
  business: BusinessType | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const BusinessWrapper = ({
  business,
  isLoading,
  error,
}: BusinessWrapperProps) => {
  return (
    <section className={styles.businessWrapper}>
      {business && business.user_id && <BusinessCard {...business} />}

      {error && <p>Error loading business: {error.message}</p>}

      <BusinessExtrasWrapper />
    </section>
  );
};
