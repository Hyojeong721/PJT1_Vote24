import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Link from "next/link";

const LOGIN_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/login`;

function Login() {
  const { register, handleSubmit } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useSelector((state) => state.userStatus);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (!submitLoading) {
        toast.warning("이미 로그인 된 사용자입니다.");
      }
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const onSubmit = async (data) => {
    await axios
      .post(LOGIN_URL, data)
      .then((res) => {
        const { result, id, code, name, token } = res.data;

        if (result !== "ok") {
          const reason = result.split(":")[1];
          setErrorMessage(reason);
          throw new Error(`로그인 실패: ${reason} `);
        }

        localStorage.setItem("jwt", token);
        setSubmitLoading(true);

        dispatch({
          type: "LOGIN",
          userInfo: {
            id,
            code,
            name,
          },
        });
      })
      .then(() => {
        toast.success("로그인 완료!");
        router.push("/");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(`${err.message}`);
        console.log(err);
      });
  };

  const onInputChange = () => {
    setErrorMessage("");
  };

  if (isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="min-vh-80">
      <Header title="로그인"></Header>
      <div className="container h-100 d-flex justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-50 d-flex flex-column p-3 border rounded-2 shadow my-5 bg-light"
        >
          <div className="mt-5">
            <div className="fw-bold">이메일</div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder=" "
                  onChange={onInputChange}
                  {...register("email")}
                />
                <label htmlFor="email">
                  <p className="text-secondary">you@example.com</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errorMessage.includes("아이디") && errorMessage}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">비밀번호</div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder=" "
                  onChange={onInputChange}
                  {...register("password")}
                />
                <label htmlFor="password">
                  <p className="text-secondary">password</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errorMessage.includes("비밀번호") && errorMessage}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="submit-button btn btn-primary">
              로그인
            </button>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <p className="text-center mb-0">아직 회원이 아니신가요?</p>
            <Link href="/signup" passHref>
              <a className="submit-button btn btn-success">서비스 신청</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
