import styles from "./Card.module.scss";
import { useEffect, useState } from "react";
import { routes } from "../../../routes/routes";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Button } from "../../common/Button/Button";
import { ContactType } from "../../../types/contact.type";
import { useNavigate } from "react-router-dom";
import { ImagesType } from "../../../types/business.type";

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
  const keyName: string = "favoritesId";

  const [favoritesId, setFavoritesId] = useLocalStorage<string[]>(keyName, []);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoritesId.includes(id)
  );

  useEffect(() => {
    setIsFavorite(favoritesId.includes(id));
  }, [favoritesId, id]);

  const toggleFavorite = () => {
    if (id === undefined) {
      console.error("Id is undefined. Cannot toggle favorite");
      return;
    }

    if (isFavorite) {
      setFavoritesId(favoritesId.filter((favId: string) => favId !== id));
    } else {
      setFavoritesId([...favoritesId, id]);
    }
  };

  const handleNavigateToBusinessId = () => {
    navigate(`/${routes.BUSINESS_ID.url(id).toLocaleLowerCase()}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={images_url[0].url} alt={images_url[0].alt_text} />

        <button className={styles.favoriteButton} onClick={toggleFavorite}>
          {isFavorite ? (
            <FaStar className={styles.filledStar} />
          ) : (
            <FaRegStar className={styles.emptyStar} />
          )}
        </button>
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
