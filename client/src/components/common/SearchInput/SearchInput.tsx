import styles from "./SearchInput.module.scss";
import { ButtonImage } from "../ButtonImage/ButtonImage";

type SearchInputProps = {};

export const SearchInput = ({}: SearchInputProps) => {
  return (
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
  );
};
