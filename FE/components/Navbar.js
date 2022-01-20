import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png";

function Navbar() {
  const [isLogIn, setIsLogIn] = useState(false);
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
            <li class="nav-item">
              <Link href="/">
                <a class="nav-link active fs-5" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            {isLogIn ? (
              <>
                <li class="nav-item">
                  <Link href="/service/notice">
                    <a class="nav-link fs-5">공지사항</a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link href="/service/event">
                    <a class="nav-link fs-5">이벤트</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <Link href="/service/notice">
                    <a class="nav-link">서비스 공지사항</a>
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    설문
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#">
                        설문 목록
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        설문 생성
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    병원 공지
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#">
                        공지 목록
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        공지 생성
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    병원 이벤트
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#">
                        이벤트 목록
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        이벤트 생성
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>

          {/* top-right button */}
          {isLogIn ? (
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
