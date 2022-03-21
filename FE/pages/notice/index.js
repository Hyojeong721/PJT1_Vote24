import { useEffect } from "react";
import router from "next/router";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import NoticeList from "../../components/Notice/NoticeList";

function HospitalNotice() {
  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}`;
  const CREATE_URL = "/notice/create";

  return (
    <div>
      <Header title="병원 공지사항">
        <div></div>
      </Header>
      <div className="container div-table shadow">
        <NoticeList url={NOTICE_URL} createUrl={CREATE_URL} />
      </div>
    </div>
  );
}

export default HospitalNotice;
