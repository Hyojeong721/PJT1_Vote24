import React from "react";
import Link from "next/link";

const TableColumn = ({ fixed, content }) => {
  if (fixed & (fixed == 1)) {
    return <td className="table-column">[고정]</td>;
  }
  return <td className="table-column">{content}</td>;
};

export default TableColumn;
