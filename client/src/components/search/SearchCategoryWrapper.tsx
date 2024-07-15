import { useApi } from "../../hooks/useApi";
import { CategoryType } from "../../types/category.types";
import { SearchCategoryCard } from "./SearchCategoryCard";
import styles from "./SearchCategoryWrapper.module.scss";

export const SearchCategoryWrapper = () => {
  const [categories] = useApi<CategoryType[] | undefined>(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  return (
    <section className={styles.searchCategoryWrapper}>
      {categories &&
        categories.map((category) => (
          <SearchCategoryCard
            key={category.id}
            name={category.name}
            icon_url={category.icon_url}
            color={category.color}
          />
        ))}
    </section>
  );
};
