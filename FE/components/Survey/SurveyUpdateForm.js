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

function SurveyUpdateForm({ surveyDetail, sId }) {
  const router = useRouter();
  const [nowCategory, setNowCategory] = useState("0");
  const SURVEY_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { benchmark, question } = surveyDetail;

  const setFormData = ({
    category,
    title,
    context,
    start_at,
    end_at,
    output_link,
  }) => {
    setNowCategory(`${category}`);
    setValue("title", title);
    setValue("context", context);
    setValue("start_at", start_at.slice(0, 16));
    setValue("end_at", end_at.slice(0, 16));
    setValue("output_link", output_link);
  };

  useEffect(() => {
    setFormData(surveyDetail);
  }, [surveyDetail]);

  const onSubmit = async (data) => {
    console.log(data);
    const { qList, bList } = parseInput(data);
    const { category, title, context, output_link, start_at, end_at } = data;
    const result = {
      category,
      title,
      context,
      output_link,
      start_at,
      end_at,
      question: qList,
      benchmark: bList,
    };

    const jwt = localStorage.getItem("jwt");
    console.log("@@@@@@", result);
    await axios
      .put(SURVEY_URL, result, {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        toast.success("설문 수정 완료");
        router.push(`/survey/${res.data.surveyID}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("설문 수정 실패");
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
        "d-flex",
        "flex-column",
        "align-items-center",
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
        initialBenchmarks={benchmark}
        setValue={setValue}
      />
      <SurveyCreateFormBody
        register={register}
        unregister={unregister}
        nowCategory={nowCategory}
        initialQuestions={question}
        setValue={setValue}
      />

      <div className="w-100 d-flex mt-5">
        <Link href={`/survey`} passHref>
          <a className="btn btn-secondary">취소</a>
        </Link>
        <button
          onClick={handleSubmit(onSubmit)}
          className="submit-button btn btn-primary position-absolute start-50 translate-middle"
        >
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default SurveyUpdateForm;
