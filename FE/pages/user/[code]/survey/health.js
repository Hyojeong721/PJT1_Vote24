import axios from "axios";
import UserSurveyListItem from "../../../../components/User/UserSurveyListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";

function SurveyHealthUser({ code, surveyList }) {
  const paintSurveyList = surveyList.map((s, idx) => {
    return (
      <UserSurveyListItem
        key={idx}
        url={`/user/${code}/survey/${s.id}`}
        idx={idx + 1}
        survey={s}
      />
    );
  });
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative w-100 d-flex justify-content-center mt-3">
        <BackButton url={`/user/${code}`} />
        <UserHeader title="건강 설문 조사" />
      </header>
      {surveyList.length ? (
        paintSurveyList
      ) : (
        <div className="fs-1 border rounded bg-white w-75 d-flex justify-content-center p-3 mt-3 ">
          <span className="material-icons fs-1 d-flex align-items-center">
            priority_high
          </span>
          작성된 설문조사가 없습니다.
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const code = params.code;

  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
  const hId = await axios.post(GET_HOSPITAL_ID_BY_CODE).then((res) => res.data);

  const SURVEY_HEALTH_URL = `http://i6a205.p.ssafy.io:8000/api/survey/list/${hId}/0`;
  const surveyList = await axios.get(SURVEY_HEALTH_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      code,
      surveyList,
    },
  };
}

export default SurveyHealthUser;
