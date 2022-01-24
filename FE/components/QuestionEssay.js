function QuestionEssay({ q }) {
  return (
    <div className="bg-info w-100 mt-3 p-1">
      <div className="form-floating">
        <input
          id={q.id}
          name={q.id}
          type="text"
          className="form-control"
          placeholder=" "
        ></input>
        <label>주관식 질문</label>
      </div>
    </div>
  );
}

export default QuestionEssay;
