import React, { useState } from "react";
import axios from "axios";
import LinearInputForm from "../components/LinearInputForm";
import "../css/signup.css";
import "../css/textinput.css";

const SIGNUP_URL = "http://teama205.iptime.org/join";

function Signup() {
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    hospitalName: "",
    businessNumber: "",
    phoneNumber: "",
    logoFile: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (info.password !== info.passwordCheck) {
      return setPasswordWarning("두 비밀번호가 일치하지 않습니다.");
    }

    console.log(info);
    axios
      .post(SIGNUP_URL, info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (input) => {
    const { name, value } = input;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="form-box d-flex flex-column">
        <LinearInputForm
          id="1"
          name="email"
          type="email"
          label="아이디(이메일)"
          placeholder="아이디는 이메일으로 입력해주세요."
          onChange={onChange}
        />
        <LinearInputForm
          id="2"
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호는 특수문자, 숫자, 영문을 각 1자 이상 포함해야합니다."
          onChange={onChange}
        />
        <LinearInputForm
          id="3"
          name="passwordCheck"
          type="password"
          label="비밀번호 확인"
          onChange={onChange}
        />
        <LinearInputForm
          id="4"
          name="hospitalName"
          type="text"
          label="병원명"
          onChange={onChange}
        />
        <LinearInputForm
          id="5"
          name="businessNumber"
          type="text"
          label="사업자번호"
          onChange={onChange}
        />
        <LinearInputForm
          id="6"
          name="phoneNumber"
          type="text"
          label="전화번호"
          onChange={onChange}
        />
        <LinearInputForm
          id="7"
          name="logoFile"
          type="file"
          label="병원 로고"
          placeholder="파일을 업로드 해주세요."
          onChange={onChange}
        />

        <div className="d-flex justify-content-center">
          <button
            onClick={onSubmit}
            type="submit"
            class="submit-button btn btn-primary"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
