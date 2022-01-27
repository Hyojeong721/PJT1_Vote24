import React from "react";
import Header from "../../components/Header";
import NoticeForm from "../../components/Notice/NoticeForm";

function NoticeCreate() {
  return (
    <div>
      <Header title="병원 공지사항 작성"></Header>
      <div className="container mt-3">
        <NoticeForm></NoticeForm>
      </div>
    </div>
  );
}

export default NoticeCreate;
