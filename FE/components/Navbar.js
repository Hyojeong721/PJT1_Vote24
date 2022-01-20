import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import Logo from "../public/logo.png";
import NavDropdown from "./NavDropdown";

function Navbar() {
  const [isLogIn, setIsLogIn] = useState(false);
  const surveyNav = [
    {
      title: "설문 목록",
      url: "/survey",
    },
    {
      title: "설문 생성",
      url: "/survey/create",
    },
  ];
  const hNoticeNav = [
    {
      title: "공지 목록",
      url: "/notice",
    },
    {
      title: "공지 생성",
      url: "/notice/create",
    },
  ];
  const hEventNav = [
    {
      title: "이벤트 목록",
      url: "/event",
    },
    {
      title: "이벤트 생성",
      url: "/event/create",
    },
  ];

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    console.log("logout");
    setIsLogIn(false);
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        {/* Logo */}
        <Link href="/">
          <a class="navbar-brand navbar-logo">
            <Image class="navbar-logo" src={Logo} alt="vote24" />
          </a>
        </Link>

        {/* hamburger button */}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* nav links */}
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem url="/" title="Home" />
            {!isLogIn ? (
              <>
                <NavItem url="/service/info" title="서비스 소개" />
                <NavItem url="/service/notice" title="공지사항" />
              </>
            ) : (
              <>
                <NavItem url="/service/notice" title="서비스 공지사항" />
                <NavDropdown title="설문" subtitles={surveyNav} />
                <NavDropdown title="병원 공지" subtitles={hNoticeNav} />
                <NavDropdown title="병원 이벤트" subtitles={hEventNav} />
              </>
            )}
          </ul>

          {/* top-right button */}
          {!isLogIn ? (
            <div class="d-flex">
              <Link href="/login">
                <a class="nav-link">
                  <button type="button" class="btn btn-primary">
                    로그인
                  </button>
                </a>
              </Link>
              <Link href="/signup">
                <a class="nav-link">
                  <button type="button" class="btn btn-primary">
                    서비스 신청
                  </button>
                </a>
              </Link>
            </div>
          ) : (
            <div class="d-flex">
              <a class="nav-link" onClick={handleLogout}>
                <button type="button" class="btn btn-primary">
                  로그아웃
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
