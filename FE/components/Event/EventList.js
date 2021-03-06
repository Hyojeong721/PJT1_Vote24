import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import SearchBar from "../SearchBar";
import axios from "axios";
import Link from "next/link";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";
import { toast } from "react-toastify";

const EventList = ({
  setDataList,
  dataList,
  dataListProp,
  EVENT_URL,
  currentPage,
  postsPerPage,
}) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = ["번호", "제목", "기한", "조회수", "status"];
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
      return "진행중";
    } else if (status == 1) {
      return "예정";
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
            toast.success("병원 이벤트 삭제 완료!");
          })
          .catch((error) => {
            console.log("이벤트 삭제에러", error);
            toast.error("삭제에 실패하였습니다.");
          });
        setList(list.filter((data) => data.id !== eventId));
        setDataList((state) => state.filter((data) => data.id !== eventId));
      });
    } else {
      return alert("삭제할 목록을 선택하세요.");
    }
  };

  return (
    <div>
      <div className={cn(listbtn.btns)}>
        <div>
          <SearchBar setPostList={setDataList} postListProp={dataListProp} />
        </div>
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
                checked={list.length && checkList.length === idList.length}
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
          {list.length ? (
            list.map((item, index) => {
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
                    content={index + 1 + (currentPage - 1) * postsPerPage}
                    name="event"
                    id={item.id}
                  ></TableColumn>
                  <TableColumn
                    content={item.title}
                    name="event"
                    id={item.id}
                  ></TableColumn>
                  <TableColumn
                    content={`${DateForm(item.start_at)}~${DateForm(
                      item.end_at
                    )}`}
                    name="event"
                    id={item.id}
                  ></TableColumn>
                  <TableColumn
                    content={item.views}
                    name="event"
                    id={item.id}
                  ></TableColumn>
                  <TableColumn
                    content={onStatus(item.status)}
                    name="event"
                    id={item.id}
                  ></TableColumn>
                </TableRow>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>작성된 이벤트가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
