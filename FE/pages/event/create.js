import React from "react";
import Header from "../../components/Header";
import EventForm from "../../components/Event/EventForm";

function EventCreate() {
  return (
    <div>
      <Header title="병원 이벤트 작성"></Header>
      <div className="container">
        <EventForm></EventForm>
      </div>
    </div>
  );
}

export default EventCreate;
