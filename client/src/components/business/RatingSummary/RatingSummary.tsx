import styles from "./RatingSummary.module.scss";
import { RatingStars } from "../../common/RatingStars/RatingStars";
import { CheckboxStar } from "../../common/CheckboxStar/CheckboxStar";

export const RatingSummary = () => {
  return (
    <div className={styles.ratingBox}>
      <div className={styles.ratingScore}>
        <h4>5 / 5</h4>
        <RatingStars />
        <p>130 customer reviews</p>
      </div>

      <div className={styles.ratingFilter}>
        <CheckboxStar ratingNumber={5} progressValue={45} />
        <CheckboxStar ratingNumber={4} progressValue={15} />
        <CheckboxStar ratingNumber={3} progressValue={5} />
        <CheckboxStar ratingNumber={2} progressValue={2.5} />
        <CheckboxStar ratingNumber={1} progressValue={2.5} />
      </div>
    </div>
  );
};
