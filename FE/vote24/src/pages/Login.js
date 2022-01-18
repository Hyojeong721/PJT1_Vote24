import React from "react";
import LinearInputForm from "../components/LinearInputForm";
import "../css/signup.css";
import "../css/login.css";

function Login() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="form-box">
        <form className="d-flex flex-column justify-content-center">
          <LinearInputForm
            id="1"
            type="email"
            label="아이디"
            placeholder="아이디는 이메일으로 입력해주세요."
          />
          <LinearInputForm id="2" type="password" label="비밀번호" />

          <div className="button-box">
            <div className="d-flex justify-content-between">
              <button type="submit" class="submit-button btn btn-primary">
                로그인
              </button>
              <button type="submit" class="submit-button btn btn-primary">
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
