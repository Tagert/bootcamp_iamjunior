import styles from "./SearchCategory.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "../../components/template/Page";
import { SearchCategoryWrapper } from "../../components/search/SearchCategoryWrapper";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";

export const SearchCategory = () => {
  const { category } = useParams();

  return (
    <Page>
      <section className={styles.searchCategory}>
        <div className={styles.categoryWrapperHolder}>
          <h2>Categories</h2>

          <SearchCategoryWrapper />
        </div>

        <div className={styles.cardWrapperHolder}>
          <h2>{category}</h2>

          <CardWrapper category={category} />
        </div>
      </section>
    </Page>
  );
};
