import SurveyResult from "../../../components/Survey/SurveyResult";
import GoSurveyList from "../../../components/Survey/GoSurveyList";
import Header from "../../../components/Header";

function Result() {
  return (
    <div>
      <Header title="설문 결과"></Header>
      <div className="container">
        <SurveyResult></SurveyResult>
        <GoSurveyList url={"/survey"} />
      </div>
    </div>
  );
}

export default Result;
