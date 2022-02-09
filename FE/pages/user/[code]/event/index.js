import axios from "axios";
import UserPostListItem from "../../../../components/User/UserPostListItem";
import BackButton from "../../../../components/BackButton";
import UserHeader from "../../../../components/User/UserHeader";

function EventUser({ code, eventList }) {
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
      {paintEventList}
    </div>
  );
}

export default EventUser;

export async function getServerSideProps({ params }) {
  const code = params.code;

  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
  const hId = await axios.post(GET_HOSPITAL_ID_BY_CODE).then((res) => res.data);

  const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/${hId}`;
  const eventList = await axios.get(EVENT_URL).then((res) => {
    return res.data;
  });

  return {
    props: {
      code,
      eventList,
    },
  };
}
