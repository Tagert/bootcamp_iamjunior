import styles from "./CategoryWrapper.module.scss";
import { categories } from "../../constants/categories";
import { CategoryCard } from "./CategoryCard";

export const CategoryWrapper = () => {
  return (
    <section className={styles.categoryWrapper}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          imgSrc={category.imgSrc}
          text={category.text}
        />
      ))}
    </section>
  );
};
