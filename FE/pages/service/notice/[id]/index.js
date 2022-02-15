import React from "react";
import Header from "../../../../components/Header";
import ServiceNoticeDetailItem from "../../../../components/Notice/ServiceNoticeDetailItem";

const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/service`;

function ServiceNoticeDetail() {
  return (
    <div>
      <Header title="Vote24 공지사항"></Header>
      <div className="container">
        <ServiceNoticeDetailItem
          url={NOTICE_DETAIL_URL}
        ></ServiceNoticeDetailItem>
      </div>
    </div>
  );
}

export default ServiceNoticeDetail;
