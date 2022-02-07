import React, { useEffect } from "react";
import Header from "../../../components/Header";
import NoticeForm from "../../../components/Notice/NoticeForm";

const SERVICE_URL = `http://i6a205.p.ssafy.io:8000/api/service`;

function NoticeCreate() {
  return (
    <div>
      <Header title="Vote24 공지사항 작성"></Header>
      <div className="container">
        <NoticeForm url={SERVICE_URL}></NoticeForm>
      </div>
    </div>
  );
}

export default NoticeCreate;
