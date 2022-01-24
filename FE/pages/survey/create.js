import React, { useState } from "react";
import Header from "../../components/Header";
import SurveyCreateForm from "../../components/SurveyCreateForm";
import SurveyPreview from "../../components/SurveyPreview";

function SurveyCreate() {
  return (
    <div>
      <Header title="설문 생성"></Header>
      <SurveyCreateForm />
    </div>
  );
}

export default SurveyCreate;
