import React from "react";
import TextInput from "../components/TextInput";
import "../css/signup.css";
import "../css/textinput.css";

function Signup() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="form-box">
        <form className="d-flex flex-column justify-content-center">
          <TextInput
            id="1"
            type="email"
            label="아이디(이메일)"
            placeholder="아이디는 이메일으로 입력해주세요."
          />
          <TextInput
            id="2"
            type="password"
            label="비밀번호"
            placeholder="비밀번호는 특수문자, 숫자, 영문을 각 1자 이상 포함해야합니다."
          />
          <TextInput id="3" type="password" label="비밀번호 확인" />
          <TextInput id="4" type="text" label="병원명" />
          <TextInput id="5" type="text" label="사업자번호" />
          <TextInput id="6" type="text" label="전화번호" />
          <TextInput
            id="7"
            type="text"
            label="병원 로고"
            placeholder="파일을 업로드 해주세요."
          />

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
    </div>
  );
}

export default Signup;
