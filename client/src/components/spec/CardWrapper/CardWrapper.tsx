import styles from "./CardWrapper.module.scss";
import carousel from "../../../styles/mantine_ui/carousel.module.scss";
import { Carousel } from "@mantine/carousel";
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
        {/* TODO:implement Carousel for popular businesses */}
        {/* <Carousel
          classNames={{
            container: carousel.container,
          }}
          withIndicators
          // slideSize="100%"
          loop
          slidesToScroll={1}
          controlSize={45}
        > */}
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
        {/* </Carousel> */}
      </div>
    </section>
  );
};
