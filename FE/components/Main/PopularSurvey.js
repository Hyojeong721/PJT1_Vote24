import { useState } from "react";

function PopularSurvery({ popularSurveys }) {
  const paintPopularSurveys = popularSurveys.map((s, idx) => (
    <tr key={s.id}>
      <th scope="row">{idx + 1}</th>
      <td>{s.title}</td>
      <td>{s.userId}</td>
      <td>{s.count}</td>
    </tr>
  ));

  return (
    <div className="card">
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
            {popularSurveys.length > 0 ? paintPopularSurveys : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopularSurvery;
