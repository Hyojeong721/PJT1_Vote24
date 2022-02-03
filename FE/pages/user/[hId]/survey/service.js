import axios from "axios";
import UserSurveyListItem from "../../../../components/User/UserSurveyListItem";
import BackButton from "../../../../components/BackButton";

function SurveyServiceUser({ hId, surveyList }) {
  console.log("surveyList:", surveyList);

  const paintSurveyList = surveyList.map((s, idx) => {
    return (
      <UserSurveyListItem
        key={idx}
        url={`/user/${hId}/survey/${s.id}`}
        idx={idx + 1}
        title={s.title}
        count={s.count}
      />
    );
  });
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="mt-3">
        <BackButton url={`/user/${hId}`} />
        <div className="text-white fs-1">병원 설문 조사</div>
      </header>
      {paintSurveyList}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const hId = params.hId;
  const SURVEY_Service_URL = `http://i6a205.p.ssafy.io:8000/api/survey/list/${hId}/1`;
  const surveyList = await axios.get(SURVEY_Service_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      hId,
      surveyList,
    },
  };
}

export default SurveyServiceUser;
