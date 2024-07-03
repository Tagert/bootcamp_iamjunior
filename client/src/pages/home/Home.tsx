import styles from "./Home.module.scss";
import { useState } from "react";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/home/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Page } from "../../components/template/Page";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  return (
    <Page>
      <main className={styles.homePage}>
        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />

        <CategoryWrapper />

        <div className={styles.description}>
          <h4>Popular businesses</h4>
        </div>

        <CardWrapper />
      </main>
    </Page>
  );
};
