import styles from "./CategoryWrapper.module.scss";
import { categories } from "../../../constants/categories";
import { Category } from "../Category/Category";

export const CategoryWrapper = () => {
  return (
    <section className={styles.categoryWrapper}>
      {categories.map((category) => (
        <Category
          key={category.id}
          imgSrc={category.imgSrc}
          text={category.text}
        />
      ))}
    </section>
  );
};
