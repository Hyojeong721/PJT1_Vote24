function TextInput(props) {
  const onChange = (e) => {
    props.onChange({
      name: props.name,
      value: e.target.value,
    });
  };

  return (
    <div class="mb-5 d-flex justify-content-between">
      <div className="label-box">
        <label for={props.name} class="form-label">
          {props.label}
        </label>
      </div>
      <div className="input-box">
        <input
          type={props.type}
          class="form-control"
          id={props.name}
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

export default TextInput;
