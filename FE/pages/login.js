import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/Login.module.css";

const LOGIN_URL = "http://teama205.iptime.org/api/login";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(LOGIN_URL, data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-box d-flex flex-column"
      >
        <div class="d-flex justify-content-between mt-5">
          <div className="label-box">
            <label htmlFor="email" class="form-label">
              이메일
            </label>
          </div>
          <div className="input-box">
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            <span className="error">아이디 에러</span>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-5">
          <div className="label-box">
            <label htmlFor="password" class="form-label">
              비밀번호
            </label>
          </div>
          <div className="input-box">
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
            />
            <span className="error">비밀번호 에러</span>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button type="submit" class="submit-button btn btn-primary">
            로그인
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button type="button" class="submit-button btn btn-success">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
