import { slice } from "lodash";
import { useState } from "react";

function QuestionChoice({ q }) {
  const [options, setOptions] = useState([]);

  const handleOptionAdd = () => {
    setOptions([...options, { id: options.length }]);
  };

  const handleOptionDelete = (inputId) => {
    setOptions(options.filter((s) => s.id !== inputId));
  };

  const paintOptions = options.map((s) => {
    return (
      <div key={s.id} className="d-flex">
        <input
          id={`${q.id}-${s.id}`}
          name={s.id}
          type="text"
          className="form-control form-control-sm"
          placeholder="선택지 작성"
        ></input>
        <button
          class="btn material-icons p-0"
          onClick={() => handleOptionDelete(s.id)}
        >
          clear
        </button>
      </div>
    );
  });

  return (
    <div className="bg-info w-100 mt-3 p-1">
      <div className="d-flex form-floating">
        <input
          id={q.id}
          name={q.id}
          type="text"
          className="form-control"
          placeholder=" "
        ></input>
        <label>객관식 질문</label>
      </div>
      <div className="ms-3 mt-1">
        {paintOptions}
        <button class="btn material-icons p-0" onClick={handleOptionAdd}>
          add
        </button>
      </div>
    </div>
  );
}

export default QuestionChoice;
