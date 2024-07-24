import styles from "./SearchCategory.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "../../components/template/Page";
import { SearchCategoryWrapper } from "../../components/search/SearchCategoryWrapper/SearchCategoryWrapper";
import { CardWrapper } from "../../components/specific/CardWrapper/CardWrapper";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { useBusinesses } from "../../api/business/queries/fetchBusinesses";

export const SearchCategory = () => {
  const { category } = useParams();

  const { data: businesses, isLoading, isError, error } = useBusinesses();

  return (
    <Page>
      <section className={styles.searchCategory}>
        <div className={styles.categoryWrapperHolder}>
          <h2>Categories</h2>

          <SearchCategoryWrapper />
        </div>

        <div className={styles.cardWrapperHolder}>
          <h2>{category}</h2>

          {!isLoading ? (
            <CardWrapper category={category} businesses={businesses} />
          ) : (
            <Spinner />
          )}
        </div>

        {isError && <p>{error.message}</p>}
      </section>
    </Page>
  );
};
