import { useState } from "react";
import styles from "./RatingStars.module.scss";
import { FaStar, FaRegStar } from "react-icons/fa";

type RatingStarsProps = {
  className?: string;
  starStyle?: string;
  onRatingChange?: (rating: number) => void;
};

export const RatingStars = ({
  className,
  starStyle,
  onRatingChange,
}: RatingStarsProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className={`${className} ${styles.ratingBox}`}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          className={`${starStyle} ${styles.star}`}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
        >
          {starValue <= (hover || rating) ? (
            <FaStar className={styles.filledStar} />
          ) : (
            <FaRegStar className={styles.emptyStar} />
          )}
        </span>
      ))}
    </div>
  );
};
