import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import Link from "next/link";
import axios from "axios";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";

const SurveyList = ({ url, setDataList, category, dataList }) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = [
    "번호",
    "제목",
    "설문기한",
    "참여자수",
    "작성일",
    "status",
  ];
  const statusicon = (status) => {
    if (status == 0) {
      return "진행중";
    } else if (status == 1) {
      return "예정";
    } else {
      return "마감";
    }
  };

  // 설문 목록의 모든 설문id값을 idList에 넣는다.
  useEffect(() => {
    setList(dataList);

    let ids = [];
    dataList.map((item, i) => {
      ids[i] = item.id;
    });
    setIdList(ids);
  }, [dataList]);

  // 전체 선택/해제
  const onChangeAll = (e) => {
    setCheckList(e.target.checked ? idList : []);
  };

  // 개별 선택/해제
  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      console.log(checkList);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  const jwt = localStorage.getItem("jwt");
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((surveyId) => {
        axios
          .delete(`${url}/${surveyId}`, {
            headers: {
              authorization: jwt,
            },
          })
          .then((response) => {
            console.log("삭제성공", response);
          })
          .catch((error) => {
            console.log(error);
          });
        // list 재구성 = 삭제된애들 빼고 나머지 넣기
        setList(list.filter((data) => data.id !== surveyId));
        setDataList((state) => state.filter((data) => data.id !== surveyId));
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
          <Link
            href={{
              pathname: "/survey/create",
              query: { category },
            }}
            passHref
          >
            <a className={cn(listbtn.createbtn, "btn btn-primary")}>설문작성</a>
          </Link>
          <button
            className={cn(listbtn.deletebtn, "btn btn-secondary")}
            onClick={handleRemove}
          >
            선택삭제
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
                  <TableRow key={item.id} id={item.id} name="/survey">
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeEach(e, item.id)}
                        checked={checkList.includes(item.id)}
                      />
                    </td>

                    <TableColumn
                      content={index + 1}
                      url={`${item.id}`}
                      name="survey"
                      id={item.id}
                    />
                    <TableColumn
                      content={item.title}
                      url={`${item.id}`}
                      name="survey"
                      id={item.id}
                    />
                    <TableColumn
                      content={`${DateForm(item.start_at)} ~ ${DateForm(
                        item.end_at
                      )}`}
                      name="survey"
                      id={item.id}
                    />
                    <TableColumn
                      content={item.count}
                      url={`${item.id}`}
                      name="survey"
                      id={item.id}
                    />
                    <TableColumn
                      content={DateForm(item.created_at)}
                      name="survey"
                      id={item.id}
                    />
                    <TableColumn
                      content={statusicon(item.status)}
                      name="survey"
                      id={item.id}
                    />
                  </TableRow>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};
export default SurveyList;
