import styles from "./Hero.module.scss";
import { HeroTitleDescription } from "../../home/HeroTitleDescription/HeroTitleDescription";
import { SearchInput } from "../../common/SearchInput/SearchInput";

type HeroProp = {
  onSearch?: string;
  setOnSearch?: (text: string) => void;
  onSearchRedirect?: (query: string) => void;
};

export const Hero = ({ onSearch, setOnSearch, onSearchRedirect }: HeroProp) => {
  return (
    <section className={styles.hero}>
      <HeroTitleDescription />

      <SearchInput
        onSearch={onSearch}
        setOnSearch={setOnSearch}
        onSearchRedirect={onSearchRedirect}
      />
    </section>
  );
};
