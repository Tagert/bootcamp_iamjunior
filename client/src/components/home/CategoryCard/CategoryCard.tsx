import styles from "./CategoryCard.module.scss";
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";

type CategoryCardProp = {
  id?: string;
  name: string;
  color?: string;
  icon_url: string;
};

export const CategoryCard = ({ name, icon_url }: CategoryCardProp) => {
  const navigate = useNavigate();

  const handleCategoryNavigate = () => {
    navigate(routes.SEARCH_CATEGORY.url(name).toLocaleLowerCase());
  };

  return (
    <div className={styles.categoryCard} onClick={handleCategoryNavigate}>
      <img src={icon_url} alt={`${name} icon`} />

      <p>{name}</p>
    </div>
  );
};
