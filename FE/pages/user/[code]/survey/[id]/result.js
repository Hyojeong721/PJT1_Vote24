import axios from "axios";
import Link from "next/link";
import cn from "classnames";
import styles from "../../../../../styles/userresult.module.css";

function SurveyDetailUser({
  code,
  sId,
  score,
  outputText,
  outputLink,
  reservationLink,
}) {
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center">
      <div className="fs-1 mt-3">설문 결과</div>
      <div className="w-75 bg-white form-control mt-3 mb-3 text-center gap-3">
        <div className="fs-2 mt-5 mb-5">
          <div className="border-2 border-bottom border-warning">
            <p>설문에 참여해주셔서 감사합니다.</p>
          </div>
        </div>
        <div className="fs-3 my-3">
          <p>{score === "0" || `결사결과: ${score}점 - ${outputText}`}</p>
        </div>
        {outputLink && (
          <div className="d-flex flex-column justify-content-center align-items-center fs-3 my-3 gap-3">
            <Link href={outputLink} passHref>
              <a className={cn(styles.btnUser, "btn", "fs-2")}>
                <span className="material-icons me-2">ads_click</span>
                건강 정보 더보기
              </a>
            </Link>
            <Link href={reservationLink} passHref>
              <a className={cn(styles.btnUser, "btn", "fs-2")}>
                <span className="material-icons me-2">ads_click</span>
                진료 예약 바로가기
              </a>
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

  const GET_HOSPITAL_ID_BY_CODE = `${process.env.NEXT_PUBLIC_SERVER}/api/code/${code}`;
  const hId = await axios
    .post(GET_HOSPITAL_ID_BY_CODE)
    .then((res) => res.data.id)
    .catch((err) => console.log(err));

  if (!hId) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const GET_BENCHMARK_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/benchmark/list/${id}`;
  const { status, title, output_link, reservation_link, benchmark } =
    await axios
      .get(GET_BENCHMARK_URL)
      .then((res) => res.data)
      .catch((err) => console.log(err));

  if (status !== 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  let outputText = "";
  benchmark.sort((a, b) => a.benchmark - b.benchmark);
  for (let i = 0; i < benchmark.length; i++) {
    if (score > benchmark[i].benchmark) {
      outputText = benchmark[i].output_text;
    }
  }

  return {
    props: {
      code,
      sId: id,
      score,
      title,
      outputText,
      outputLink: output_link,
      reservationLink: reservation_link,
    },
  };
}

export default SurveyDetailUser;
