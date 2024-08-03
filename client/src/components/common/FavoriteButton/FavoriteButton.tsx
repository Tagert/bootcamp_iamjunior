import { useState } from "react";
import styles from "./FavoriteButton.module.scss";
import { FaStar, FaRegStar } from "react-icons/fa";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onFavoriteChange: () => void;
  isUpdating: boolean;
};

export const FavoriteButton = ({
  isFavorite,
  onFavoriteChange,
  isUpdating,
}: FavoriteButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onFavoriteChange}
      className={styles.favoriteButton}
      disabled={isUpdating}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorite ? (
        isHovered ? (
          <FaRegStar className={styles.emptyStar} />
        ) : (
          <FaStar className={styles.filledStar} />
        )
      ) : isHovered ? (
        <FaStar className={styles.filledStar} />
      ) : (
        <FaRegStar className={styles.emptyStar} />
      )}
    </button>
  );
};
