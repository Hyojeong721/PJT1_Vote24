import React from "react";
import Header from "../../components/Header";
import SurveyCreateForm from "../../components/Survey/SurveyCreateForm";
import BackButton from "../../components/BackButton";
import styles from "../../styles/surveycreateform.module.css";

function SurveyCreate() {
  return (
    <div>
      <Header title="설문 생성"></Header>
      <div className="position-relative my-3">
        <div className={styles.backButtonBox}>
          <BackButton url={`/survey`} />
        </div>
        <SurveyCreateForm />
      </div>
    </div>
  );
}

export default SurveyCreate;
