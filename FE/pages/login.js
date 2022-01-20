import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../components/Header";

const LOGIN_URL = "http://teama205.iptime.org/api/login";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    await axios
      .post(LOGIN_URL, data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.result === "ok") {
          window.localStorage.setItem("JWT", data.token);
        } else {
          const reason = data.result.split(":");
          setErrorMessage(reason[1]);
          toast(reason[1]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header title="로그인"></Header>
      <div className="container d-flex justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-box d-flex flex-column"
        >
          <div class="mt-5">
            <div className="login-label-box">
              <label htmlFor="email" class="form-label">
                이메일
              </label>
            </div>
            <div className="login-input-box">
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="이메일을 입력해주세요."
                {...register("email")}
              />
            </div>
          </div>
          <div class="mt-3">
            <div className="login-label-box">
              <label htmlFor="password" class="form-label">
                비밀번호
              </label>
            </div>
            <div className="login-input-box">
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="비밀번호를 입력해주세요."
                {...register("password")}
              />
              <span className="error">{errorMessage}</span>
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
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default Login;
