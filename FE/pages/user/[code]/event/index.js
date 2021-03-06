import axios from "axios";
import UserPostListItem from "../../../../components/User/UserPostListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";
import SearchBar from "../../../../components/SearchBar";
import { useState } from "react";
import Paging from "../../../../components/Paging";

function EventUser({ code, eventListProp }) {
  const [eventList, setEventList] = useState(
    eventListProp.sort((a, b) => a.status - b.status)
  );
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = eventList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paintEventList = currentPosts.map((e, idx) => {
    return (
      <UserPostListItem
        key={idx}
        url={`/user/${code}/event/${e.id}`}
        idx={idx + 1}
        post={e}
      />
    );
  });

  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative w-100 d-flex justify-content-center mt-3">
        <BackButton url={`/user/${code}`} />
        <UserHeader title="이벤트" />
      </header>
      <div className="w-75 d-flex justify-content-end">
        <SearchBar setPostList={setEventList} postListProp={eventListProp} />
      </div>
      {currentPosts.length ? (
        paintEventList
      ) : (
        <div className="fs-1 border rounded bg-white w-75 d-flex justify-content-center p-3 mt-3 ">
          <span className="material-icons fs-1 d-flex align-items-center">
            priority_high
          </span>
          작성된 이벤트가 없습니다.
        </div>
      )}
      <Paging
        postsPerPage={postsPerPage}
        totalPosts={eventList.length}
        paginate={paginate}
      />
    </div>
  );
}

export default EventUser;

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

  const EVENT_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/event/${id}`;
  const eventList = await axios
    .get(EVENT_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      code,
      eventListProp: eventList,
    },
  };
}
