import styles from "./FavoriteCardWrapper.module.scss";
import { BusinessType } from "../../../types/business.type";
import { FavoriteCard } from "../FavoriteCard/FavoriteCard";
import { Spinner } from "../../common/Spinner/Spinner";
import { useAuthStore } from "../../../store/use-auth.store";

type FavoriteCardWrapperProp = {
  businesses?: BusinessType[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
};

export const FavoriteCardWrapper = ({
  businesses,
  isLoading,
  error,
}: FavoriteCardWrapperProp) => {
  const { user } = useAuthStore();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!businesses || !Array.isArray(businesses)) {
    return <div>No favorite businesses to display</div>;
  }

  const favoriteBusinessIds = user?.favorites ?? [];

  const filteredFavoriteBusinesses = businesses.filter(
    (business) => business.id && favoriteBusinessIds.includes(business.id)
  );

  return (
    <section className={styles.cardWrapper}>
      <div className={styles.cardHolder}>
        {filteredFavoriteBusinesses.map((business) => (
          <FavoriteCard
            key={business.id}
            id={business.id ?? "unknown-id"}
            user_id={business.user_id ?? "unknown-user-id"}
            {...business}
          />
        ))}
      </div>
    </section>
  );
};
