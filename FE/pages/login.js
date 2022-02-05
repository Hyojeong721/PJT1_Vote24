import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "../components/Header";

const LOGIN_URL = "http://i6a205.p.ssafy.io:8000/api/login";

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
          const reason = result.split(":");
          setErrorMessage(reason[1]);
          toast.error(`로그인 실패 : ${errorMessage}`);
          return;
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
        toast.error("로그인 실패!");
        console.log(err);
      });
  };

  const goSignup = () => {
    router.push("/signup");
  };

  if (isLoggedIn) {
    return <div></div>;
  }

  return (
    <>
      <Header title="로그인"></Header>
      <div className="container d-flex justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-50 d-flex flex-column"
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
                  {...register("email")}
                />
                <label htmlFor="email">
                  <p className="text-secondary">you@example.com</p>
                </label>
                <span className="error">{errorMessage}</span>
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
                  {...register("password")}
                />
                <label htmlFor="password">
                  <p className="text-secondary">password</p>
                </label>
                <span className="error">{errorMessage}</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="submit-button btn btn-primary">
              로그인
            </button>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <div>
              <p className="text-center">아직 회원이 아니신가요?</p>
              <button
                type="button"
                onClick={goSignup}
                className="submit-button btn btn-success"
              >
                서비스 신청
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { userStatus } = store.getState();
//     console.log("serverside", userStatus);
//     if (userStatus.isLoggedIn) {
//       // toast.error("이미 로그인 된 유저입니다.");
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: {},
//     };
//   }
// );

export default Login;
