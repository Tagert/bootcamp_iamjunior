import { useCategories } from "../../../api/category/queries/fetchCategories";
import { SearchCategoryCard } from "../SearchCategoryCard/SearchCategoryCard";
import styles from "./SearchCategoryWrapper.module.scss";

export const SearchCategoryWrapper = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

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
