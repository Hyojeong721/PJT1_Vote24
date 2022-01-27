import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import PrivacyPolicy from "../../../components/Service/PrivacyPolicy";

function ServiceInfo() {
  return (
    <>
      <Header title="서비스 이용 안내" r></Header>
      <div className="container mt-5">
        <div className="d-flex gap-5">
          <Link href="/service/info/">
            <a>
              <h1>이용약관</h1>
            </a>
          </Link>
          <Link href="">
            <a>
              <h1>개인정보처리방침</h1>
            </a>
          </Link>
        </div>
        <div className="mt-3">
          <PrivacyPolicy />
        </div>
      </div>
    </>
  );
}

export default ServiceInfo;
