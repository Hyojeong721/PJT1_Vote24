function TextInput(props) {
  return (
    <div class="mb-5 d-flex">
      <div className="label-box">
        <label for={props.id} class="form-label">
          {props.label}
        </label>
      </div>
      <div className="input-box">
        <input
          type={props.type}
          class="form-control"
          id={props.id}
          placeholder={props.placeholder}
        />
      </div>
      {props.label === "아이디(이메일)" ? (
        <button class="check-button btn btn-primary">중복확인</button>
      ) : null}
    </div>
  );
}

export default TextInput;
