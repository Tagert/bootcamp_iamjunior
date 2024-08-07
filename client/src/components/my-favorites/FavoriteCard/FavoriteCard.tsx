import styles from "./FavoriteCard.module.scss";
import { routes } from "../../../routes/routes";
import { Button } from "../../common/Button/Button";
import { ContactType } from "../../../types/contact.type";
import { useNavigate } from "react-router-dom";
import { ImagesType } from "../../../types/business.type";
import { useAuthStore } from "../../../store/use-auth.store";
import { FavoriteButton } from "../../common/FavoriteButton/FavoriteButton";
import { useFavorite } from "../../../hooks/useFavorite";

export type FavoriteCardProp = {
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

export const FavoriteCard = ({
  id,
  name,
  category,
  provider,
  address,
  images_url,
  price,
}: FavoriteCardProp) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { isFavorite, toggleFavorite, isUpdating } = useFavorite(id);

  const handleNavigateToBusinessId = () => {
    navigate(`/${routes.BUSINESS_ID.url(id).toLocaleLowerCase()}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={images_url[0].url} alt={images_url[0].alt_text} />

        {user && (
          <FavoriteButton
            isFavorite={isFavorite}
            onFavoriteChange={toggleFavorite}
            isUpdating={isUpdating}
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