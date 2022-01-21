import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/image";
import verified from "../public/verified_white_24dp.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIGNUP_URL = "http://teama205.iptime.org/api/join";
const EMAIL_CHECK = "http://teama205.iptime.org/api/emailCheck";
const BN_CHECK = "http://teama205.iptime.org/api/bnNumberCheck";

function Signup() {
  const [imgBase64, setImgBase64] = useState([]);
  const [emailChecked, setEmailChecked] = useState(true);
  const [bnChecked, setBnChecked] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.userInfo);

  useEffect(() => {
    console.log("login useEffect:", isLoggedIn);
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const schema = yup.object().shape({
    email: yup.string().email().required("이메일 입력은 필수입니다."),
    password: yup
      .string()
      .required("비밀번호 입력은 필수입니다.")
      .matches(
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
        "비밀번호는 반드시 8 ~ 16자이며, 한 개의 특수문자를 반드시 포함한 영어 숫자 조합이어야 합니다."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 입력해주세요."),
    name: yup.string().required("병원명 입력은 필수입니다."),
    phone: yup
      .string()
      .required("전화번호 입력은 필수입니다.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "전화번호 양식에 맞게 입력해주세요"
      ),
    business_number: yup
      .string()
      .required("사업자 등록 번호 입력은 필수입니다.")
      .matches(
        /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/,
        "사업자 등록 번호 양식에 맞게 입력해주세요. OOO-OO-OOOOO"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFileChange = (e) => {
    const value = e.target.files[0];

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

  const onSubmit = async (data) => {
    const fd = new FormData();

    for (let key in data) {
      if (key === "logo_image") {
        const logoFile = data[key][0];
        const logoName = logoFile.name;
        fd.append(`logo_image`, logoFile);
        fd.append(`logo_name`, logoName);
      } else {
        fd.append(`${key}`, data[key]);
      }
    }

    await axios
      .post(SIGNUP_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast("서비스 신청 완료!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/");
      })
      .catch((err) => {
        toast.error("서비스 신청 실패!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };

  const onEmailChange = () => {
    setEmailChecked(false);
  };

  const onBnChange = () => {
    setBnChecked(false);
  };

  const onEmailCheck = async (e) => {
    const data = { email: getValues("email") };

    await axios
      .post(EMAIL_CHECK, data)
      .then((res) => {
        if (res.data.result === "notok") {
          toast.error("이미 존재하는 이메일입니다!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEmailChecked(false);
          return;
        }
        toast("사용 가능한 이메일입니다!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEmailChecked(true);
      })
      .catch((err) => console.log(err));
  };

  const onBnCheck = async (e) => {
    const data = { business_number: getValues("business_number") };

    await axios
      .post(BN_CHECK, data)
      .then((res) => {
        if (res.data.result === "notok") {
          toast("이미 존재하는 사업자 번호입니다!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBnChecked(false);
          return;
        }
        toast("사용 가능한 사업자번호 입니다!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBnChecked(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header title="서비스 신청"></Header>
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
                onChange={onEmailChange}
                {...register("email")}
              />
            </div>
            {emailChecked ? (
              <button class="btn btn-sm btn-primary d-flex justify-content-center align-items-center">
                <Image src={verified} height={30} width={30} />
              </button>
            ) : (
              <button
                type="button"
                onClick={onEmailCheck}
                class="check-button btn btn-primary"
              >
                중복체크
              </button>
            )}
          </div>
          <span className="error">{errors.email?.message}</span>
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
                placeholder="비밀번호는 8 ~ 16자 사이로 설정해주세요."
                {...register("password")}
              />
            </div>
          </div>
          <span className="error">{errors.password?.message}</span>
          <div class="d-flex justify-content-between mt-3">
            <div className="label-box">
              <label htmlFor="passwordConfirm" class="form-label">
                비밀번호 확인
              </label>
            </div>
            <div className="input-box">
              <input
                id="passwordConfirm"
                type="password"
                class="form-control"
                placeholder="비밀번호를 확인해주세요."
                {...register("passwordConfirm")}
              />
            </div>
          </div>
          <span className="error">{errors.password?.message}</span>
          <div class="d-flex justify-content-between mt-5">
            <div className="label-box">
              <label htmlFor="name" class="form-label">
                병원명
              </label>
            </div>
            <div className="input-box">
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="비밀번호를 확인해주세요."
                {...register("name")}
              />
            </div>
          </div>
          <span className="error">{errors.name?.message}</span>
          <div class="d-flex justify-content-between mt-3">
            <div className="label-box">
              <label htmlFor="phone" class="form-label">
                전화번호
              </label>
            </div>
            <div className="input-box">
              <input
                id="phone"
                type="text"
                class="form-control"
                placeholder="전화번호를 입력해주세요."
                {...register("phone")}
              />
            </div>
          </div>
          <span className="error">{errors.phone?.message}</span>
          <div class="d-flex justify-content-between mt-3">
            <div className="label-box">
              <label htmlFor="business_number" class="form-label">
                사업자 등록 번호
              </label>
            </div>
            <div className="input-box">
              <input
                id="business_number"
                type="text"
                class="form-control"
                placeholder="사업자 등록 번호를 입력해주세요."
                onChange={onBnChange}
                {...register("business_number")}
              />
            </div>
            {bnChecked ? (
              <button type="button" class="btn btn-primary btn-sm">
                <span class="material-icons-outlined">verified</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBnCheck}
                class="check-button btn btn-primary"
              >
                중복체크
              </button>
            )}
          </div>
          <span className="error">{errors.business_number?.message}</span>

          <div class="d-flex justify-content-between mt-3">
            <div className="label-box">
              <label htmlFor="logo_image" class="form-label">
                병원 로고
              </label>
            </div>
            <div className="input-box">
              <input
                id="logo_image"
                type="file"
                class="form-control"
                {...register("logo_image")}
                onChange={onFileChange}
              />
            </div>
          </div>

          <div className="w-75 d-flex justify-content-center mt-2">
            미리보기
            <img className="mw-100 border m-2" src={imgBase64} alt="" />
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button type="submit" class="submit-button btn btn-primary">
              서비스 신청
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
