import React from "react";
import Logo from "../images/logo.png";
import "./navbar.css";

function NavbarOnLogin() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img class="logo" src={Logo} alt="vote24" />
        </a>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                서비스 공지사항
              </a>
            </li>
            {/* dropdown x 3 */}
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
          </ul>
          <div class="d-flex">
            <a class="nav-link" href="#">
              <button type="button" class="btn btn-primary">
                로그아웃
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarOnLogin;
