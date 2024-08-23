import styles from "./ReviewCard.module.scss";
import { UserRatedStars } from "../../common/UserRatedStars/UserRatedStars";

type ReviewCardProp = {
  rating: number;
  title: string;
  description: string;
  date: string;
  user_id: string;
};

export const ReviewCard = ({
  rating,
  title,
  description,
  date,
  user_id,
}: ReviewCardProp) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.addedUser}>
        <h3>{user_id}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.givenUserRating}>
        <UserRatedStars
          className={styles.userStarBox}
          starStyle={styles.userStars}
          rating={rating}
        />
      </div>
      <div className={styles.descriptionBox}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};
