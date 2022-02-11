import { useState } from "react";

function PopularSurvery({ popularSurveys }) {
  const [surveyList, setSurveyList] = useState(popularSurveys);

  return (
    <div className="card mb-3 col-12 col-lg-5">
      <div className="card-body">
        <h2 className="card-title">인기 설문</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">제목</th>
              <th scope="col"></th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody>
            {surveyList.length &&
              surveyList.map((el) => (
                <tr key={el.id}>
                  <th scope="row">{el.id}</th>
                  <td>{el.title}</td>
                  <td>{el.userId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopularSurvery;
