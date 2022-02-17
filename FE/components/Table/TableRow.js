import React from "react";
import Link from "next/link";

const TableRow = ({ children, id, name }) => {
  return (
    <Link key={id} href={`${name}/${id}`} passHref>
      <tr className="table-row">{children}</tr>
    </Link>
  );
};

export default TableRow;
