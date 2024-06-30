import { SearchCategoryCard } from "./SearchCategoryCard";
import { categories } from "../../constants/categories";
import styles from "./SearchCategoryWrapper.module.scss";

export const SearchCategoryWrapper = () => {
  return (
    <section className={styles.searchCategoryWrapper}>
      {categories.map((category) => (
        <SearchCategoryCard
          key={category.id}
          imgSrc={category.imgSrc}
          text={category.text}
        />
      ))}
    </section>
  );
};
