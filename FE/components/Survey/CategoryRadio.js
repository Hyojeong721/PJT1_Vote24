function CategoryRadio({ register, nowCategory, setNowCategory }) {
  return (
    <div>
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
          건강설문
        </label>
      </div>
      <div className="form-check form-check-inline">
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
          병원설문
        </label>
      </div>
    </div>
  );
}

export default CategoryRadio;
