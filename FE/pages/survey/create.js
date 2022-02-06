import React from "react";
import Header from "../../components/Header";
import SurveyCreateForm from "../../components/Survey/SurveyCreateForm";
import BackButton from "../../components/BackButton";

function SurveyCreate() {
  return (
    <div>
      <Header title="설문 생성"></Header>
      <div className="mb-3">
        <BackButton url={`/survey`} />
        <SurveyCreateForm />
      </div>
    </div>
  );
}

export default SurveyCreate;
