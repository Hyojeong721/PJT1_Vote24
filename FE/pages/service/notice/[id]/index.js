import React from "react";
import Header from "../../../../components/Header";
import ServiceNoticeDetailItem from "../../../../components/Notice/ServiceNoticeDetailItem";
import { useSelector } from "react-redux";

const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/service`;

function ServiceNoticeDetail() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const userId = userInfo.id;
  return (
    <div>
      <Header title="Vote24 공지사항"></Header>
      <div className="container">
        <ServiceNoticeDetailItem
          url={NOTICE_DETAIL_URL}
          userId={userId}
        ></ServiceNoticeDetailItem>
      </div>
    </div>
  );
}

export default ServiceNoticeDetail;
