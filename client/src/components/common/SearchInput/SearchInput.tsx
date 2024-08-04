import styles from "./SearchInput.module.scss";
import search from "../../../assets/search.svg";
import { ButtonImage } from "../ButtonImage/ButtonImage";
import { useNavigate } from "react-router-dom";

type SearchInputProps = {
  onSearch?: string;
  setOnSearch?: (text: string) => void;
  onSearchRedirect?: (query: string) => void;
};

export const SearchInput = ({
  onSearch,
  setOnSearch,
  onSearchRedirect,
}: SearchInputProps) => {
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
