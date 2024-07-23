import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { CardWrapper } from "../../components/spec/CardWrapper/CardWrapper";
import { CategoryWrapper } from "../../components/home/CategoryWrapper";
import { Hero } from "../../components/spec/Hero/Hero";
import { Page } from "../../components/template/Page";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { useBusinesses } from "../../api/fetchBusinesses";
import { useCategories } from "../../api/fetchCategories";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PopularBusinessesWrapper } from "../../components/home/PopularBusinesses/PopularBusinessesWrapper";

type LocationState = {
  fromLogin?: boolean;
};

export const Home = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.fromLogin) {
      toast.success(`Successfully logged in!`);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
      <ToastContainer />
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

        {!isBusinessesLoading ? (
          <PopularBusinessesWrapper
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
