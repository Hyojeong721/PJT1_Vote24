import React from "react";
import Header from "../../components/Header";
import EventList from "../../components/EventList";

function HospitalEvent() {
  return (
    <div>
      <Header title="병원 이벤트"></Header>
      <div className="container">
        <EventList></EventList>
      </div>
    </div>
  );
}

export default HospitalEvent;
