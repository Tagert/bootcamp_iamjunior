import styles from "./SimilarBusinessesWrapper.module.scss";
import { useNavigate } from "react-router-dom";
import { BusinessType } from "../../../types/business.type";
import { Spinner } from "../../common/Spinner/Spinner";
import { SimilarBusinessesCard } from "../SimilarBusinessesCard/SimilarBusinessesCard";

type SimilarBusinessWrapperProps = {
  similarBusinesses: BusinessType[];
  isLoading: boolean;
  error: Error | null;
};
export const SimilarBusinessWrapper = ({
  similarBusinesses,
  isLoading,
  error,
}: SimilarBusinessWrapperProps) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/business/${id}`);
  };
  return (
    <section className={styles.similarBusinessesWrapper}>
      <h3>Similar business</h3>

      {isLoading && <Spinner />}
      {error && <p>Error loading similar businesses: {error.message}</p>}
      {!isLoading &&
        !error &&
        similarBusinesses &&
        similarBusinesses.length > 0 && (
          <div className={styles.similarBusinessList}>
            {similarBusinesses.map((similarBusiness) => (
              <SimilarBusinessesCard
                key={similarBusiness.id}
                className={styles.similarBusinessCard}
                id={similarBusiness.id as string}
                name={similarBusiness.name}
                provider={similarBusiness.provider}
                address={similarBusiness.address}
                images_url={similarBusiness.images_url}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}

      {!isLoading &&
        !error &&
        similarBusinesses &&
        similarBusinesses.length === 0 && <p>No similar businesses found.</p>}
    </section>
  );
};
