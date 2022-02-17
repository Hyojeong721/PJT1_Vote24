import Link from "next/link";

function PopularSurvery({ popularSurveys }) {
  if (!popularSurveys.length) {
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">인기 설문</h2>
          <div>진행 중인 설문이 없습니다.</div>
        </div>
      </div>
    );
  }

  const paintPopularSurveys = popularSurveys.map((s, idx) => (
    <Link key={s.id} href={`/survey/${s.id}`}>
      <tr>
        <th scope="row">{idx + 1}</th>
        <td>{s.title}</td>
        <td>{s.userId}</td>
        <td>{s.count}</td>
      </tr>
    </Link>
  ));

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">인기 설문</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">제목</th>
              <th scope="col"></th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody className="pointerHover">
            {popularSurveys.length > 0 ? paintPopularSurveys : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopularSurvery;
