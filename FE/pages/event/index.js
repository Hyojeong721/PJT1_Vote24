import React from "react";
import Header from "../../components/Header";
import PostList from "../../components/PostList";

function HospitalEvent() {
  return (
    <div>
      <Header title="병원 이벤트"></Header>
      <div className="container">
        <PostList></PostList>
      </div>
    </div>
  );
}

export default HospitalEvent;
