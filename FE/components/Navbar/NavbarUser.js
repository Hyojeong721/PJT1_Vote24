import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import Logo from "../../public/logo.png";

function Navbar({ currentPage, hId }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href={`/user/${hId}`}>
          <a className="navbar-brand navbar-logo">
            <Image className="navbar-logo" src={Logo} alt="vote24" />
          </a>
        </Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem
              active={currentPage === `/user/survey/${hId}}`}
              url={`/user/survey/${hId}}`}
              title="설문"
            />
            <NavItem
              active={currentPage === `/user/notice/${hId}}`}
              url={`/user/notice/${hId}}`}
              title="공지사항"
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
