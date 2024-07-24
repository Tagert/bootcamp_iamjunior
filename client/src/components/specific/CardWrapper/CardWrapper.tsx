import styles from "./CardWrapper.module.scss";
import { Card } from "../Card/Card";
import { BusinessType } from "../../../types/business.type";

type CardWrapperProp = {
  category?: string;
  businesses?: BusinessType[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
};

export const CardWrapper = ({
  category,
  businesses,
  error,
}: CardWrapperProp) => {
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
          <Card
            key={business.id}
            id={business.id ?? "unknown-id"}
            user_id={business.user_id ?? "unknown-user-id"}
            {...business}
          />
        ))}

        {!filteredBusinesses?.length && (
          <p>There is no businesses in this category</p>
        )}
      </div>
    </section>
  );
};
