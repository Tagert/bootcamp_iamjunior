import styles from "./SearchCategory.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "../../components/template/Page";
import { SearchCategoryWrapper } from "../../components/search/SearchCategoryWrapper";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { BusinessType } from "../../types/business.type";
import { useApi } from "../../hooks/useApi";
import { Spinner } from "../../components/common/Spinner/Spinner";

export const SearchCategory = () => {
  const { category } = useParams();

  const [businesses, { isLoading, error }] = useApi<BusinessType[] | undefined>(
    "/businesses"
  );

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

        {error && <p>{error.message}</p>}
      </section>
    </Page>
  );
};
