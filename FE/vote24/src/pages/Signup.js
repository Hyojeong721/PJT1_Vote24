import React, { useState } from "react";
import axios from "axios";
import LinearInputForm from "../components/LinearInputForm";
import "../css/signup.css";
import "../css/textinput.css";

const SIGNUP_URL = "http://teama205.iptime.org/api/join";

function Signup() {
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    business_number: "",
    phone: "",
    logo_name: "",
    logo_image: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (info.password !== info.passwordCheck) {
      return setPasswordWarning("두 비밀번호가 일치하지 않습니다.");
    }

    const fd = new FormData();
    for (let key in info) {
      fd.append(`${key}`, info[key]);
    }

    await axios
      .post(SIGNUP_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
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

  const onFileChange = (input) => {
    const { name, value } = input;

    setInfo({
      ...info,
      logo_name: value.name,
      logo_image: value,
    });

    if (value) {
      let reader = new FileReader();
      reader.readAsDataURL(value);

      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          var base64Sub = base64.toString();
          setImgBase64(base64Sub);
        }
      };
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="form-box d-flex flex-column gap-5">
        <LinearInputForm
          name="email"
          type="email"
          label="아이디(이메일)"
          placeholder="아이디는 이메일으로 입력해주세요."
          onChange={onChange}
        />
        <LinearInputForm
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호는 특수문자, 숫자, 영문을 각 1자 이상 포함해야합니다."
          onChange={onChange}
        />
        <LinearInputForm
          name="passwordCheck"
          type="password"
          label="비밀번호 확인"
          onChange={onChange}
        />
        <LinearInputForm
          name="name"
          type="text"
          label="병원명"
          onChange={onChange}
        />
        <LinearInputForm
          name="business_number"
          type="text"
          label="사업자번호"
          onChange={onChange}
        />
        <LinearInputForm
          name="phone"
          type="text"
          label="전화번호"
          onChange={onChange}
        />
        <LinearInputForm
          name="logo_image"
          type="file"
          label="병원 로고"
          placeholder="파일을 업로드 해주세요."
          onChange={onFileChange}
        />

        <div className="w-75 d-flex justify-content-center">
          <img
            className="mw-100 border"
            src={imgBase64}
            alt="선택된 이미지 출력"
          />
        </div>

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
