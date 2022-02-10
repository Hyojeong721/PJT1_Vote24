import React, { useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import TermsOfUse from "../../../components/Service/TermsOfUse";
import PrivacyPolicy from "../../../components/Service/PrivacyPolicy";

function ServiceInfo() {
  const [isTerms, setIsTerms] = useState(1);

  const handleOnClick = (status) => {
    setIsTerms(status);
  };

  return (
    <>
      <Header title="서비스 이용 안내"></Header>
      <div className="container mt-5">
        <div className="d-flex gap-5">
          <Link href="/service/info/#" passHref>
            <a onClick={() => handleOnClick(1)}>
              <h1>이용약관</h1>
            </a>
          </Link>
          <Link href="/service/info/#" passHref>
            <a onClick={() => handleOnClick(0)}>
              <h1>개인정보처리방침</h1>
            </a>
          </Link>
        </div>
        <div className="mt-3">
          {isTerms ? <TermsOfUse /> : <PrivacyPolicy />}
        </div>
      </div>
    </>
  );
}

export default ServiceInfo;
