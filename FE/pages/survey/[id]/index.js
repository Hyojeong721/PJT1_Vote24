import Header from "../../../components/Header";
import SurveyDetailItem from "../../../components/Survey/SurveyDetailItem";
import { useRouter } from "next/router";

function SurveyDetail() {
  const router = useRouter();
  const sId = router.query.id;

  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  return (
    <div>
      <Header title="설문 상세"></Header>
      <div className="container">
        <SurveyDetailItem sId={sId} url={SURVEY_DETAIL_URL}></SurveyDetailItem>
      </div>
    </div>
  );
}

export default SurveyDetail;
