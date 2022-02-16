import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { toast } from "react-toastify";

const SIGNUP_URL = "http://i6a205.p.ssafy.io:8000/api/join";
const EMAIL_CHECK = "http://i6a205.p.ssafy.io:8000/api/emailCheck";
const BN_CHECK = "http://i6a205.p.ssafy.io:8000/api/bnNumberCheck";

function Signup() {
  const [imgBase64, setImgBase64] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [bnChecked, setBnChecked] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.userStatus);

  useEffect(() => {
    if (isLoggedIn) {
      toast.warning("이미 로그인 된 사용자입니다.");
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효하지 않은 이메일입니다.")
      .required("이메일 입력은 필수입니다."),
    password: yup
      .string()
      .required("비밀번호 입력은 필수입니다.")
      .matches(
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
        "비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
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
    logo_image: yup
      .mixed()
      .test("required", "병원 로고 이미지 파일을 선택해주세요!", (value) => {
        return value && value.length;
      })
      .test(
        "type",
        "png/jpeg/jpg 형식의 파일을 선택해주세요!",
        function (value) {
          return (
            value &&
            value[0] &&
            (value[0].type === "image/jpeg" ||
              value[0].type === "image/jpg" ||
              value[0].type === "image/png")
          );
        }
      )
      .test("fileSize", "파일 사이즈가 너무 큽니다!", (value, context) => {
        return value && value[0] && value[0].size <= 200000;
      }),
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
    setImageSelected(true);

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

  // 모듈화
  const makeFormData = (data) => {
    const fd = new FormData();

    for (let key in data) {
      if (key === "logo_image" && data[key].length) {
        const logoFile = data[key][0];
        const logoName = logoFile.name;
        fd.append(`logo_image`, logoFile);
        fd.append(`logo_name`, logoName);
      } else {
        fd.append(`${key}`, data[key]);
      }
    }
    return fd;
  };

  const onSubmit = async (data) => {
    if (!(emailChecked && bnChecked)) {
      toast.dismiss();
      toast.warning("중복 확인이 필요합니다.");
      return;
    }

    const fd = makeFormData(data);

    await axios
      .post(SIGNUP_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast.success("서비스 신청 완료!");
        router.push("/");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("서비스 신청 실패!");
        console.log(err);
      });
  };

  const onEmailCheck = async (e) => {
    const email = getValues("email");
    const emailREGEX =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!emailREGEX.test(email) || errors.email?.message) {
      toast.dismiss();
      toast.error("이메일 형식에 맞게 입력해주세요.");
      return;
    }
    const data = { email };

    await axios
      .post(EMAIL_CHECK, data)
      .then((res) => {
        if (res.data.result === "notok") {
          toast.dismiss();
          toast.error("이미 존재하는 이메일입니다!");
          setEmailChecked(false);
          return;
        }
        toast.success("사용 가능한 이메일입니다!");
        setEmailChecked(true);
      })
      .catch((err) => {
        toast.error("서버에러: 이메일 중복 확인에 실패하였습니다. ");
        console.log(err);
      });
  };

  const onBnCheck = async (e) => {
    const businessNumber = getValues("business_number");
    const bnREGEX = /([0-9]{3})-([0-9]{2})-([0-9]{5})/;
    if (!bnREGEX.test(businessNumber) || errors.business_number?.message) {
      toast.dismiss();
      toast.error("사업자 등록 번호 양식에 맞게 입력해주세요. OOO-OO-OOOOO");
      return;
    }
    const data = { business_number: businessNumber };

    await axios
      .post(BN_CHECK, data)
      .then((res) => {
        if (res.data.result === "notok") {
          toast.dismiss();
          toast.error("이미 존재하는 사업자 번호입니다!");
          setBnChecked(false);
          return;
        }
        toast.success("사용 가능한 사업자번호 입니다!");
        setBnChecked(true);
      })
      .catch((err) => {
        toast.error("서버에러: 사업자 등록 번호 중복 확인에 실패하였습니다. ");
        console.log(err);
      });
  };

  return (
    <>
      <Header title="서비스 신청"></Header>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <form
          className="form-box d-flex flex-column p-3 border rounded-2 shadow my-5 bg-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="d-flex justify-content-between">
              <div className="fw-bold">
                <label htmlFor="email">이메일</label>
              </div>
              {emailChecked ? (
                <button className="btn btn-sm btn-primary d-flex justify-content-center align-items-center">
                  <span className="material-icons">check_circle</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onEmailCheck}
                  className="check-button btn btn-primary"
                >
                  중복확인
                </button>
              )}
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  {...register("email", {
                    onChange: () => setEmailChecked(false),
                  })}
                />
                <label htmlFor="email">
                  <p className="text-secondary">you@example.com</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.email?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">
              <label htmlFor="password">비밀번호</label>
            </div>
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
                  <p className="text-secondary fs-0">
                    8~16자 영문, 숫자, 특수문자를 포함해야 합니다.
                  </p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.password?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="passwordConfirm"
                  type="password"
                  className="form-control"
                  placeholder=" "
                  {...register("passwordConfirm")}
                />
                <label htmlFor="passwordConfirm">
                  <p className="text-secondary fs-0">
                    위 비밀번호와 동일한 비밀번호를 입력해주세요.
                  </p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.passwordConfirm?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">
              <label htmlFor="name">병원명</label>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  {...register("name")}
                />
                <label htmlFor="name">
                  <p className="text-secondary">병원명을 입력해주세요.</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.name?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="fw-bold">
              <label htmlFor="phone">전화번호</label>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  {...register("phone")}
                />
                <label htmlFor="phone">
                  <p className="text-secondary">전화번호를 입력해주세요.</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.phone?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <div className="fw-bold">
                <label htmlFor="business_number">사업자 등록 번호</label>
              </div>
              {bnChecked ? (
                <button
                  type="button"
                  className="btn btn-sm btn-primary d-flex justify-content-center align-items-center"
                >
                  <span className="material-icons">check_circle</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBnCheck}
                  className="check-button btn btn-primary"
                >
                  중복확인
                </button>
              )}
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="input-box form-floating ">
                <input
                  id="business_number"
                  type="text"
                  className="form-control"
                  placeholder=" "
                  {...register("business_number", {
                    onChange: () => setBnChecked(false),
                  })}
                />
                <label htmlFor="business_number">
                  <p className="text-secondary">OOO-OO-OOOOO</p>
                </label>
                <span className="fs-0 text-danger ms-1">
                  {errors.business_number?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between mt-3">
            <div className="label-box">
              <label htmlFor="logo_image">병원 로고</label>
            </div>
            <div className="input-box">
              <input
                id="logo_image"
                type="file"
                className="form-control"
                accept="image/*"
                {...register("logo_image")}
                onChange={onFileChange}
              />
            </div>
            <span className="fs-0 text-danger ms-1">
              {errors.logo_image?.message}
            </span>
          </div>

          {/* <div className="w-75 d-flex justify-content-center mt-2">
            미리보기
            <Image
              className="mw-100 m-2"
              src={imageSelected ? imgBase64 : "/notLoaded"}
              alt=""
              width="200px"
              height="300px"
              objectFit="contain"
            />
          </div> */}
          <div className="d-flex justify-content-center mt-3 mb-5">
            <button type="submit" className="submit-button btn btn-primary">
              서비스 신청
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
