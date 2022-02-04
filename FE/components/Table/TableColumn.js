import React from "react";
import Link from "next/link";

const TableColumn = ({ content, id }) => {
  return (
    <td className="table-column">
      <a href={`/notice/${id}`}>{content}</a>
    </td>
  );
};

export default TableColumn;
