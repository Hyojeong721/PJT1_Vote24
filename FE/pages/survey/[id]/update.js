import React from "react";
import axios from "axios";
import Header from "../../../components/Header";
import SurveyUpdateForm from "../../../components/Survey/SurveyUpdateForm";
import BackButton from "../../../components/BackButton";
import styles from "../../../styles/surveycreateform.module.css";

function SurveyUpdate({ sId, surveyDetail }) {
  return (
    <div>
      <Header title="설문 수정"></Header>
      <div className="position-relative my-5">
        <div className={styles.backButtonBox}>
          <BackButton url={`/survey`} />
        </div>
        <SurveyUpdateForm surveyDetail={surveyDetail} sId={sId} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const sId = params.id;
  const SURVEY_DETAIL_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    return res.data;
  });

  if (Object.keys(surveyDetail).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/survey",
      },
    };
  }

  return {
    props: {
      sId,
      surveyDetail,
    },
  };
}

export default SurveyUpdate;
