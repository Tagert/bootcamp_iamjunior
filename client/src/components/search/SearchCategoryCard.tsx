import styles from "./SearchCategoryCard.module.scss";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";

type SearchCategoryCardProp = {
  imgSrc: string;
  text: string;
};

export const SearchCategoryCard = ({
  imgSrc,
  text,
}: SearchCategoryCardProp) => {
  const params = useParams();

  const navigate = useNavigate();

  const categoryPath = generatePath(routes.SEARCH_CATEGORY.path, {
    category: text.toLowerCase(),
  });

  const activeCategory = params.category?.toLowerCase();

  return (
    <div
      className={`${styles.searchCategoryCard} ${
        activeCategory === text.toLowerCase() ? styles.active : ""
      }`}
      onClick={() => navigate(categoryPath)}
    >
      <img src={imgSrc} alt={`${text} icon`} />

      <p>{text}</p>
    </div>
  );
};
