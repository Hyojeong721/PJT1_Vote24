import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import axios from "axios";
import Link from "next/link";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";

const NoticeList = ({
  indexlst,
  fixedCnt,
  postsPerPage,
  setDataList,
  dataList,
  url,
  createUrl,
}) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = ["번호", "제목", "생성일", "조회수"];

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
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? idList : []);
  };

  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  // 선택 삭제
  const jwt = localStorage.getItem("jwt");
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((noticeId) => {
        axios
          .delete(`${url}/${noticeId}`, {
            headers: {
              authorization: jwt,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("dddd", error);
          });
        // list 재구성 = 삭제된애들 빼고 나머지 넣기
        setList(list.filter((data) => data.id !== noticeId));
        setDataList((state) => state.filter((data) => data.id !== noticeId));
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
          <Link href={createUrl} passHref>
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

export default NoticeList;
