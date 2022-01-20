import React from "react";
import Header from "../../../components/Header";
import PostList from "../../../components/PostList";

function NoticeHospital() {
  return (
    <>
      <Header title="서비스 공지사항"></Header>
      <div className="container">
        <PostList></PostList>
      </div>
    </>
  );
}

export default NoticeHospital;
