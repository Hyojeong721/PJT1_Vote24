import React from "react";
import Image from "next/image";
import header_image from "../public/header_image.png";
import "../styles/Main.module.css";

function Main() {
  return (
    <div>
      <div className="background bg-primary d-flex justify-content-center align-items-center">
        <div className="main_body bg-yellow d-flex flex-column justify-content-between align-items-center">
          <div className="text-white fw-bold">Vote24 설문조사 플랫폼</div>
          <div className="absolute header_image">
            <Image src={header_image} alt="header" />
          </div>
          <button
            type="button"
            class="d-flex align-items-center indigo btn btn-lg"
          >
            <div>
              <input type="text"></input>
            </div>
            <div className="text-white">코드 입력</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
