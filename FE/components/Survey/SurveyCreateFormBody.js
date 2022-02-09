import { useEffect, useState } from "react";
import QuestionChoice from "./QuestionChoice";
import QuestionEssay from "./QuestionEssay";
import cn from "classnames";
import styles from "../../styles/surveycreateformbody.module.css";

function SurveyCreateFormBody({
  register,
  unregister,
  nowCategory,
  initialQuestions,
  setValue,
}) {
  const [questions, setQuestions] = useState([]);
  const [qCnt, setQCnt] = useState(1);
  // const fiveOptions = [
  //   { id: 1, text: "매우 아니다" },
  //   { id: 2, text: "아니다" },
  //   { id: 3, text: "보통이다" },
  //   { id: 4, text: "그렇다" },
  //   { id: 5, text: "매우 그렇다" },
  // ];

  const addInitialQuestions = (initialQuestions) => {
    initialQuestions.forEach((q, idx) => {
      setQuestions((state) => [
        ...state,
        {
          id: idx + 1,
          type: q.type,
          initialOptions: q.option,
          context: q.context,
        },
      ]);
    });
    setQCnt(initialQuestions.length + 1);
  };

  useEffect(() => {
    if (initialQuestions) {
      addInitialQuestions(initialQuestions);
    }
  }, [initialQuestions]);

  const handleQuestionAdd = (type, initialOptions) => {
    setQuestions((state) => [
      ...state,
      { id: qCnt, type: type, initialOptions },
    ]);
    setQCnt((state) => state + 1);
  };

  const handleQuestionDelete = (inputId) => {
    setQuestions(questions.filter((q) => q.id !== inputId));
    unregister(`Q${inputId}`);
    unregister(`Q${inputId}E`);
  };

  const paintQuestions = questions.map((q, index) => {
    return (
      <div
        key={q.id}
        className="position-relative d-flex align-items-start mt-3"
      >
        {q.type === 0 ? (
          <QuestionChoice
            index={index}
            unregister={unregister}
            register={register}
            q={q}
            category={nowCategory}
            setValue={setValue}
          />
        ) : (
          <QuestionEssay
            index={index}
            unregister={unregister}
            register={register}
            q={q}
            setValue={setValue}
          />
        )}
        <i
          className={cn(styles.deleteButton, "btn", "material-icons", "p-0")}
          onClick={() => handleQuestionDelete(q.id)}
        >
          highlight_off
        </i>
      </div>
    );
  });

  return (
    <div className="w-100 d-flex flex-column survey-form-body mt-3">
      {paintQuestions}
      <div className="p-2 d-flex justify-content-center gap-2 mt-3">
        {/* <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => handleQuestionAdd(0, fiveOptions)}
        >
          <span>5지선다</span>
          <span className="material-icons">add_circle_outline</span>
        </button> */}
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => handleQuestionAdd(0)}
        >
          <span>객관식</span>
          <span className="material-icons">add_circle_outline</span>
        </button>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => handleQuestionAdd(1)}
        >
          <span>주관식</span>
          <span className="material-icons">add_circle_outline</span>
        </button>
      </div>
    </div>
  );
}

export default SurveyCreateFormBody;
