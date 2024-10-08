import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { CategoryWrapper } from "../../components/home/CategoryWrapper/CategoryWrapper";
import { Hero } from "../../components/specific/Hero/Hero";
import { Page } from "../../components/template/Page";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { useBusinesses } from "../../api/business/queries/fetchBusinesses";
import { useCategories } from "../../api/category/queries/fetchCategories";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PopularBusinessesWrapper } from "../../components/home/PopularBusinessesWrapper/PopularBusinessesWrapper";

type LocationState = {
  fromLogin?: boolean;
  searchQuery?: string;
};

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.fromLogin) {
      toast.success(`Successfully logged in!`);
      window.history.replaceState({}, document.title);
    }

    if (state?.searchQuery) {
      setSearchQuery(state.searchQuery);
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

  const handleSearchRedirect = (query: string) => {
    navigate("/services", { state: { searchQuery: query } });
  };

  return (
    <Page>
      <main className={styles.homePage}>
        <Hero
          onSearch={searchQuery}
          setOnSearch={setSearchQuery}
          onSearchRedirect={handleSearchRedirect}
        />

        {!isCategoriesLoading ? (
          <CategoryWrapper categories={categories} error={categoriesError} />
        ) : (
          <Spinner />
        )}
        <div className={styles.description}>
          <h4>Popular businesses</h4>
        </div>

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
