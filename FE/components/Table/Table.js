import React, { useState } from "react";

const Table = ({ headersName, children }) => {
  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);

  // 전체 선택/해제
  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <input
            type="checkbox"
            onChange={onChangeAll}
            checked={CheckList.length === IdList.length}
          />
          {headersName.map((item, index) => {
            return (
              <td className="table-header-column" key={index}>
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
