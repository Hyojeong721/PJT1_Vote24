function CategoryRadio({ register, nowCategory, setNowCategory }) {
  return (
    <div className="mb-2 border-bottom">
      <div className="form-check form-check-inline mt-3">
        <input
          className="form-check-input"
          type="radio"
          name="category"
          id="category1"
          value="0"
          checked={nowCategory === "0"}
          {...register("category", {
            onChange: (e) => setNowCategory(e.target.value),
          })}
        />
        <label className="form-check-label" htmlFor="category1">
          건강 설문
        </label>
      </div>
      <div className="form-check form-check-inline ms-5">
        <input
          className="form-check-input"
          type="radio"
          name="category"
          id="category2"
          value="1"
          checked={nowCategory === "1"}
          {...register("category")}
        />
        <label className="form-check-label" htmlFor="category2">
          서비스 만족 설문
        </label>
      </div>
    </div>
  );
}

export default CategoryRadio;
