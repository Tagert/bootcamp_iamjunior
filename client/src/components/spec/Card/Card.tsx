import styles from "./Card.module.scss";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Button } from "../../common/Button/Button";

type CardProp = {
  id: string;
  imgUrl: string;
  category: string;
  title: string;
  provider: string;
  address: string;
  price: number;
};

export const Card = ({
  id,
  imgUrl,
  category,
  title,
  provider,
  address,
  price,
}: CardProp) => {
  const [favorites, setFavorites] = useLocalStorage(
    "favorites",
    [] as string[]
  );

  const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

  useEffect(() => {
    setIsFavorite(favorites.includes(id));
  }, [favorites, id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((favId: string) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imgUrl} alt="" />

        <button
          className={styles.favoriteButton}
          onClick={toggleFavorite}
          // aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>

      <div className={styles.descriptionBox}>
        <p>{category}</p>

        <p>{title}</p>

        <p>{provider}</p>

        <p>{address}</p>

        <div className={styles.bookBox}>
          <Button className={styles.bookBtn} title="Book Now" />

          <p>{`from ${price} €`}</p>
        </div>
      </div>
    </div>
  );
};
