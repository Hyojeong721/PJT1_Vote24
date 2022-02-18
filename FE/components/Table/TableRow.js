import React from "react";
import Link from "next/link";

const TableRow = ({ children, id, name }) => {
  return <tr className="table-row">{children}</tr>;
};

export default TableRow;
