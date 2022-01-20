import React from "react";
import Header from "../../components/Header";
import PostList from "../../components/PostList";

function NoticeHospital() {
  return (
    <div>
      <Header title="병원 공지사항"></Header>
      <div className="container">
        <PostList></PostList>
      </div>
    </div>
  );
}

export default NoticeHospital;
