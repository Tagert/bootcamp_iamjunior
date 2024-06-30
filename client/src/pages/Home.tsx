import styles from "./Home.module.scss";
import { useState } from "react";
import { CardWrapper } from "../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../components/home/CategoryWrapper";
import { Hero } from "../components/spec/Hero/Hero";
import { Navbar } from "../components/spec/Navbar/Navbar";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  return (
    <main className={styles.homePage}>
      <Navbar />

      <Hero onSearch={onSearch} setOnSearch={setOnSearch} />

      <CategoryWrapper />

      <div className={styles.description}>
        <h4>Popular businesses</h4>
      </div>

      <CardWrapper />
    </main>
  );
};
