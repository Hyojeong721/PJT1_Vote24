import React from "react";
import Link from "next/link";

const TableColumn = ({ fixed, content, url }) => {
  if (fixed & (fixed == 1)) {
    return (
      <td className="table-column">
        <Link href={url} passHref>
          <a>고정</a>
        </Link>
      </td>
    );
  }
  return (
    <td className="table-column">
      <Link href={url} passHref>
        <a>{content}</a>
      </Link>
    </td>
  );
};

export default TableColumn;
