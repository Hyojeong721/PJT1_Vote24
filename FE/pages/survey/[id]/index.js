import React from "react";
import { useRouter } from "next/router";

import Header from "../../../components/Header";
import SurveyDetailItem from "../../../components/Survey/SurveyDetailItem";

function SurveyDetail() {
  const router = useRouter();
  const { id } = router.query;

  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${id}`;

  return (
    <div>
      <Header title="설문 상세"></Header>
      <div className="container">
        <SurveyDetailItem url={SURVEY_DETAIL_URL}></SurveyDetailItem>
      </div>
    </div>
  );
}

export default SurveyDetail;
