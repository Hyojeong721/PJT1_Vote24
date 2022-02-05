import { useState } from "react";

function OptionInput({ register, q, o }) {
  const [value, setValue] = useState(o.text);

  const onValueChange = (value) => {
    setValue(value);
  };

  return (
    <input
      id={`A${q.id}-${o.id}`}
      name={`A${q.id}-${o.id}`}
      type="text"
      className="form-control form-control-sm"
      placeholder="선택지 작성"
      value={value}
      onChange={() => onValueChange(e.target.value)}
      {...register(`A${q.id}-${o.id}`)}
    ></input>
  );
}

export default OptionInput;
