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
      <Carousel
        classNames={{
          container: carousel.container,
          indicator: carousel.indicator,
          slide: carousel.slide,
          viewport: carousel.viewport,
          root: carousel.root,
        }}
        withIndicators
        slidesToScroll={4}
        speed={3}
        controlSize={45}
        containScroll={"trimSnaps"}
        controlsOffset={"lg"}
        slideSize={{ base: "100%", sm: "50%", md: "25%" }}
      >
        {filteredBusinesses.map((business) => (
          <Carousel.Slide key={business.id}>
            <PopularBusinessCard
              id={business.id ?? "unknown-id"}
              user_id={business.user_id ?? "unknown-user-id"}
              {...business}
            />
          </Carousel.Slide>
        ))}

        {!filteredBusinesses?.length && (
          <p>There is no businesses in this category</p>
        )}
      </Carousel>
    </section>
  );
};
