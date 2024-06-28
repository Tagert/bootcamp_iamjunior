import styles from "./Category.module.scss";
import { routes } from "../../../navigation/routes";
import { useNavigate } from "react-router-dom";

type CategoryProp = {
  imgSrc: string;
  text: string;
};

export const Category = ({ imgSrc, text }: CategoryProp) => {
  const navigate = useNavigate();

  const handleCategoryNavigate = () => {
    navigate(routes.SEARCH_CATEGORY.url(text));
  };

  return (
    <div className={styles.category} onClick={handleCategoryNavigate}>
      <img src={imgSrc} alt={`${text} icon`} />

      <p>{text}</p>
    </div>
  );
};
