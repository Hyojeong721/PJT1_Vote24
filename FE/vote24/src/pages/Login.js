import React from "react";
import TextInput from "../components/TextInput";
import "../css/signup.css";

function Login() {
  return (
    <div className="container">
      <form className="d-flex flex-column justify-content-center">
        <TextInput
          id="1"
          type="email"
          label="아이디"
          placeholder="아이디는 이메일으로 입력해주세요."
        />
        <TextInput id="2" type="password" label="비밀번호" />

        {/* <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" class="submit-button btn btn-primary">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
