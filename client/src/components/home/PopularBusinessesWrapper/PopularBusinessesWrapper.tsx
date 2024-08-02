import styles from "./PopularBusinessesWrapper.module.scss";
import { BusinessType } from "../../../types/business.type";
import { PopularBusinessCard } from "../PopularBusinessCard/PopularBusinessCard";

import carousel from "../../../styles/mantine_ui/carousel.module.scss";
import { Carousel } from "@mantine/carousel";

type PopularBusinessesWrapperProps = {
  businesses?: BusinessType[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
};
export const PopularBusinessesWrapper = ({
  businesses,
  error,
}: PopularBusinessesWrapperProps) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!businesses || !Array.isArray(businesses)) {
    return <div>No businesses to display</div>;
  }

  //TODO: need to decide if I need to mutate original array or not..
  const sortedBusinesses = [...businesses].sort((a, b) => {
    const aCount = a.favorite_count ?? 0;
    const bCount = b.favorite_count ?? 0;

    return bCount - aCount;
  });

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
        {sortedBusinesses.map((business) => (
          <Carousel.Slide key={business.id}>
            <PopularBusinessCard
              id={business.id ?? "unknown-id"}
              user_id={business.user_id ?? "unknown-user-id"}
              {...business}
            />
          </Carousel.Slide>
        ))}

        {!sortedBusinesses?.length && (
          <p>There is no businesses in this category</p>
        )}
      </Carousel>
    </section>
  );
};
