import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import Link from "next/link";
import axios from "axios";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";

const SURVEY_URL = "http://i6a205.p.ssafy.io:8000/api/survey";

const SurveyList = ({ dataList }) => {
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
    if (status) {
      return <div>진행중</div>;
    } else {
      return <div>마감</div>;
    }
  };
  // 설문 목록의 모든 설문id값을 idList에 넣는다.
  useEffect(() => {
    // 이 화면에서 이용할 list변수에 부모한테 받아온 data들 다 넣어주기
    setList(dataList);

    let ids = [];
    dataList.map((item, i) => {
      ids[i] = item.id;
    });
    setIdList(ids);
  }, [dataList]);

  // 전체 선택/해제
  const onChangeAll = (e) => {
    // 체크할 시 checkList에 id 값 전체 넣기, 체크 해제할 시 checkList에 빈 배열 넣기
    setCheckList(e.target.checked ? idList : []);
  };
  // 개별 선택/해제
  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      console.log(checkList);
      // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  // 선택 삭제
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((surveyId) => {
        axios
          .delete(`${SURVEY_URL}/${surveyId}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        // list 재구성 = 삭제된애들 빼고 나머지 넣기
        setList(list.filter((data) => data.id !== surveyId));
      });
    } else {
      return alert("삭제할 설문을 선택하세요.");
    }
  };

  return (
    <div>
      <div className={cn(listbtn.btns)}>
        <div>검색</div>
        <div>
          <Link href={"create"} passHref>
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
                  <TableRow key={item.id} id={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeEach(e, item.id)}
                        checked={checkList.includes(item.id)}
                      />
                    </td>

                    <TableColumn content={index + 1} url={`${item.id}`} />
                    <TableColumn content={item.title} url={`${item.id}`} />
                    <TableColumn
                      content={`${DateForm(item.start_at)} ~ ${DateForm(
                        item.end_at
                      )}`}
                      url={`${item.id}`}
                    />
                    <TableColumn
                      content={DateForm(item.created_at)}
                      url={`${item.id}`}
                    />
                    <TableColumn content={item.count} url={`${item.id}`} />
                    <TableColumn
                      content={statusicon(item.status)}
                      url={`${item.id}`}
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
