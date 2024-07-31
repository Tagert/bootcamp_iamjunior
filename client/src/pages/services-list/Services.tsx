import styles from "./Services.module.scss";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Page } from "../../components/template/Page";
import { Hero } from "../../components/specific/Hero/Hero";
import { useBusinesses } from "../../api/business/queries/fetchBusinesses";
import { ServicesCardWrapper } from "../../components/services-list/ServicesCardWrapper/ServicesCardWrapper";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { BusinessType } from "../../types/business.type";

export const Services = () => {
  const location = useLocation();

  const [onSearch, setOnSearch] = useState<string>("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessType[]>(
    []
  );
  const [debouncedSearch] = useDebounce(onSearch, 300);

  const { data: businesses, isLoading, error } = useBusinesses();

  useEffect(() => {
    const state = location.state as { searchQuery?: string };
    if (state?.searchQuery) {
      setOnSearch(state.searchQuery);
    }
  }, [location.state]);

  useEffect(() => {
    if (businesses) {
      const fuse = new Fuse(businesses, {
        keys: ["name", "provider"],
        threshold: 0.2,
      });

      const result = debouncedSearch
        ? fuse.search(debouncedSearch).map((res) => res.item)
        : businesses;

      setFilteredBusinesses(result);
    }
  }, [businesses, debouncedSearch]);

  return (
    <Page>
      <main className={styles.services}>
        <Hero onSearch={onSearch} setOnSearch={setOnSearch} />
        <h1>Businesses:</h1>

        {!isLoading ? (
          <ServicesCardWrapper
            businesses={filteredBusinesses}
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
