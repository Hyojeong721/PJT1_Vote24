import React from "react";

const TableColumn = ({ content, id }) => {
  return (
    <td className="table-column">
      <a href={`/notice/${id}`}>{content}</a>
    </td>
  );
};

export default TableColumn;
