import styles from "./RatingStars.module.scss";
import { FaRegStar } from "react-icons/fa";

type RatingStarsProps = { className?: string; starStyle?: string };

export const RatingStars = ({ className, starStyle }: RatingStarsProps) => {
  return (
    <div className={`${className} ${styles.ratingBox}`}>
      <FaRegStar className={`${starStyle} ${styles.emptyStar}`} />
      <FaRegStar className={`${starStyle} ${styles.emptyStar}`} />
      <FaRegStar className={`${starStyle} ${styles.emptyStar}`} />
      <FaRegStar className={`${starStyle} ${styles.emptyStar}`} />
      <FaRegStar className={`${starStyle} ${styles.emptyStar}`} />
    </div>
  );
};
