import styles from "./Home.module.scss";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { CategoryType } from "../../types/category.types";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/home/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Page } from "../../components/template/Page";
import { Spinner } from "../../components/common/Spinner/Spinner";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  const [categories, { isLoading, error }] = useApi<CategoryType[] | undefined>(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  return (
    <Page>
      <main className={styles.homePage}>
        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />
        {!isLoading ? <CategoryWrapper categories={categories} /> : <Spinner />}
        <div className={styles.description}>
          <h4>Popular businesses</h4>
        </div>
        <CardWrapper />
      </main>
    </Page>
  );
};
