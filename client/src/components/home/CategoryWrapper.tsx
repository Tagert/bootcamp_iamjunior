import styles from "./CategoryWrapper.module.scss";
import { CategoryType } from "../../types/category.types";
import { CategoryCard } from "./CategoryCard";

type CategoryWrapperProps = {
  categories: CategoryType[] | undefined;
  error: Error | null;
};

export const CategoryWrapper = ({
  categories,
  error,
}: CategoryWrapperProps) => {
  return (
    <section className={styles.categoryWrapper}>
      {categories &&
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon_url={category.icon_url}
            color={category.color}
          />
        ))}

      {error && <p>{error.message}</p>}
    </section>
  );
};
