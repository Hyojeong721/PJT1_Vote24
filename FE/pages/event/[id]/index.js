import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import EventDetailItem from "../../../components/Event/EventDetailItem";

function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_DETAIL_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/event/${hospital_id}/${id}`;

  return (
    <div>
      <Header title="병원 이벤트"></Header>
      <div className="container">
        <EventDetailItem id={id} url={EVENT_DETAIL_URL}></EventDetailItem>
      </div>
    </div>
  );
}

export default EventDetail;
