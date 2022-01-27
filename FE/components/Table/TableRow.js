import React from "react";
import Link from "next/link";

const TableRow = ({ children, id }) => {
  return (
    <Link href={`/survey/${id}`}>
      <tr className="table-row">{children}</tr>
    </Link>
  );
};

export default TableRow;
