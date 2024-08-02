import styles from "./FavoriteButton.module.scss";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useAddFavorite } from "../../../api/user/mutation/addFavorite";
import { useRemoveFavorite } from "../../../api/user/mutation/removeFavorite";

type FavoriteButtonProps = {
  user_id: string;
  business_id: string;
  isFavorite: boolean;
  onFavoriteChange: (newStatus: boolean) => void;
};

export const FavoriteButton = ({
  user_id,
  business_id,
  isFavorite,
  onFavoriteChange,
}: FavoriteButtonProps) => {
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(
        { user_id, business_id },
        {
          onSuccess: () => onFavoriteChange(false),
          onError: (error) => console.error("Error removing favorite:", error),
        }
      );
    } else {
      addFavorite(
        { user_id, business_id },
        {
          onSuccess: () => onFavoriteChange(true),
          onError: (error) => console.error("Error adding favorite:", error),
        }
      );
    }
  };

  return (
    <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
      {isFavorite ? (
        <FaStar className={styles.filledStar} />
      ) : (
        <FaRegStar className={styles.emptyStar} />
      )}
    </button>
  );
};
