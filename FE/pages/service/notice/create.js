import React from "react";
import Header from "../../../components/Header";
import ServiceNoticeForm from "../../../components/Notice/ServiceNoticeForm";

const SERVICE_URL = `http://i6a205.p.ssafy.io:8000/api/service`;

function ServiceNoticeCreate() {
  return (
    <div>
      <Header title="Vote24 공지사항 작성"></Header>
      <div className="container">
        <ServiceNoticeForm url={SERVICE_URL}></ServiceNoticeForm>
      </div>
    </div>
  );
}

export default ServiceNoticeCreate;
