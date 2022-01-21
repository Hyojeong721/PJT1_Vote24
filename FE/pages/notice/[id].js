import React from "react";
import Header from "../../components/Header";
import PostDetail from "../../components/PostDetail";

function NoticeDetail() {
  return (
    <div>
      <Header title="병원 공지사항"></Header>
      <div className="container">
        <PostDetail></PostDetail>
      </div>
    </div>
  );
}

export default NoticeDetail;
