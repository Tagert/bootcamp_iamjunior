import styles from "./CategoryCard.module.scss";
import { routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

type CategoryCardProp = {
  imgSrc: string;
  text: string;
};

export const CategoryCard = ({ imgSrc, text }: CategoryCardProp) => {
  const navigate = useNavigate();

  const handleCategoryNavigate = () => {
    navigate(routes.SEARCH_CATEGORY.url(text).toLocaleLowerCase());
  };

  return (
    <div className={styles.categoryCard} onClick={handleCategoryNavigate}>
      <img src={imgSrc} alt={`${text} icon`} />

      <p>{text}</p>
    </div>
  );
};
