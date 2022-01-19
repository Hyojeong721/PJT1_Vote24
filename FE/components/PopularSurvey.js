import axios from "axios";
import { useEffect, useState } from "react";

function PopularSurvery() {
  const [surveyList, setSurveyList] = useState([]);
  const GET_SURVEY_URL = "https://jsonplaceholder.typicode.com/posts";

  const getSurvey = async () => {
    await axios
      .get(GET_SURVEY_URL)
      .then((res) => {
        setSurveyList(res.data.slice(0, 5));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSurvey();
  }, []);

  return (
    <div class="large-card card mb-3">
      <div class="card-body">
        <h2 class="card-title">인기 설문</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">제목</th>
              <th scope="col"></th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody>
            {surveyList.map((el) => (
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
