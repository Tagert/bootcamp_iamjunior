import { ImagesType } from "../../../types/business.type";
import styles from "./SimilarBusinessesCard.module.scss";

type SimilarBusinessesCardProps = {
  className?: string;
  id: string;
  name: string;
  provider: string;
  address: string;
  images_url: ImagesType[];
  onClick: (id: string) => void;
};

export const SimilarBusinessesCard = ({
  className,
  id,
  name,
  provider,
  address,
  images_url,
  onClick,
}: SimilarBusinessesCardProps) => {
  return (
    <section
      className={`${styles.SimilarBusinessesCard} ${className}`}
      onClick={() => onClick(id)}
    >
      <div className={styles.imageBox}>
        <img src={images_url[0].url} alt={`Company name: ${name}`} />
      </div>

      <div className={styles.businessDescription}>
        <h2>{name}</h2>
        <h4>{provider}</h4>
        <p>{address}</p>
      </div>
    </section>
  );
};
