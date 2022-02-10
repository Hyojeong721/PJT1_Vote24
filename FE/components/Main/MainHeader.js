import React, { useState } from "react";
import Image from "next/image";
import header_image from "../../public/header_image.png";
import Link from "next/link";
import styles from "../../styles/mainheader.module.css";

function MainHeader() {
  const [inputCode, setInputCode] = useState("");

  const handleCodeChange = (e) => {
    setInputCode(e.target.value);
  };

  return (
    <header id="header" className={styles.header}>
      <div className={styles.headerContent}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-5">
              <div className={styles.textContainer}>
                <div className="mb-3">
                  <h1>
                    Vote24 <br></br>설문조사 플랫폼
                  </h1>
                </div>
                <div>
                  <p className={styles.pLarge}>
                    병원에 긴 시간 대기하는 환자 보호자를 위한 <br></br> 셀프
                    건강 설문 서비스
                  </p>
                </div>
                <div className="code_input d-flex align-items-center justify-content-center indigo p-2">
                  <div className="form-floating ms-3">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      onChange={handleCodeChange}
                      className="form-control"
                      placeholder=" "
                    ></input>
                    <label htmlFor="code" className="form-label">
                      <p className="text-secondary">병원 코드 입력</p>
                    </label>
                  </div>
                  <Link href={`/user/${inputCode}`} passhref>
                    <button type="button" className="btn text-white d-flex">
                      <span className="material-icons fs-1">play_arrow</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7">
              <div className={styles.imageContainer}>
                <div className={styles.imgWrapper}>
                  <Image
                    className={styles.image}
                    src={header_image}
                    alt="header"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
