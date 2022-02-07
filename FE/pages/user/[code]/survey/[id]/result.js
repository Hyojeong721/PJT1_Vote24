import axios from "axios";
import Link from "next/link";
import BackButton from "../../../../../components/BackButton";

function SurveyDetailUser({ code, sId, score, outputText, outputLink }) {
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center">
      <div className="text-white fs-1 mt-3">설문 결과</div>
      <div className="w-75 bg-white form-control mt-3 text-center gap-3">
        <div className="fs-1 mt-3">
          <p>{outputText || "설문에 참여해주셔서 감사합니다."}</p>
        </div>
        <div className="fs-3">
          <p>{score === "0" || ""}</p>
          <p>{outputText}</p>
        </div>
        {score === "0" || (
          <div className="fs-3">
            <p>건강 정보 더보기 / 병원 예약</p>
            <Link href={outputLink}>
              <a>{outputLink}</a>
            </Link>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center gap-3">
        <Link href={`/user/${code}/survey/${sId}`}>
          <a className="btn survey-user-submit-button text-white my-3">
            다시하기
          </a>
        </Link>
        <Link href={`/user/${code}`}>
          <a className="btn survey-user-submit-button text-white my-3">
            홈으로 이동
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { code, id, score } = query;
  const GET_BENCHMARK_URL = `http://i6a205.p.ssafy.io:8000/api/benchmark/${id}`;
  const benchmarks = await axios.get(GET_BENCHMARK_URL).then((res) => {
    return res.data;
  });

  let outputText = "";
  for (let i = 0; i < benchmarks.length; i++) {
    if (score > benchmarks[i].benchmarks) {
      outputText = benchmarks[i].output_text;
    }
  }

  return {
    props: {
      code,
      sId: id,
      score,
      outputText,
      outputLink: "naver.com",
    },
  };
}

export default SurveyDetailUser;
