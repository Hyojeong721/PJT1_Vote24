import React, { useState } from "react";
import QuestionChoice from "./QuestionChoice";
import QuestionEssay from "./QuestionEssay";

function SurveyCreateForm() {
  const [questions, setQuestions] = useState([]);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleQuestionChoiceAdd = () => {
    setQuestions([...questions, { id: questions.length, type: "choice" }]);
  };

  const handleQuestionEssayAdd = () => {
    setQuestions([...questions, { id: questions.length, type: "essay" }]);
  };

  const handleQuestionDelete = (inputId) => {
    setQuestions(questions.filter((q) => q.id !== inputId));
  };

  const paintQuestions = questions.map((q) => {
    return (
      <div className="d-flex align-items-start">
        {q.type === "choice" ? (
          <QuestionChoice key={q.id} q={q} />
        ) : (
          <QuestionEssay key={q.id} q={q} />
        )}
        <button
          class="btn material-icons p-0"
          onClick={() => handleQuestionDelete(q.id)}
        >
          highlight_off
        </button>
      </div>
    );
  });

  return (
    <div className="container survey-form-container d-flex flex-column align-items-center">
      <div className="w-100 survey-form-header">
        <input
          id="title"
          name="title"
          type="text"
          className="survey-input-box form-control fs-1 mt-2"
          placeholder="설문 제목을 입력해주세요."
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
            ></input>
          </div>
        </div>
        <textarea
          id="context"
          name="context"
          className="survey-input-box form-control mt-2"
          placeholder="설문에 대한 설명을 작성해주세요."
          rows="10"
        ></textarea>
      </div>
      <div className="w-100 d-flex flex-column survey-form-body mt-3">
        {paintQuestions}
        <div className="p-2 d-flex justify-content-center gap-2 mt-5">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleQuestionChoiceAdd}
          >
            <span>객관식</span>
            <span class="material-icons">add_circle_outline</span>
          </button>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleQuestionEssayAdd}
          >
            <span>주관식</span>
            <span class="material-icons">add_circle_outline</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyCreateForm;
