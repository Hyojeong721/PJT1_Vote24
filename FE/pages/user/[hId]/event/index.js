import axios from "axios";
import UserPostListItem from "../../../../components/User/UserPostListItem";

function EventUser({ hId, eventList }) {
  const paintEventList = eventList.map((n, idx) => {
    return (
      <UserPostListItem
        key={idx}
        url={`/user/${hId}/survey/${n.id}`}
        idx={idx + 1}
        title={n.title}
        start_at={n.start_at}
        end_at={n.end_at}
      />
    );
  });

  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="mt-5">
        <div className="text-white fs-1">이벤트</div>
      </header>
      {paintEventList}
    </div>
  );
}

export default EventUser;

export async function getServerSideProps({ params }) {
  const hId = params.hId;
  const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/${hId}`;
  const eventList = await axios.get(EVENT_URL).then((res) => {
    console.log(res.data);
    return res.data;
  });

  return {
    props: {
      hId,
      eventList,
    },
  };
}
