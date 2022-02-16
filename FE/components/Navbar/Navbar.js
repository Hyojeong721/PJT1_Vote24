import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import NavDropdown from "./NavDropdown";
import Logo from "../../public/logo.png";

function Navbar({ isLoggedIn, currentPage }) {
  const dispatch = useDispatch();

  const surveyDropdown = [
    {
      title: "설문 목록",
      url: "/survey",
    },
    {
      title: "설문 생성",
      url: "/survey/create",
    },
  ];
  const hNoticeDropdown = [
    {
      title: "공지 목록",
      url: "/notice",
    },
    {
      title: "공지 생성",
      url: "/notice/create",
    },
  ];
  const hEventDropdown = [
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
    localStorage.removeItem("jwt");
    toast.success("로그아웃 성공!");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container navbar-container">
        {/* Logo */}
        <Link href="/">
          <a className="navbar-brand navbar-logo">
            <Image className="navbar-logo" src={Logo} alt="vote24" />
          </a>
        </Link>

        {/* hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* nav links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavItem active={currentPage === "/"} url="/" title="Home" />
            {!isLoggedIn ? (
              <>
                <NavItem
                  active={currentPage === "/service/info"}
                  url="/service/info"
                  title="이용 안내"
                />
                <NavItem
                  active={currentPage === "/service/notice"}
                  url="/service/notice"
                  title="공지사항"
                />
              </>
            ) : (
              <>
                <NavItem
                  active={currentPage === "/service/notice"}
                  url="/service/notice"
                  title="서비스 공지사항"
                />
                <NavDropdown
                  active={currentPage.split("/")[1] === "survey"}
                  title="설문"
                  subtitles={surveyDropdown}
                />
                <NavDropdown
                  active={currentPage.split("/")[1] === "notice"}
                  title="병원 공지"
                  subtitles={hNoticeDropdown}
                />
                <NavDropdown
                  active={currentPage.split("/")[1] === "event"}
                  title="병원 이벤트"
                  subtitles={hEventDropdown}
                />
              </>
            )}
          </ul>

          {/* top-right button */}
          {!isLoggedIn ? (
            <div className="d-flex">
              <Link href="/login">
                <a className="nav-link">
                  <button type="button" className="btn btn-primary">
                    로그인
                  </button>
                </a>
              </Link>
              <Link href="/signup">
                <a className="nav-link">
                  <button type="button" className="btn btn-primary">
                    서비스 신청
                  </button>
                </a>
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              <a className="nav-link" onClick={handleLogout}>
                <button type="button" className="btn btn-primary">
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
