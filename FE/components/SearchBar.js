import cn from "classnames";
import { useState } from "react";
import styles from "../styles/searchbar.module.css";

function SearchBar({ setPostList, postListProp }) {
  const [searchInput, setSearchInput] = useState("");
  const [timer, setTimer] = useState(null);

  const handleOnChange = (value) => {
    clearTimeout(timer);
    setSearchInput(value);
    const newTimer = setTimeout(() => {
      triggerChange(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      triggerChange(e.target.value);
    }
  };

  const triggerChange = (value) => {
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
          onKeyDown={(e) => handleKeyDown(e)}
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
