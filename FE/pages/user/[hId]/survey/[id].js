import axios from "axios";

function SurveyDetailUser({ hId, sId, surveyDetail }) {
  const { title, context, start_at, end_at, question } = surveyDetail;
  console.log(question);

  const paintOptions = (qId, option) => {
    return option.map(({ id, order, context }) => {
      return (
        <div key={order} className="d-flex align-items-center gap-2">
          <input
            className="form-check-input"
            type="radio"
            name={qId}
            id={id}
            value={id}
          />
          <label className="form-check-label" htmlFor={id}>
            {context}
          </label>
        </div>
      );
    });
  };

  const paintQuestions = question.map((q) => {
    const { order, context, option } = q;
    console.log("option:", option);
    return (
      <div key={order} className="border rounded-3 my-3">
        <div className="fs-2 p-1">{context}</div>
        <div className="survey-option-box p-3">
          {paintOptions(q.id, option)}
        </div>
      </div>
    );
  });

  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center">
      <div className="w-75 bg-white form-control mt-3 text-center">
        <div className="fs-1">{title}</div>
        <div className="my-2">
          <span>{context}</span>
        </div>
      </div>
      <div className="w-75 bg-white form-control my-3">{paintQuestions}</div>
      <button
        type="button"
        className="btn survey-user-submit-button text-white mb-3"
      >
        설문 결과 보기
      </button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const hId = params.hId;
  const sId = params.id;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      hId,
      sId,
      surveyDetail,
    },
  };
}

export default SurveyDetailUser;
