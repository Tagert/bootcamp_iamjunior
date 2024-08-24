import styles from "./ReviewCard.module.scss";
import { UserRatedStars } from "../../common/UserRatedStars/UserRatedStars";
import { useUser } from "../../../api/user/queries/fetchUserById";
import { Spinner } from "../../common/Spinner/Spinner";
import { UserType } from "../../../types/user.types";

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
  const { data: userData, isLoading } = useUser(user_id || "") as {
    data: UserType | undefined;
    isLoading: boolean;
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.addedUser}>
        {!isLoading ? (
          <h3>{userData ? userData.name : "Unknown User"}</h3>
        ) : (
          <Spinner />
        )}

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
