import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";

const NoticeList = ({ dataList }) => {
  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);
  const headersName = ["글번호", "생성일", "제목", "조회수"];

  useEffect(() => {
    let ids = [];

    dataList.map((item, i) => {
      ids[i] = item.id;
    });

    setIdList(ids);
  }, [dataList]);

  // 전체 선택/해제
  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };

  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };
  return (
    <div>
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
                <th className="table-header-column" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataList
            ? dataList.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <input
                      type="checkbox"
                      onChange={(e) => onChangeEach(e, item.id)}
                      checked={CheckList.includes(item.id)}
                    ></input>
                    <TableColumn content={item.id} id={item.id}></TableColumn>
                    <TableColumn
                      content={DateForm(item.created_at)}
                      id={item.id}
                    ></TableColumn>
                    <TableColumn
                      content={item.title}
                      id={item.id}
                    ></TableColumn>
                    <TableColumn
                      content={item.views}
                      id={item.id}
                    ></TableColumn>
                  </TableRow>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;
