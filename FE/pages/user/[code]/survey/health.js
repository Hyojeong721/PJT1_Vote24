import { useState } from "react";
import axios from "axios";
import UserSurveyListItem from "../../../../components/User/UserSurveyListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";
import SearchBar from "../../../../components/SearchBar";
import Paging from "../../../../components/Paging";

function SurveyHealthUser({ code, surveyListProp }) {
  const [surveyList, setSurveyList] = useState(
    surveyListProp.sort((a, b) => a.status - b.status)
  );
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = surveyList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paintSurveyList = currentPosts.map((s, idx) => {
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
      <header className="position-relative w-100 d-flex justify-content-center my-3">
        <div className="mt-2">
          <BackButton url={`/user/${code}`} />
        </div>
        <UserHeader title="건강 자가진단 설문" />
      </header>
      <div className="w-75 d-flex justify-content-end">
        <SearchBar setPostList={setSurveyList} postListProp={surveyListProp} />
      </div>
      {currentPosts.length ? (
        paintSurveyList
      ) : (
        <div className="fs-1 border rounded bg-white w-75 d-flex justify-content-center p-3 mt-3 ">
          <span className="material-icons fs-1 d-flex align-items-center">
            priority_high
          </span>
          작성된 설문조사가 없습니다.
        </div>
      )}
      <Paging
        postsPerPage={postsPerPage}
        totalPosts={surveyList.length}
        paginate={paginate}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const code = params.code;

  const GET_HOSPITAL_ID_BY_CODE = `${process.env.NEXT_PUBLIC_SERVER}/api/code/${code}`;
  const { id } = await axios
    .post(GET_HOSPITAL_ID_BY_CODE)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // id 는 hospital_id
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const SURVEY_HEALTH_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/survey/list/${id}/0`;
  const surveyList = await axios
    .get(SURVEY_HEALTH_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      code,
      surveyListProp: surveyList,
    },
  };
}

export default SurveyHealthUser;
