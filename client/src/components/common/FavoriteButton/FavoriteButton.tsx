import { useState } from "react";
import styles from "./FavoriteButton.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
  const [isCooldown, setIsCooldown] = useState(false);

  const handleClick = () => {
    onFavoriteChange();

    setIsCooldown(true);

    setIsHovered(false);

    setTimeout(() => {
      setIsCooldown(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={styles.favoriteButton}
      disabled={isUpdating}
      onMouseEnter={() => !isCooldown && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorite ? (
        isHovered && !isCooldown ? (
          <FaRegHeart className={styles.emptyHeart} />
        ) : (
          <FaHeart className={styles.filledHeart} />
        )
      ) : isHovered && !isCooldown ? (
        <FaHeart className={styles.filledHeart} />
      ) : (
        <FaRegHeart className={styles.emptyHeart} />
      )}
    </button>
  );
};
