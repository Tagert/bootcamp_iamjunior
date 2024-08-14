import styles from "./ReviewCard.module.scss";
import { UserRatedStars } from "../../common/UserRatedStars/UserRatedStars";

export const ReviewCard = () => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.addedUser}>
        <h3>User name</h3>
        <p>Date</p>
      </div>
      <div className={styles.givenUserRating}>
        <UserRatedStars
          className={styles.userStarBox}
          starStyle={styles.userStars}
          rating={4}
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
