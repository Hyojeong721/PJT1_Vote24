import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/Header";

function SurveyDetailUser({ code, sId, surveyDetail }) {
  const {
    count,
    category,
    title,
    context,
    start_at,
    end_at,
    benchmark,
    output_link,
    question,
  } = surveyDetail;
  console.log(surveyDetail);
  const categoryName = category === 0 ? "health" : "service";
  const router = useRouter();

  const paintBenchmark = benchmark.map((b) => {
    return (
      <div key={b.id} className="d-flex gap-1">
        {b.benchmark} 이상 : {b.output_text}
      </div>
    );
  });

  const paintOptions = (qId, option) => {
    return option.map(({ id, order, context, weight, count }) => {
      return (
        <div
          key={order}
          className="d-flex justify-content-between align-items-center gap-3 border-bottom border-secondary"
        >
          <div>{context}</div>
          <div className="d-flex gap-3">
            <div>점수: {weight}</div>
            <div>선택 수: {count}</div>
          </div>
        </div>
      );
    });
  };

  const paintEssayResult = (qId) => {
    return <div>답변 상위 10개</div>;
  };

  const paintQuestions = question.map((q) => {
    const { order, context, option } = q;
    return (
      <div key={order} className="border rounded-3 my-3">
        <div className="fs-2 p-1">{context}</div>
        <div className="survey-option-box p-3">
          {option ? paintOptions(q.id, option) : paintEssayResult(q.id)}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header title="설문 결과" />
      <div className="container bg-light d-flex flex-column align-items-center border my-3">
        <div className="bg-white form-control mt-3 text-center">
          <div>참여자수: {count}</div>
          <div className="">{category === 0 ? "건강" : "병원"} 설문조사</div>
          <div className="fs-1">{title}</div>
          <div>
            <div className="my-2">
              시작일 {start_at} ~ 종료일 {end_at}
            </div>
            <div>{context}</div>
          </div>
        </div>
        <div className="bg-white form-control mt-3">
          <div className="fw-bold">설문 결과 기준 점수</div>
          <div>{paintBenchmark}</div>
          <div>출력 링크 : {output_link}</div>
        </div>
        <div className="bg-white form-control my-3">{paintQuestions}</div>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <Link href={`/survey/${sId}/update`} passHref>
          <a className="btn survey-user-submit-button text-white mb-3">
            설문 수정
          </a>
        </Link>
        <Link href={`/survey/${category}`} passHref>
          <a className="btn survey-user-submit-button text-white mb-3">
            설문 목록
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const sId = params.id;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const surveyDetail = await axios.get(SURVEY_DETAIL_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      sId,
      surveyDetail,
    },
  };
}

export default SurveyDetailUser;
