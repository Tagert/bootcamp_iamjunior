// import styles from "./styles/App.module.scss";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/spec/Navbar/Navbar";
import { Hero } from "./components/spec/Hero/Hero";
import { CardWrapper } from "./components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "./components/spec/CategoryWrapper/CategoryWrapper";

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  return (
    <>
      <Router>
        <Navbar />

        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />

        <CategoryWrapper />

        <CardWrapper />
      </Router>
    </>
  );
};
