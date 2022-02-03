import { useRouter } from "next/router";
import BackButton from "../../../../../components/BackButton";

function SurveyDetailUser({ hId, sId, score }) {
  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center">
      <div className="w-75 bg-white form-control mt-3 text-center">
        <BackButton url={`/user/${hId}`} />
        <div className="fs-1"></div>
        <div className="my-2">
          <span>context</span>
        </div>
      </div>
      <div className="w-75 bg-white form-control my-3"></div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { hId, id, score } = query;
  console.log(query);
  return {
    props: {
      hId,
      sId: id,
      score,
    },
  };
}

export default SurveyDetailUser;
