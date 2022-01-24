import React, { useState } from "react";
import QuestionChoice from "../components/QuestionChoice";
import QuestionEssay from "../components/QuestionEssay";

function SurveyPreview() {
  const [questions, setQuestions] = useState([]);

  const handleQuestionChoiceAdd = () => {
    const id = questions.length;
    setQuestions([...questions, { id, type: "choice" }]);
    console.log(questions);
  };

  const handleQuestionEssayAdd = () => {
    setQuestions([...questions, { id: questions.length, type: "essay" }]);
    console.log(questions);
  };

  const handleSelectionAdd = () => {};

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
        <textarea
          id="description"
          name="context"
          className="survey-input-box form-control mt-2"
          placeholder="설문에 대한 설명을 작성해주세요."
          rows="10"
        ></textarea>
      </div>
      <div className="w-100 d-flex flex-column survey-form-body mt-3">
        {questions &&
          questions.map((q) => {
            if (q.type === "choice") {
              return <QuestionChoice q={q} />;
            } else {
              return <QuestionEssay q={q} />;
            }
          })}
        <div className="bg-info p-2 d-flex justify-content-center gap-2">
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

export default SurveyPreview;
