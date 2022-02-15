import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import parseInput from "./ParseInput";
import SurveyCreateFormHeader from "./SurveyCreateFormHeader";
import SurveyCreateFormBody from "./SurveyCreateFormBody";
import cn from "classnames";
import styles from "../../styles/surveycreateform.module.css";

function SurveyCreateForm() {
  const router = useRouter();
  const [nowCategory, setNowCategory] = useState("0");

  useEffect(() => {
    if (router.query.category) {
      setNowCategory(router.query.category);
    }
  }, []);

  const { userInfo } = useSelector((state) => state.userStatus);
  const SURVEY_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${userInfo.id}`;

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const { qList, bList } = parseInput(data);
    const {
      category,
      title,
      context,
      start_at,
      end_at,
      output_link,
      reservation_link,
    } = data;
    const result = {
      category,
      title,
      context,
      start_at,
      end_at,
      output_link,
      reservation_link,
      question: qList,
      benchmark: bList,
    };
    const jwt = localStorage.getItem("jwt");

    await axios
      .post(SURVEY_URL, result, {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        toast.success("설문 생성 성공");
        router.push(`/survey/${res.data.surveyID}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("설문 생성 실패");
      });
  };

  return (
    <div
      className={cn(
        styles.surveyFormBox,
        "container",
        "border",
        "border-2",
        "shadow",
        "rounded",
        "mt-5",
        "pb-5"
      )}
    >
      <SurveyCreateFormHeader
        register={register}
        unregister={unregister}
        errors={errors}
        nowCategory={nowCategory}
        setNowCategory={setNowCategory}
        setValue={setValue}
      />
      <SurveyCreateFormBody
        register={register}
        unregister={unregister}
        nowCategory={nowCategory}
      />

      <div className="w-100 d-flex mt-5">
        <Link href={`/survey`} passHref>
          <a className="btn btn-secondary">취소</a>
        </Link>
        <button
          onClick={handleSubmit(onSubmit)}
          className="submit-button btn btn-primary position-absolute start-50 translate-middle"
        >
          설문 생성
        </button>
      </div>
    </div>
  );
}

export default SurveyCreateForm;
