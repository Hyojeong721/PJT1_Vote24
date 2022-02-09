import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import BackButton from "../../../../../components/BackButton";

function SurveyDetailUser({ code, sId, surveyDetail }) {
  const SURVEY_SUBMIT_URL = `http://i6a205.p.ssafy.io:8000/api/survey/result/${sId}`;
  const { title, context, start_at, end_at, question, category, output_link } =
    surveyDetail;
  const categoryName = category === 0 ? "health" : "service";
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const paintOptions = (qId, option) => {
    return option.map(({ id, order, context, weight }) => {
      return (
        <div key={order} className="d-flex align-items-center gap-2">
          <input
            className="form-check-input"
            type="radio"
            name={`QC${qId}`}
            id={id}
            value={`${id}- ${weight}`}
            {...register(`QC${qId}`, { required: true })}
          />
          <label className="form-check-label" htmlFor={id}>
            {context}
          </label>
        </div>
      );
    });
  };

  const paintEssayInput = (qId) => {
    return (
      <textarea
        className="form-control"
        name={`QE${qId}`}
        id={qId}
        placeholder="답변을 입력하세요."
        {...register(`QE${qId}`)}
      ></textarea>
    );
  };

  const paintQuestions = question.map((q) => {
    const { order, context, option } = q;
    return (
      <div key={order} className="border rounded-3 my-3">
        <div className="fs-2 p-1">{context}</div>
        <div className="survey-option-box p-3">
          {option ? paintOptions(q.id, option) : paintEssayInput(q.id)}
        </div>
        {errors[`QC${q.id}`] && errors[`QC${q.id}`].type === "required" && (
          <div className="error d-flex align-items-center mt-1 bg-warning text-white p-1 rounded">
            <span className="material-icons fs-5">priority_high</span>
            <span>선택이 필요합니다.</span>
          </div>
        )}
      </div>
    );
  });

  const onSubmit = async (data) => {
    const questions = [];
    let score = 0;
    for (let key of Object.keys(data)) {
      if (key.slice(0, 2) === "QC") {
        const [optionId, weight] = data[key].split("-");
        questions.push({ id: key.slice(2), type: "0", select: optionId });
        score += parseInt(weight);
      } else {
        questions.push({ id: key.slice(2), type: "1", answer: data[key] });
      }
    }

    const result = { questions, score };

    await axios
      .post(SURVEY_SUBMIT_URL, result)
      .then((res) => {
        console.log("res", res.data);
        router.push({
          pathname: `/user/${code}/survey/${sId}/result`,
          query: { score },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-user-bg position-relative min-vh-100 d-flex flex-column align-items-center">
      <div className="w-75 bg-white form-control mt-3 text-center">
        <BackButton url={`/user/${code}/survey/${categoryName}`} />
        <div className="fs-1">{title}</div>
        <div className="my-2">
          <span>{context}</span>
        </div>
      </div>
      <div className="w-75 bg-white form-control my-3">{paintQuestions}</div>
      <button
        type="button"
        className="btn survey-user-submit-button text-white mb-3"
        onClick={handleSubmit(onSubmit)}
      >
        설문 결과 보기
      </button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const code = params.code;
  const sId = params.id;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      code,
      sId,
      surveyDetail,
    },
  };
}

export default SurveyDetailUser;
