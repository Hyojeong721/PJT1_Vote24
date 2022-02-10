import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import NoticeForm from "../../components/Notice/NoticeForm";

function NoticeCreate() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}`;

  return (
    <div>
      <Header title="병원 공지사항 작성"></Header>
      <div className="container">
        <NoticeForm url={NOTICE_URL}></NoticeForm>
      </div>
    </div>
  );
}

export default NoticeCreate;
