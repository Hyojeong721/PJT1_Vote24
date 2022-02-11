import axios from "axios";
import UserPostListItem from "../../../../components/User/UserPostListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";
import SearchBar from "../../../../components/SearchBar";
import { useState } from "react";

function EventUser({ code, eventListProp }) {
  const [eventList, setEventList] = useState(eventListProp);

  const paintEventList = eventList.map((e, idx) => {
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
      {eventList.length ? (
        paintEventList
      ) : (
        <div className="fs-1 border rounded bg-white w-75 d-flex justify-content-center p-3 mt-3 ">
          <span className="material-icons fs-1 d-flex align-items-center">
            priority_high
          </span>
          작성된 이벤트가 없습니다.
        </div>
      )}
    </div>
  );
}

export default EventUser;

export async function getServerSideProps({ params }) {
  const code = params.code;

  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
  const { id } = await axios
    .post(GET_HOSPITAL_ID_BY_CODE)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // id 는 hospital_id
  // if (!id) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/404",
  //     },
  //   };
  // }

  const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/${1}`;
  const eventList = await axios.get(EVENT_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      code,
      eventListProp: eventList,
    },
  };
}
