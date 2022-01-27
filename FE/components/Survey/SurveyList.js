import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import Link from "next/link";

const SurveyList = ({ dataList }) => {
  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);
  const headersName = [
    "번호",
    "작성일",
    "제목",
    "설문기한",
    "참여자수",
    "status",
    "편집",
  ];

  // 설문 목록의 모든 설문id값을 IdList에 넣는다.
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
      console.log(CheckList);
      // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
      // = 지금 id는 체크해제 됐으니까 지금 id가 아닌 애들만 체크된 리스트로 들어가는 것
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  const handleRemove = () => {
    if (CheckList) {
      // const deleteList = async () => {
      //   const res = await axios.delete(SURVEY_HEALTH_URL);
      //   console.log("삭제", res.data);

      //   setDataList(res.data);
      // };
      console.log("dd");
    } else {
      console.log("삭제할 설문을 선택하세요");
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
                    />
                    <TableColumn>{item.id}</TableColumn>
                    <TableColumn>{DateForm(item.created_at)}</TableColumn>
                    <TableColumn>
                      <Link href={`/survey/${item.id}`}>{item.title}</Link>
                    </TableColumn>
                    <TableColumn>
                      {DateForm(item.start_at)} ~ {DateForm(item.end_at)}
                    </TableColumn>
                    <TableColumn>{item.count}</TableColumn>
                    <TableColumn>{DateForm(item.end_at)}</TableColumn>
                    <TableColumn>✏</TableColumn>
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
