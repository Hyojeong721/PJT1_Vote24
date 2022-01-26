import React, { useState } from "react";
import Header from "../../components/Header";
import SurveyCreateForm from "../../components/Survey/SurveyCreateForm";

function SurveyCreate() {
  return (
    <div>
      <Header title="설문 생성"></Header>
      <SurveyCreateForm />
    </div>
  );
}

export default SurveyCreate;
