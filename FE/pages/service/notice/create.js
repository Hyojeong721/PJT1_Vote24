import React from "react";
import Header from "../../../components/Header";
import ServiceNoticeForm from "../../../components/Notice/ServiceNoticeForm";

const SERVICE_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/service`;

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
