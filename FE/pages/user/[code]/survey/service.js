import axios from "axios";
import UserSurveyListItem from "../../../../components/User/UserSurveyListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";

function SurveyServiceUser({ code, surveyList }) {
  console.log("surveyList:", surveyList);

  const paintSurveyList = surveyList.map((s, idx) => {
    return (
      <UserSurveyListItem
        key={idx}
        url={`/user/${code}/survey/${s.id}`}
        idx={idx + 1}
        title={s.title}
        count={s.count}
      />
    );
  });
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative w-100 d-flex justify-content-center mt-3">
        <BackButton url={`/user/${code}`} />
        <UserHeader title="병원 설문 조사" />
      </header>
      {surveyList.length ? (
        paintSurveyList
      ) : (
        <div>설문이 존재하지 않습니다.</div>
      )}
      {paintSurveyList}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const code = params.code;

  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
  const hId = await axios.post(GET_HOSPITAL_ID_BY_CODE).then((res) => res.data);

  const SURVEY_Service_URL = `http://i6a205.p.ssafy.io:8000/api/survey/list/${hId}/1`;
  const surveyList = await axios.get(SURVEY_Service_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      code,
      surveyList,
    },
  };
}

export default SurveyServiceUser;
