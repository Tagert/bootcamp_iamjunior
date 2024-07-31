import styles from "./ServicesCardWrapper.module.scss";
import { BusinessType } from "../../../types/business.type";
import { ServiceCard } from "../ServiceCard/ServiceCard";

type ServicesCardWrapperProp = {
  category?: string;
  businesses?: BusinessType[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
};

export const ServicesCardWrapper = ({
  category,
  businesses,
  error,
}: ServicesCardWrapperProp) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!businesses || !Array.isArray(businesses)) {
    return <div>No businesses to display</div>;
  }

  const filteredBusinesses =
    category && businesses
      ? businesses.filter(
          (business) =>
            business.category.toLocaleLowerCase() ===
            category.toLocaleLowerCase()
        )
      : businesses;

  return (
    <section className={styles.cardWrapper}>
      <div className={styles.cardHolder}>
        {filteredBusinesses.map((business) => (
          <ServiceCard
            key={business.id}
            id={business.id ?? "unknown-id"}
            user_id={business.user_id ?? "unknown-user-id"}
            {...business}
          />
        ))}
      </div>
    </section>
  );
};
