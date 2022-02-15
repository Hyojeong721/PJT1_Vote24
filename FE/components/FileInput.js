import { useEffect, useRef } from "react";
import cn from "classnames";
import cs from "../styles/fileinput.module.css";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef(value);

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
    <div className={cn(cs.formRow, "d-flex")}>
      <div className={cn(cs.formLabel)}>
        <label htmlFor="formFile" className="form-label">
          첨부파일
        </label>
      </div>
      <div className={cn(cs.formControl)}>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleChange}
          ref={inputRef}
        ></input>
        {value && (
          <button className={cn(cs.delete)} onClick={handleClearClick}>
            삭제
          </button>
        )}
      </div>
    </div>
  );
}

export default FileInput;
