import axios from "axios";
import Link from "next/link";
import BackButton from "../../../../../components/BackButton";

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
      <div className="w-75 bg-white form-control mt-3 text-center gap-3">
        <div className="fs-1 my-3 border-bottom">
          <p>설문에 참여해주셔서 감사합니다.</p>
        </div>
        <div className="fs-3 my-3 border-bottom ">
          <p>{score === "0" || `결사결과: ${score}점 (${outputText})`}</p>
        </div>
        {score === "0" || (
          <div className="d-flex flex-column justify-content-center align-items-center fs-3 my-3 gap-3">
            <Link href={`https://${outputLink}`} passHref>
              <a>
                건강 정보 더보기{" "}
                <span className="material-icons">north_east</span>
              </a>
            </Link>
            <Link href={`https://${reservationLink}`} passHref>
              <a>
                진료예약 바로가기{" "}
                <span className="material-icons">north_east</span>
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
