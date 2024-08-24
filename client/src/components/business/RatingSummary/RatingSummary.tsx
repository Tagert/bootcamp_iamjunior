import styles from "./RatingSummary.module.scss";
import { CheckboxStar } from "../../common/CheckboxStar/CheckboxStar";
import { UserRatedStars } from "../../common/UserRatedStars/UserRatedStars";
import { ReviewType } from "../../../types/business.type";
import { calculateProgress } from "../../../utils/calculate-progress";

type RatingSummaryProp = {
  reviews: ReviewType[];
  review_count: number;
  average_rating: number;
  handleRatingChange: (rating: number) => void;
  selectedRatings: number[];
};

export const RatingSummary = ({
  reviews,
  review_count,
  average_rating,
  handleRatingChange,
  selectedRatings,
}: RatingSummaryProp) => {
  return (
    <div className={styles.ratingBox}>
      <div className={styles.ratingScore}>
        <h4>{average_rating} / 5</h4>
        <UserRatedStars rating={average_rating} />

        <p>{review_count} customer reviews</p>
      </div>

      <div className={styles.ratingFilter}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <CheckboxStar
            key={rating}
            ratingNumber={rating}
            progressValue={calculateProgress(rating, reviews)}
            onChange={() => handleRatingChange(rating)}
            checked={selectedRatings.includes(rating)}
          />
        ))}
      </div>
    </div>
  );
};
