import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavItemUser from "./NavItemUser";
import { useSelector } from "react-redux";
import styles from "../../styles/navbaruser.module.css";

function NavbarUser({ currentPage, code }) {
  const { hospitalInfo } = useSelector((state) => state.hospitalInfo);
  const { name, phone, image } = hospitalInfo;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {name && (
          <Link href={`/user/${code}`} passHref>
            <a className="d-flex align-items-center gap-1 me-3">
              <div className={styles.logoImageContainer}>
                <Image
                  src={image}
                  layout="fill"
                  objectFit="contain"
                  priority
                ></Image>
              </div>
              <div className="fs-3">{name}</div>
            </a>
          </Link>
        )}
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <NavItemUser
              active={currentPage === `/user/[code]/survey/health`}
              url={`/user/${code}/survey/health`}
              title="건강설문"
            />
            <NavItemUser
              active={currentPage === `/user/[code]/survey/service`}
              url={`/user/${code}/survey/service`}
              title="병원설문"
            />
            <NavItemUser
              active={currentPage === `/user/[code]/notice`}
              url={`/user/${code}/notice`}
              title="공지사항"
            />
            <NavItemUser
              active={currentPage === `/user/[code]/event`}
              url={`/user/${code}/event`}
              title="이벤트"
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
