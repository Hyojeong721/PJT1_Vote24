import React from "react";
import Link from "next/link";

const TableColumn = ({ content, id }) => {
  return (
    <td className="table-column">
      <Link href={`/notice/${id}`} passHref>
        {content}
      </Link>
    </td>
  );
};

export default TableColumn;
