import React from "react";

function LinearInputForm(props) {
  const onChange = (e) => {
    if (props.type === "file") {
      props.onChange({
        name: props.name,
        value: e.target.files[0],
      });
    } else {
      props.onChange({
        name: props.name,
        value: e.target.value,
      });
    }
  };

  return (
    <div class="d-flex justify-content-between">
      <div className="label-box">
        <label htmlFor={props.name} class="form-label">
          {props.label}
        </label>
      </div>
      <div className="input-box">
        <input
          id={props.name}
          type={props.type}
          class="form-control"
          placeholder={props.placeholder}
          onChange={onChange}
        />
      </div>
      {props.name === "email" ? (
        <button class="check-button btn btn-primary">중복확인</button>
      ) : null}
    </div>
  );
}

export default LinearInputForm;
