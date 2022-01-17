import { useState } from "react";
import Tr from "./Tr";

function Table() {
  const [info, setInfo] = useState([]);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">번호(고정)</th>
            <th scope="col">생성일</th>
            <th scope="col">제목</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <Tr info={info}></Tr>
      </table>
    </div>
  );
}

export default Table;
