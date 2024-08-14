import styles from "./ReviewCard.module.scss";
import { RatingStars } from "../../common/RatingStars/RatingStars";

export const ReviewCard = () => {
  return (
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
          quidem, id inventore architecto dicta dolores voluptatibus sequi culpa
          quos assumenda rerum, ullam, dolor explicabo provident?
        </p>
      </div>
    </div>
  );
};
