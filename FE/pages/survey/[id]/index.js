import axios from "axios";
import Header from "../../../components/Header";
import SurveyDetailItem from "../../../components/Survey/SurveyDetailItem";
import MoreResult from "../../../components/Survey/MoreResult";
import GoSurveyList from "../../../components/Survey/GoSurveyList";

function SurveyDetail({ sId, surveyDetail }) {
  return (
    <div>
      <Header title="설문 상세"></Header>
      <div className="container">
        <SurveyDetailItem sId={sId} surveyDetail={surveyDetail} />
        <GoSurveyList url={"/survey"} category={surveyDetail.category} />
        <MoreResult></MoreResult>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const sId = params.id;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    console.log("surveydata_axios_get_result", res.data);
    return res.data;
  });

  return {
    props: {
      sId,
      surveyDetail,
    },
  };
}

export default SurveyDetail;
