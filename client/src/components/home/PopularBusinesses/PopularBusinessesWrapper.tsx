import styles from "./PopularBusinessesWrapper.module.scss";
import { BusinessType } from "../../../types/business.type";
import { PopularBusinessCard } from "../PopularBusinessCard/PopularBusinessCard";

import carousel from "../../../styles/mantine_ui/carousel.module.scss";
import { Carousel } from "@mantine/carousel";

type PopularBusinessesWrapperProps = {
  category?: string;
  businesses?: BusinessType[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
};
export const PopularBusinessesWrapper = ({
  category,
  businesses,
  error,
}: PopularBusinessesWrapperProps) => {
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
    <section className={styles.popularBusinessesWrapper}>
      <div className={styles.cardHolder}>
        <Carousel
          classNames={{
            container: carousel.container,
          }}
          withIndicators
          slideSize="100%"
          skipSnaps={true}
          slidesToScroll={"auto"}
          speed={2}
          controlSize={45}
          containScroll={"keepSnaps"}
          // controlsOffset={"lg"}
        >
          {filteredBusinesses.map((business) => (
            <PopularBusinessCard
              key={business.id}
              id={business.id ?? "unknown-id"}
              user_id={business.user_id ?? "unknown-user-id"}
              {...business}
            />
          ))}

          {!filteredBusinesses?.length && (
            <p>There is no businesses in this category</p>
          )}
        </Carousel>
      </div>
    </section>
  );
};
