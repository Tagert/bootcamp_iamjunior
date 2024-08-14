import styles from "./UserRatedStars.module.scss";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

type UserRatedStarsProps = {
  className?: string;
  starStyle?: string;
  rating: number;
};

export const UserRatedStars = ({
  className,
  starStyle,
  rating,
}: UserRatedStarsProps) => {
  const roundToHalf = (num: number) => Math.floor(num * 2) / 2;

  const roundedRating = roundToHalf(rating);

  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`${className} ${styles.ratingBox}`}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className={`${starStyle} ${styles.filledStar}`} />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt className={`${starStyle} ${styles.halfStar}`} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar
          key={fullStars + i + (hasHalfStar ? 1 : 0)}
          className={`${starStyle} ${styles.emptyStar}`}
        />
      ))}
    </div>
  );
};
