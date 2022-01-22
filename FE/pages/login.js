import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

const LOGIN_URL = "http://teama205.iptime.org/api/login";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useSelector((state) => state.userStatus);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      toast.warning("이미 로그인 된 사용자입니다.");
      router.push("/");
    }
  }, []);

  const onSubmit = async (data) => {
    const { id, code, token, name } = await axios
      .post(LOGIN_URL, data)
      .then((res) => {
        const { result, id, code, name, token } = res.data;

        if (result !== "ok") {
          const reason = result.split(":");
          setErrorMessage(reason[1]);
          toast.error(`로그인 실패 : ${errorMessage}`);
          return;
        }

        return { id, code, token, name };
      })
      .catch((err) => {
        toast.error("로그인 실패!");
        console.log(err);
      });

    localStorage.setItem("jwt", token);

    dispatch({
      type: "LOGIN",
      userInfo: {
        id,
        code,
        name,
      },
    });

    toast.success("로그인 완료!");
    router.push("/");
  };

  const goSignup = () => {
    router.push("/signup");
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
                name="email"
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
                name="password"
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
            <button
              type="button"
              onClick={goSignup}
              class="submit-button btn btn-success"
            >
              서비스 신청
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
