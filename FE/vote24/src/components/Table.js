import React from "react";
import "../css/table.css";

const Table = ({ headersName, children }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headersName.map((item) => {
            return (
              <td className="table-header-column" key={item.no}>
                {item}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
