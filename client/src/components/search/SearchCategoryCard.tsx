import styles from "./SearchCategoryCard.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";

type CategoryCardProp = {
  id?: string;
  name: string;
  color?: string;
  icon_url: string;
};

export const SearchCategoryCard = ({ name, icon_url }: CategoryCardProp) => {
  const params = useParams();

  const navigate = useNavigate();

  const categoryPath = generatePath(routes.SEARCH_CATEGORY.path, {
    category: name.toLowerCase(),
  });

  const activeCategory = params.category?.toLowerCase();

  return (
    <div
      className={`${styles.searchCategoryCard} ${
        activeCategory === name.toLowerCase() ? styles.active : ""
      }`}
      onClick={() => navigate(categoryPath)}
    >
      <img src={icon_url} alt={`${name} icon`} />

      <p>{name}</p>
    </div>
  );
};
