import styles from "./Home.module.scss";
import { useState } from "react";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/spec/CategoryWrapper/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Navbar } from "../../components/spec/Navbar/Navbar";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  return (
    <>
      <Navbar />

      <Hero onSearch={onSearch} setOnSearch={setOnSearch} />

      <CategoryWrapper />

      <CardWrapper />
    </>
  );
};
