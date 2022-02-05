import { useEffect, useState } from "react";
import OptionInput from "./OptionInput";

function QuestionChoice({ unregister, register, q, category }) {
  const [options, setOptions] = useState([]);
  const [oCnt, setOCnt] = useState(1);

  const setInitialOptions = () => {
    if (q.type === 1) {
      return [];
    }

    if (q.type === 0) {
      setOptions([
        { id: 1, text: "매우 아니다" },
        { id: 2, text: "아니다" },
        { id: 3, text: "보통이다" },
        { id: 4, text: "그렇다" },
        { id: 5, text: "매우 그렇다" },
      ]);
      setOCnt(5);
    }
  };

  useEffect(() => {
    setInitialOptions();
  }, []);

  const handleOptionAdd = () => {
    setOptions([...options, { id: oCnt }]);
    setOCnt((state) => state + 1);
  };

  const handleOptionDelete = (inputId) => {
    setOptions(options.filter((o) => o.id !== inputId));
    setOCnt((state) => state + 1);
    unregister(`A${q.id}-${inputId}`); // A == option
    unregister(`B${q.id}-${inputId}`); // B == option score
  };

  // header
  // A == option
  // B == option score
  const paintOptions = options.map((o) => {
    return (
      <div key={o.id} className="d-flex">
        {/* <input
          id={`A${q.id}-${o.id}`}
          name={`A${q.id}-${o.id}`}
          type="text"
          className="form-control form-control-sm"
          placeholder="선택지 작성"
          value={o.text}
          {...register(`A${q.id}-${o.id}`)}
        ></input> */}
        <OptionInput register={register} q={q} o={o} />
        {category === "0" && (
          <input
            id={`B${q.id}-${o.id}`}
            name={`B${q.id}-${o.id}`}
            type="text"
            className="bench-input form-control form-control-sm"
            placeholder="점수"
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
    <div className="w-100 mt-3 p-1">
      <div className="d-flex form-floating">
        <input
          id={`Q${q.id}`}
          name={`Q${q.id}`}
          type="text"
          className="form-control"
          placeholder=" "
          {...register(`Q${q.id}`)}
        ></input>
        <label htmlFor={`Q${q.id}`}>객관식 질문</label>
      </div>
      <div className="ms-3 mt-1">
        {paintOptions}
        <button className="btn material-icons p-0" onClick={handleOptionAdd}>
          add
        </button>
      </div>
    </div>
  );
}

export default QuestionChoice;
