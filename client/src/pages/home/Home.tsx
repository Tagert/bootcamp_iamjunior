import styles from "./Home.module.scss";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { CategoryType } from "../../types/category.types";
import { BusinessType } from "../../types/business.type";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/home/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Page } from "../../components/template/Page";
import { Spinner } from "../../components/common/Spinner/Spinner";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  const [
    categories,
    { isLoading: isCategoriesLoading, error: categoriesError },
  ] = useApi<CategoryType[] | undefined>("/categories");
  const [
    businesses,
    { isLoading: isBusinessesLoading, error: businessesError },
  ] = useApi<BusinessType[] | undefined>("/businesses");

  const isLoading = isCategoriesLoading || isBusinessesLoading;
  const error = categoriesError || businessesError;

  return (
    <Page>
      <main className={styles.homePage}>
        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />
        {!isLoading ? (
          <CategoryWrapper categories={categories || []} error={error} />
        ) : (
          <Spinner />
        )}
        <div className={styles.description}>
          <h4>Popular businesses</h4>
        </div>
        {!isLoading ? (
          <CardWrapper
            businesses={businesses}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <Spinner />
        )}
      </main>
    </Page>
  );
};
