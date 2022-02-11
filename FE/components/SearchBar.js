import cn from "classnames";
import { useState } from "react";
import styles from "../styles/searchbar.module.css";

function SearchBar({ setPostList, postListProp }) {
  const [searchInput, setSearchInput] = useState("");

  const handleOnChange = (value) => {
    setSearchInput(value);
    setPostList(postListProp.filter((p) => p.title.includes(value)));
  };

  return (
    <div className="w-75 d-flex justify-content-end input-group">
      <div className={styles.searchBox}>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          value={searchInput}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button
          className="position-absolute top-50 end-0 translate-middle btn material-icons p-0 "
          onClick={() => handleOnChange("")}
        >
          clear
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
