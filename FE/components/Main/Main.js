import React, { useState } from "react";
import Image from "next/image";
import header_image from "../../public/header_image.png";
import { useRouter } from "next/router";
import axios from "axios";

function Main() {
  const [inputCode, setInputCode] = useState("");
  const router = useRouter();

  const handleCodeChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleGoButton = async () => {
    const codeToId_URL = `http://i6a205.p.ssafy.io:8000/api/code/${inputCode}`;
    await axios.get(codeToId_URL).then((res) => {
      const { id } = res.data;
      router.push(`/user/${id}`);
    });
  };

  return (
    <div>
      <div className="background bg-primary d-flex justify-content-center align-items-center">
        <div className="main_body d-flex flex-column justify-content-between align-items-center">
          <div className="main_title text-center text-white fw-bold ">
            <div>Vote24</div>
            <div>설문조사 플랫폼</div>
          </div>
          <div className="absolute header_image">
            <Image src={header_image} alt="header" />
          </div>
          <div className="code_input d-flex align-items-center justify-content-between indigo p-2">
            <div className="form-floating">
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
            <button
              type="button"
              className="btn text-white text-center"
              onClick={handleGoButton}
            >
              <span className="material-icons fs-1">play_arrow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
