import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import QuestionChoice from "./QuestionChoice";
import QuestionEssay from "./QuestionEssay";
import { toast } from "react-toastify";
import parseInput from "./ParseInput";

function SurveyCreateForm() {
  const router = useRouter();
  const [nowCategory, setNowCategory] = useState("0");
  const [questions, setQuestions] = useState([]);
  const [benchmarks, setBenchmarks] = useState([]);
  const [qCnt, setQCnt] = useState(1);
  const [bCnt, setBCnt] = useState(1);
  const { userInfo } = useSelector((state) => state.userStatus);
  const SURVEY_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${userInfo.id}`;

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
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
    console.log(jwt);
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

  const handleQuestionChoiceAdd = () => {
    setQuestions([...questions, { id: qCnt, type: "1" }]);
    setQCnt((state) => state + 1);
  };

  const handleBenchmarkAdd = () => {
    setBenchmarks([...benchmarks, { id: bCnt }]);
    setBCnt((state) => state + 1);
  };

  const handleQuestionEssayAdd = () => {
    setQuestions([...questions, { id: qCnt, type: "2" }]);
    setQCnt((state) => state + 1);
  };

  const handleQuestionDelete = (inputId) => {
    setQuestions(questions.filter((q) => q.id !== inputId));
    unregister(`Q${inputId}`);
    unregister(`Q${inputId}E`);
    setQCnt((state) => state + 1);
  };

  const handleBenchmarkDelete = (inputId) => {
    setBenchmarks(benchmarks.filter((b) => b.id !== inputId));
    unregister(`C${inputId}`);
    unregister(`D${inputId}`);
    setBCnt((state) => state + 1);
  };

  const paintQuestions = questions.map((q) => {
    return (
      <div key={q.id} className="d-flex align-items-start">
        {q.type === "1" ? (
          <QuestionChoice
            unregister={unregister}
            register={register}
            q={q}
            category={nowCategory}
          />
        ) : (
          <QuestionEssay unregister={unregister} register={register} q={q} />
        )}
        <button
          className="btn material-icons p-0"
          onClick={() => handleQuestionDelete(q.id)}
        >
          highlight_off
        </button>
      </div>
    );
  });

  const paintBenchmark = benchmarks.map((b) => {
    return (
      <div key={b.id} className="d-flex">
        <input
          id="benchmark"
          name="benchmark"
          type="url"
          className="bench-input survey-input-box form-control"
          placeholder="점수"
          {...register(`C${b.id}`)}
        ></input>
        <input
          id="benchmark"
          name="benchmark"
          type="url"
          className="survey-input-box form-control"
          placeholder="점수에 해당하는 문구를 작성하세요"
          {...register(`D${b.id}`)}
        ></input>
        <button
          className="btn material-icons p-0"
          onClick={() => handleBenchmarkDelete(b.id)}
        >
          clear
        </button>
      </div>
    );
  });

  return (
    <div className="container survey-form-container rounded d-flex flex-column align-items-center mt-5 pb-5">
      <form className="w-100 survey-form-header">
        <div>
          <div className="form-check form-check-inline mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id="category1"
              value="0"
              checked={nowCategory === "0"}
              {...register("category", {
                onChange: (e) => setNowCategory(e.target.value),
              })}
            />
            <label className="form-check-label" htmlFor="category1">
              건강설문
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id="category2"
              value="1"
              checked={nowCategory === "1"}
              {...register("category")}
            />
            <label className="form-check-label" htmlFor="category2">
              병원설문
            </label>
          </div>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          className="survey-input-box form-control fs-1 mt-2"
          placeholder="설문 제목을 입력해주세요."
          {...register("title", { required: true })}
        ></input>
        {errors.title && errors.title.type === "required" && (
          <div className="error d-flex align-items-center mt-1 bg-danger text-white p-1 rounded">
            <span className="material-icons fs-5">priority_high</span>
            <span>설문 제목 입력은 필수입니다.</span>
          </div>
        )}
        <div className="d-flex mt-3">
          <div className="datetime-box">
            <label htmlFor="start_at" className="fw-bold ms-1">
              시작일
            </label>
            <input
              id="start_at"
              type="datetime-local"
              className="form-control"
              {...register("start_at", { required: true })}
            ></input>
            {errors.start_at && errors.start_at.type === "required" && (
              <div className="error d-flex align-items-center mt-1 bg-danger text-white p-1 rounded">
                <span className="material-icons fs-5">priority_high</span>
                <span>시작일 입력은 필수입니다.</span>
              </div>
            )}
          </div>

          <div className="datetime-box">
            <label htmlFor="end_at" className="fw-bold ms-1">
              종료일
            </label>
            <input
              id="end_at"
              type="datetime-local"
              className="form-control"
              {...register("end_at", { required: true })}
            ></input>

            {errors.end_at && errors.end_at.type === "required" && (
              <div className="error d-flex align-items-center mt-1 bg-danger text-white p-1 rounded">
                <span className="material-icons fs-5">priority_high</span>
                <span>종료일 입력은 필수입니다.</span>
              </div>
            )}
          </div>
        </div>
        <textarea
          id="context"
          name="context"
          className="survey-input-box form-control mt-2"
          placeholder="설문에 대한 설명을 작성해주세요."
          rows="10"
          {...register("context", { required: true })}
        ></textarea>
        {errors.context && errors.context.type === "required" && (
          <div className="error d-flex align-items-center mt-1 bg-danger text-white p-1 rounded">
            <span className="material-icons fs-5">priority_high</span>
            <span>설문 설명 입력은 필수입니다.</span>
          </div>
        )}
        {nowCategory === "0" && (
          <>
            <div className="mt-2">설문 결과의 기준 점수를 입력하세요.</div>
            <div>{paintBenchmark}</div>
            <button
              type="button"
              className="btn material-icons p-0"
              onClick={handleBenchmarkAdd}
            >
              add
            </button>
            <div className="form-floating">
              <input
                id="output_link"
                name="output_link"
                type="url"
                className="survey-input-box form-control mt-2"
                placeholder=" "
                {...register("output_link", { required: true })}
              ></input>
              <label htmlFor="output_link" className="text-secondary">
                출력 링크(설문 후 설문자가 이동할 페이지의 링크)
              </label>
            </div>
            {errors.output_link && errors.output_link.type === "required" && (
              <div className="error d-flex align-items-center mt-1 bg-danger text-white p-1 rounded">
                <span className="material-icons fs-5">priority_high</span>
                <span>설문 참여자에게 제공되는 링크 입력은 필수입니다.</span>
              </div>
            )}
          </>
        )}
      </form>
      <div className="w-100 d-flex flex-column survey-form-body mt-3">
        {paintQuestions}
        <div className="p-2 d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleQuestionChoiceAdd}
          >
            <span>객관식</span>
            <span className="material-icons">add_circle_outline</span>
          </button>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleQuestionEssayAdd}
          >
            <span>주관식</span>
            <span className="material-icons">add_circle_outline</span>
          </button>
        </div>
      </div>

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
