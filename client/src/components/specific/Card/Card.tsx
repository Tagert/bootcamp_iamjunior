import styles from "./Card.module.scss";
import { useEffect, useState } from "react";
import { routes } from "../../../routes/routes";
import { Button } from "../../common/Button/Button";
import { ContactType } from "../../../types/contact.type";
import { useNavigate } from "react-router-dom";
import { ImagesType } from "../../../types/business.type";
import { FavoriteButton } from "../../common/FavoriteButton/FavoriteButton";
import { useAuthStore } from "../../../store/use-auth.store";

export type CardProp = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  address: string;
  contacts: ContactType[];
  images_url: ImagesType[];
  price: number;
};

export const Card = ({
  id,
  name,
  category,
  provider,
  address,
  images_url,
  price,
}: CardProp) => {
  const navigate = useNavigate();
  const { user, updateUser, fetchUserData } = useAuthStore();
  // const keyName: string = "favoritesId";
  const [isFavorite, setIsFavorite] = useState<boolean>(
    user?.favorites.includes(id) ?? false
  );

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.includes(id));
    }
  }, [user, id]);
  //FIXME: There is differences in this and ServiceCard, PopularBusinessCard, find out which method is better, through props or local variable-> newFavoriteStatus; Do I really need - fetchUserData(user.id) for get up to date user data?
  const handleFavoriteChange = async () => {
    if (!user) return;

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const updatedFavorites = newFavoriteStatus
      ? [...user.favorites, id]
      : user.favorites.filter((favId) => favId !== id);

    updateUser({ favorites: updatedFavorites });

    try {
      await fetchUserData(user.id);
    } catch (error) {
      console.error("Failed to fetch updated user data:", error);
    }
  };

  const handleNavigateToBusinessId = () => {
    navigate(`/${routes.BUSINESS_ID.url(id).toLocaleLowerCase()}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={images_url[0].url} alt={images_url[0].alt_text} />

        {user && (
          <FavoriteButton
            user_id={user.id}
            business_id={id}
            isFavorite={isFavorite}
            onFavoriteChange={handleFavoriteChange}
          />
        )}
      </div>

      <div className={styles.descriptionBox}>
        <p>{category}</p>

        <p>{name}</p>

        <p>{provider}</p>

        <p>{address}</p>

        <div className={styles.bookBox}>
          <Button
            className={styles.bookBtn}
            title="Book Now"
            onClick={handleNavigateToBusinessId}
          />

          <p>{`from ${price} €`}</p>
        </div>
      </div>
    </div>
  );
};
