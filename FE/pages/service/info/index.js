import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import TermsOfUse from "../../../components/TermsOfUse";

function ServiceInfo() {
  return (
    <>
      <Header></Header>
      <div className="container mt-5">
        <div className="d-flex gap-5">
          <Link href="">
            <a>
              <h1>이용약관</h1>
            </a>
          </Link>
          <Link href="/service/info/privacypolicy">
            <a>
              <h1>개인정보처리방침</h1>
            </a>
          </Link>
        </div>
        <div className="mt-3">
          <TermsOfUse />
        </div>
      </div>
    </>
  );
}

export default ServiceInfo;
