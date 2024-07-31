import styles from "./Hero.module.scss";
import search from "../../../assets/search.svg";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";
import { useNavigate } from "react-router-dom";

type HeroProp = {
  onSearch?: string;
  setOnSearch?: (text: string) => void;
  onSearchRedirect?: (query: string) => void;
};

export const Hero = ({ onSearch, setOnSearch, onSearchRedirect }: HeroProp) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearchRedirect) {
      onSearchRedirect(onSearch || "");
    }

    setTimeout(() => {
      navigate("/services");
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={styles.hero}>
      <h2>
        Find Home <span>Service/Repair</span>
        <br /> Near You
      </h2>

      <h4>Explore Best Home Service & Repair near you</h4>

      <div className={styles.searchBarHolder}>
        <input
          type="search"
          name="search_bar"
          placeholder="Search"
          value={onSearch}
          onChange={(e) => {
            if (setOnSearch) {
              setOnSearch(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
        />

        <ButtonImage
          className={styles.searchBtn}
          imgSrc={search}
          onClick={handleSearch}
        />
      </div>
    </section>
  );
};
