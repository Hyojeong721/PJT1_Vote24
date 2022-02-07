import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import NoticeDetailItem from "../../components/Notice/NoticeDetailItem";

function NoticeDetail() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}`;

  return (
    <div>
      <Header title="병원 공지사항"></Header>
      <div className="container">
        <NoticeDetailItem url={NOTICE_DETAIL_URL}></NoticeDetailItem>
      </div>
    </div>
  );
}

export default NoticeDetail;
