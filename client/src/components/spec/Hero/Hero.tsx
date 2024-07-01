import styles from "./Hero.module.scss";
import search from "../../../assets/search.svg";
import { ButtonImage } from "../../common/ButtonImage/ButtonImage";

type HeroProp = {
  onSearch: string;
  setOnSearch: (text: string) => void;
};

export const Hero = ({ onSearch, setOnSearch }: HeroProp) => {
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
            setOnSearch(e.target.value);
          }}
        />

        <ButtonImage className={styles.searchBtn} imgSrc={search} />
      </div>
    </section>
  );
};
