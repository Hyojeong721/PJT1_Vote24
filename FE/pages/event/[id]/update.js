import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import EventUpdateForm from "../../../components/Event/EventUpdateForm";

function NoticeUpdate() {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.userStatus);
  const eventId = router.query.id;
  const hospitalId = userInfo.id;
  const EVENT_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/event/${hospitalId}/${eventId}`;

  return (
    <div>
      <Header title="병원 이벤트 수정"></Header>
      <div className="container">
        <EventUpdateForm eventId={eventId} url={EVENT_DETAIL_URL} />
      </div>
    </div>
  );
}

export default NoticeUpdate;
