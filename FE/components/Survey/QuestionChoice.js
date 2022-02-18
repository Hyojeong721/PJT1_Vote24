import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "../../styles/questionchoice.module.css";

function QuestionChoice({
  unregister,
  register,
  q,
  category,
  index,
  setValue,
}) {
  const [options, setOptions] = useState([]);
  const [oCnt, setOCnt] = useState(1);
  const [optionScoreERR, setOptionScoreERR] = useState(false);
  const initialOptions = q.initialOptions;

  const addInitialOptions = (initialOptions) => {
    initialOptions.forEach((o, idx) => {
      setOptions((state) => [...state, { id: idx + 1 }]);
    });
    setOCnt(initialOptions.length + 1);
  };

  const setInitialQuestionsandOptions = (initialOptions) => {
    setValue(`Q${q.id}`, q.context);
    initialOptions.forEach((o, idx) => {
      setValue(`A${q.id}-${idx + 1}`, o.context);
      setValue(`B${q.id}-${idx + 1}`, o.weight);
    });
  };

  useEffect(() => {
    if (initialOptions) {
      addInitialOptions(initialOptions);
      setInitialQuestionsandOptions(initialOptions);
    }
  }, [initialOptions]);

  const handleOptionAdd = () => {
    setOptions([...options, { id: oCnt }]);
    setOCnt((state) => state + 1);
  };

  const handleOptionDelete = (inputId) => {
    setOptions(options.filter((o) => o.id !== inputId));
    unregister(`A${q.id}-${inputId}`); // A == option
    unregister(`B${q.id}-${inputId}`); // B == option score
  };

  const handleOptionScoreKey = (e) => {
    const regExp = /[^0-9]/g;
    if (regExp.test(e.target.value)) {
      setOptionScoreERR(true);
    } else {
      setOptionScoreERR(false);
    }

    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  // header
  // A == option
  // B == option score
  const paintOptions = options.map((o) => {
    return (
      <div key={o.id} className="d-flex gap-1 mt-1">
        <input
          id={`A${q.id}-${o.id}`}
          name={`A${q.id}-${o.id}`}
          type="text"
          className="form-control form-control-sm"
          placeholder="선택지 작성"
          autoComplete="off"
          value={o.text}
          {...register(`A${q.id}-${o.id}`)}
        ></input>
        {category === "0" && (
          <input
            id={`B${q.id}-${o.id}`}
            name={`B${q.id}-${o.id}`}
            type="text"
            min="0"
            className={cn(styles.scoreInput, "form-control", "form-control-sm")}
            placeholder="점수"
            autoComplete="off"
            onInput={(e) => handleOptionScoreKey(e)}
            {...register(`B${q.id}-${o.id}`)}
          ></input>
        )}
        <button
          className="btn material-icons p-0"
          onClick={() => handleOptionDelete(o.id)}
        >
          clear
        </button>
      </div>
    );
  });

  return (
    <div className="w-100 mt-3 p-1 border rounded shadow-sm bg-white">
      <div className="ms-1">{index + 1}.</div>
      <div className="d-flex form-floating">
        <input
          id={`Q${q.id}`}
          name={`Q${q.id}`}
          type="text"
          className="form-control"
          placeholder=" "
          autoComplete="off"
          {...register(`Q${q.id}`)}
        ></input>
        <label htmlFor={`Q${q.id}`} className="text-secondary">
          객관식 질문
        </label>
      </div>
      <div className="ms-3 mt-1">
        {paintOptions}
        {optionScoreERR && options.length ? (
          <div className="fs-0 d-flex align-items-center mt-1 bg-secondary text-white p-1 rounded">
            <span className="material-icons fs-6">priority_high</span>
            <span>점수에 숫자를 입력해주세요.</span>
          </div>
        ) : (
          <></>
        )}
        <button className="btn material-icons p-0" onClick={handleOptionAdd}>
          add
        </button>
      </div>
    </div>
  );
}

export default QuestionChoice;
