import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import QuestionChoice from "./QuestionChoice";
import QuestionEssay from "./QuestionEssay";
import { useSelector } from "react-redux";

function SurveyCreateForm() {
  const [questions, setQuestions] = useState([]);
  const [benchmarks, setBenchmarks] = useState([]);
  const [qCnt, setQCnt] = useState(1);
  const [bCnt, setBCnt] = useState(1);
  const { isLoggedIn, userInfo } = useSelector((state) => state.userStatus);
  const SURVEY_URL = `http://i6a205.p.ssafy.io:8000/api/survey/1`;

  const { register, unregister, handleSubmit } = useForm();

  const parseInput = (data) => {
    const bList = [];
    const qList = [];
    const oList = {};
    let qIndex = 1;
    let oIndex = 1;

    for (let key of Object.keys(data).sort()) {
      switch (key[0]) {
        // header case
        // A == option // B == option score // C == benchmark // D == bench output
        // QC == q choice // QE == q essay
        case "A":
          const [qName, oId] = key.split("-");
          const qId = qName.slice(1);
          const option = {
            order: oIndex,
            context: data[key],
            weight: data[key.replace("A", "B")],
          };
          if (oList[qId]) {
            oList[qId].push(option);
          } else {
            oList[qId] = [option];
          }

          oIndex++;
          break;
        case "C":
          bList.push({
            benchmark: data[key],
            output_text: data[key.replace("C", "D")],
          });
          break;
        case "Q":
          const question = {
            order: qIndex,
            context: data[key],
          };
          if (key.slice(-1) === "E") {
            qList.push({
              ...question,
              type: "2",
            });
          } else {
            qList.push({
              ...question,
              type: "1",
              option: oList[key.slice(1)],
            });
          }
          qIndex++;
          break;
        default:
          break;
      }
    }

    return { qList, bList };
  };

  const onSubmit = async (data) => {
    const { qList, bList } = parseInput(data);
    const { title, context, output_link, start_at, end_at } = data;
    const result = {
      title,
      context,
      output_link,
      start_at,
      end_at,
      question: qList,
      benchmark: bList,
    };
    await axios.post(SURVEY_URL, result).then((res) => console.log(res.data));
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
    unregister(`QC${inputId}`);
    unregister(`QE${inputId}`);
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
          <QuestionChoice unregister={unregister} register={register} q={q} />
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
    <div className="container survey-form-container d-flex flex-column align-items-center">
      <form className="w-100 survey-form-header">
        <input
          id="title"
          name="title"
          type="text"
          className="survey-input-box form-control fs-1 mt-2"
          placeholder="설문 제목을 입력해주세요."
          {...register("title")}
        ></input>
        <div className="d-flex mt-3">
          <div>
            <label htmlFor="start_at" className="fw-bold ms-1">
              시작일
            </label>
            <input
              id="start_at"
              type="datetime-local"
              className="form-control"
              {...register("start_at")}
            ></input>
          </div>

          <div>
            <label htmlFor="end_at" className="fw-bold ms-1">
              종료일
            </label>
            <input
              id="end_at"
              type="datetime-local"
              className="form-control"
              {...register("end_at")}
            ></input>
          </div>
        </div>
        <textarea
          id="context"
          name="context"
          className="survey-input-box form-control mt-2"
          placeholder="설문에 대한 설명을 작성해주세요."
          rows="10"
          {...register("context")}
        ></textarea>
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
            {...register("output_link")}
          ></input>
          <label htmlFor="output_link" className="text-secondary">
            출력 링크(설문 후 설문자가 이동할 페이지의 링크)
          </label>
        </div>
      </form>
      <div className="w-100 d-flex flex-column survey-form-body mt-3">
        {paintQuestions}
        <div className="p-2 d-flex justify-content-center gap-2 mt-5">
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
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="submit-button btn btn-primary"
        >
          서비스 신청
        </button>
      </div>
    </div>
  );
}

export default SurveyCreateForm;
