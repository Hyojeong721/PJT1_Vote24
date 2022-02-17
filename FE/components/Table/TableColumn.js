import React from "react";
import Link from "next/link";

const TableColumn = ({ fixed, content, name, id }) => {
  if (fixed & (fixed == 1)) {
    return (
      <Link href={`/${name}/${id}`}>
        <td className="table-column">[고정]</td>
      </Link>
    );
  }
  return (
    <Link href={`/${name}/${id}`}>
      <td className="table-column">{content}</td>
    </Link>
  );
};

export default TableColumn;
