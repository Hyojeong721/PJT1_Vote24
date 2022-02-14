import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import axios from "axios";
import Link from "next/link";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";

const EventList = ({ dataList, EVENT_URL }) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = ["번호", "제목", "기한", "조회수", "status"];
  console.log(dataList);

  useEffect(() => {
    setList(dataList);

    let ids = [];
    dataList.map((item, i) => {
      ids[i] = item.id;
    });

    setIdList(ids);
  }, [dataList]);

  const onStatus = (status) => {
    if (status == 0) {
      return "예정";
    } else if (status == 1) {
      return "진행중";
    } else {
      return "마감";
    }
  };

  // 전체 선택/해제
  const onChangeAll = (e) => {
    setCheckList(e.target.checked ? idList : []);
  };
  // 개별 선택/해제
  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  // 선택 삭제
  const jwt = localStorage.getItem("jwt");
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((eventId) => {
        axios
          .delete(`${EVENT_URL}/${eventId}`, {
            headers: {
              authorization: jwt,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        // list 재구성 = 삭제된애들 빼고 나머지 넣기
        setList(list.filter((data) => data.id !== eventId));
      });
    } else {
      return alert("삭제할 목록을 선택하세요.");
    }
  };

  return (
    <div>
      <div className={cn(listbtn.btns)}>
        <div>검색</div>
        <div>
          <Link href="/event/create" passHref>
            <button className={cn(listbtn.createbtn, "btn btn-primary")}>
              글쓰기
            </button>
          </Link>
          <button
            className={cn(listbtn.deletebtn, "btn btn-secondary")}
            onClick={handleRemove}
          >
            선택 삭제
          </button>
        </div>
      </div>
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
                <td className="table-header-column" key={index}>
                  {item}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list
            ? list.map((item) => {
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
                      content={item.id}
                      url={`event/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.title}
                      url={`event/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={`${DateForm(item.start_at)}~${DateForm(
                        item.end_at
                      )}`}
                      url={`event/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.views}
                      url={`event/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={onStatus(item.status)}
                      url={`event/${item.id}`}
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

export default EventList;
