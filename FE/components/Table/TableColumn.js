import React from "react";
import Link from "next/link";

const TableColumn = ({ content, url }) => {
  return (
    <td className="table-column">
      <Link href={url} passHref>
        <a>{content}</a>
      </Link>
    </td>
  );
};

export default TableColumn;
