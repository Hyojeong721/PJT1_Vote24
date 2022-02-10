import React, { useState } from "react";
import Image from "next/image";
import header_image from "../../public/header_image.png";
import Link from "next/link";

function Main() {
  const [inputCode, setInputCode] = useState("");

  const handleCodeChange = (e) => {
    setInputCode(e.target.value);
  };

  return (
    <div>
      <div className="min-vh-100 background bg-primary d-flex justify-content-center align-items-center">
        <div className="main_body d-flex flex-column justify-content-between align-items-center">
          <div className="main_title text-center text-white fw-bold ">
            <div>Vote24</div>
            <div>설문조사 플랫폼</div>
          </div>
          <div className="container header_image">
            <Image src={header_image} alt="header" />
          </div>
          <div className="code_input d-flex align-items-center justify-content-between indigo p-2">
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
    </div>
  );
}

export default Main;
