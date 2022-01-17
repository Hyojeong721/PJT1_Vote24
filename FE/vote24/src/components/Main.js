import React from "react";
import "./css/main.css";
import header_image from "../images/header_image.png";

function Main() {
  return (
    <div>
      <div className="body bg-primary d-flex justify-content-center align-items-center">
        <div className="container bg-yellow">
          <img className="absolute header_image" src={header_image}></img>
        </div>
      </div>
    </div>
  );
}

export default Main;
