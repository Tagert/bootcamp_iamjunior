import styles from "./MyFavorites.module.scss";
import { Page } from "../../components/template/Page";
import { FavoriteCardWrapper } from "../../components/my-favorites/FavoriteCardWrapper/FavoriteCardWrapper";
import { useBusinesses } from "../../api/business/queries/fetchBusinesses";

export const MyFavorites = () => {
  const { data: businesses, isLoading, error } = useBusinesses();

  return (
    <Page>
      <main className={styles.myFavorites}>
        <div className={styles.titleContainer}>
          <h2>My Favorites</h2>
        </div>

        <FavoriteCardWrapper
          businesses={businesses}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </Page>
  );
};
