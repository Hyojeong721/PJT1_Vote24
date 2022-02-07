import React from "react";
import Header from "../../../components/Header";
import NoticeDetailItem from "../../../components/Notice/NoticeDetailItem";

const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/service/`;

function NoticeDetail() {
  return (
    <div>
      <Header title="Vote24 공지사항"></Header>
      <div className="container">
        <NoticeDetailItem url={NOTICE_DETAIL_URL}></NoticeDetailItem>
      </div>
    </div>
  );
}

export default NoticeDetail;
