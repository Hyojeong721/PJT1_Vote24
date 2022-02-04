import React from "react";
import Link from "next/link";

const TableRow = ({ children }) => {
  return <tr className="table-row">{children}</tr>;
};

export default TableRow;
