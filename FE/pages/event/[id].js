import React from "react";
import Header from "../../components/Header";
import EventDetailItem from "../../components/Event/EventDetailItem";

function EventDetail() {
  return (
    <div>
      <Header title="병원 이벤트"></Header>
      <div className="container">
        <EventDetailItem></EventDetailItem>
      </div>
    </div>
  );
}

export default EventDetail;
