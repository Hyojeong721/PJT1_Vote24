import cn from "classnames";
import styles from "../styles/searchbar.module.css";

function SearchBar() {
  return (
    <div className="w-75 d-flex justify-content-end input-group">
      <div className={styles.searchBox}>
        <form className="col-12 col-lg-auto mb-lg-0 me-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
