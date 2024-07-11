import { useFetch } from "../../hooks/useFetch";
import { CategoryType } from "../../types/category.types";
import { SearchCategoryCard } from "./SearchCategoryCard";
import styles from "./SearchCategoryWrapper.module.scss";

export const SearchCategoryWrapper = () => {
  const [categories] = useFetch<CategoryType[] | undefined>(
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
