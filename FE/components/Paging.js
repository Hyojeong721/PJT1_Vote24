import React from "react";
import cn from "classnames";
import styles from "../styles/paging.module.css";

const Paging = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((pageNum) => (
          <li
            key={pageNum}
            className={cn(styles.pageButton, "pagination_item")}
            onClick={() => paginate(pageNum)}
          >
            {pageNum}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paging;
