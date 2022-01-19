import React from "react";
import TermsOfUse from "../components/TermsOfUse";
import PrivacyPolicy from "../components/PrivacyPolicy";

function ServiceInfo() {
  return (
    <div className="container mt-5">
      <div className="d-flex gap-5">
        <a href="#이용약관">
          <h1>이용약관</h1>
        </a>
        <a href="#개인정보처리방침">
          <h1>개인정보처리방침</h1>
        </a>
      </div>
      <div className="mt-3">
        <PrivacyPolicy />
        <TermsOfUse />
      </div>
    </div>
  );
}

export default ServiceInfo;
