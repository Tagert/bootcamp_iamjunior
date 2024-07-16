import styles from "./Home.module.scss";
import { useState } from "react";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/home/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Page } from "../../components/template/Page";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { useBusinesses } from "../../api/fetchBusinesses";
import { useCategories } from "../../api/fetchCategories";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    data: businesses,
    isLoading: isBusinessesLoading,
    error: businessesError,
  } = useBusinesses();

  return (
    <Page>
      <main className={styles.homePage}>
        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />
        {!isCategoriesLoading ? (
          <CategoryWrapper categories={categories} error={categoriesError} />
        ) : (
          <Spinner />
        )}
        <div className={styles.description}>
          <h4>Popular businesses</h4>
        </div>
        {!isBusinessesLoading ? (
          <CardWrapper
            businesses={businesses}
            isLoading={isBusinessesLoading}
            error={businessesError}
          />
        ) : (
          <Spinner />
        )}
      </main>
    </Page>
  );
};
