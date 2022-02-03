import React from "react";
import Header from "../../../components/Header";
import ServiceNoticeForm from "../../../components/Service/ServiceNoticeForm";

function ServiceNoticeCreate() {
  return (
    <div>
      <Header title="서비스 공지사항 작성"></Header>
      <div className="container">
        <ServiceNoticeForm></ServiceNoticeForm>
      </div>
    </div>
  );
}

export default ServiceNoticeCreate;
