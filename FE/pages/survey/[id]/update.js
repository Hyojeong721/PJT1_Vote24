import React from "react";
import axios from "axios";
import Header from "../../../components/Header";
import SurveyUpdateForm from "../../../components/Survey/SurveyUpdateForm";
import BackButton from "../../../components/BackButton";

function SurveyUpdate({ sId, surveyDetail }) {
  return (
    <div>
      <Header title="설문 수정"></Header>
      <div className="position-relative my-3">
        <BackButton url={`/survey/${sId}`} />
        <SurveyUpdateForm surveyDetail={surveyDetail} sId={sId} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const sId = params.id;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      sId,
      surveyDetail,
    },
  };
}

export default SurveyUpdate;
