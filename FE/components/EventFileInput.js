import { useRef } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <label htmlFor="formFile" className="form-label">
        첨부파일
      </label>
      <input
        className="form-control"
        type="file"
        id="formFile"
        onChange={handleChange}
        ref={inputRef}
      ></input>
      {value && <button onClick={handleClearClick}> X </button>}
    </div>
  );
}

export default FileInput;
