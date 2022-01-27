import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import Link from "next/link";
import axios from "axios";

const SURVEY_URL = "http://i6a205.p.ssafy.io:8000/api/survey";

const SurveyList = ({ dataList }) => {
  const [list, setList] = useState(dataList);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const headersName = [
    "번호",
    "작성일",
    "제목",
    "설문기한",
    "참여자수",
    "status",
    "편집",
  ];

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
      <div>
        <button>
          <Link href="/survey/create">+ 설문 생성 </Link>
        </button>
        <button onClick={handleRemove}> - 선택 삭제 </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <input
              type="checkbox"
              onChange={onChangeAll}
              checked={checkList.length === idList.length}
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
          {list
            ? list.map((item) => {
                return (
                  <TableRow key={item.id} id={item.id}>
                    <input
                      type="checkbox"
                      onChange={(e) => onChangeEach(e, item.id)}
                      checked={checkList.includes(item.id)}
                    />
                    <TableColumn>{item.id}</TableColumn>
                    <TableColumn>{DateForm(item.created_at)}</TableColumn>
                    <TableColumn>{item.title}</TableColumn>
                    <TableColumn>
                      {DateForm(item.start_at)} ~ {DateForm(item.end_at)}
                    </TableColumn>
                    <TableColumn>{item.count}</TableColumn>
                    <TableColumn>{DateForm(item.end_at)}</TableColumn>
                    <TableColumn>✏</TableColumn>
                    {/* <Link href={`/survey/${item.id}`}></Link> */}
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
