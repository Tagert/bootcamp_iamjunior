import styles from "./BusinessReviewWrapper.module.scss";
import { RatingStars } from "../../common/RatingStars/RatingStars";
import { CheckboxStar } from "../../common/CheckboxStar/CheckboxStar";

type BusinessReviewWrapperProps = {
  test?: string;
};

export const BusinessReviewWrapper = ({ test }: BusinessReviewWrapperProps) => {
  return (
    <section className={styles.businessReviewWrapper}>
      <div className={styles.ratingHolder}>
        <div className={styles.ratingScore}>
          <h4>5 / 5 {test}</h4>

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

      <div className={styles.reviewCard}>
        <div className={styles.addedUser}>
          <h3>User name</h3>

          <p>Date</p>
        </div>

        <div className={styles.givenUserRating}>
          <RatingStars
            className={styles.userStarBox}
            starStyle={styles.userStars}
          />
        </div>

        <div className={styles.descriptionBox}>
          <h4>Title Title</h4>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            quidem, id inventore architecto dicta dolores voluptatibus sequi
            culpa quos assumenda rerum, ullam, dolor explicabo provident?
          </p>
        </div>
      </div>
    </section>
  );
};
