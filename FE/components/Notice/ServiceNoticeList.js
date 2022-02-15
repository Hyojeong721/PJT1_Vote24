import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import axios from "axios";
import Vote24NoticeBtn from "./Vote24NoticeBtn";

const ServiceNoticeList = ({
  hospital_id,
  indexlst,
  fixedCnt,
  postsPerPage,
  setDataList,
  dataList,
  url,
}) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = ["번호", "제목", "생성일", "조회수"];
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    setList(dataList);

    let ids = [];
    {
      dataList &&
        dataList.map((item, i) => {
          ids[i] = item.id;
        });
    }

    setIdList(ids);
  }, [dataList]);

  // 전체 선택/해제
  const onChangeAll = (e) => {
    setCheckList(e.target.checked ? idList : []);
  };

  console.log(list);

  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };
  // 선택 삭제
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((noticeId) => {
        axios
          .delete(`${url}/${noticeId}`, {
            headers: {
              authorization: jwt,
            },
            data: {
              hospital_id: hospital_id,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("삭제에러", error);
          });
        setList(list.filter((data) => data.id !== noticeId));
        setDataList((state) => state.filter((data) => data.id !== noticeId));
      });
    } else {
      return alert("삭제할 목록을 선택하세요.");
    }
  };

  return (
    <div>
      <Vote24NoticeBtn userId={hospital_id} handleRemove={handleRemove} />
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-column">
              <input
                type="checkbox"
                onChange={onChangeAll}
                checked={checkList.length === idList.length}
              />
            </th>
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
          {list
            ? list.map((item, index) => {
                return (
                  <TableRow key={item.id} id={item.id}>
                    <td className="table-column">
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeEach(e, item.id)}
                        checked={checkList.includes(item.id)}
                      ></input>
                    </td>
                    <TableColumn
                      content={
                        indexlst[Math.abs(index - postsPerPage) - 1] -
                        fixedCnt +
                        1
                      }
                      fixed={item.fixed}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.title}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={DateForm(item.created_at)}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.views}
                      url={`notice/${item.id}`}
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

export default ServiceNoticeList;
