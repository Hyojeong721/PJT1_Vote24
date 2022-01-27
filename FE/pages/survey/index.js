import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Link from "next/link";

function Survey() {
  return (
    <div>
      <Header title="병원 설문조사 목록"></Header>
      <div className="container">
        <Link href="/survey/health">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">건강설문</h3>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/survey/service">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">만족도 조사</h3>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Survey;
