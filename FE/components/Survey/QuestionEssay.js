function QuestionEssay({ register, q }) {
  return (
    <div className="w-100 mt-3 p-1">
      <div className="form-floating">
        <input
          id={`Q${q.id}E`}
          name={`Q${q.id}E`}
          type="text"
          className="form-control shadow-sm"
          placeholder=" "
          {...register(`Q${q.id}E`)}
        ></input>
        <label htmlFor={`Q${q.id}E`} className="text-secondary">
          주관식 질문
        </label>
      </div>
    </div>
  );
}

export default QuestionEssay;
