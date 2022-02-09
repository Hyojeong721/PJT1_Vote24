import { useEffect, useState } from "react";
import CategoryRadio from "./CategoryRadio";
import cn from "classnames";
import styles from "../../styles/surveycreateformheader.module.css";

function SurveyCreateFormHeader({
  register,
  unregister,
  errors,
  nowCategory,
  setNowCategory,
  initialBenchmarks,
  setValue,
}) {
  const [benchmarks, setBenchmarks] = useState([]);
  const [bCnt, setBCnt] = useState(1);

  const addInitialBenchmarks = (initialBenchmarks) => {
    initialBenchmarks.forEach((b, idx) => {
      setBenchmarks((state) => [...state, { id: idx + 1 }]);
    });
    setBCnt(initialBenchmarks.length + 1);
  };

  const setInitialBenchmarks = (initialBenchmarks) => {
    initialBenchmarks.forEach((b, idx) => {
      setValue(`C${idx + 1}`, b.benchmark);
      setValue(`D${idx + 1}`, b.output_text);
    });
  };

  useEffect(() => {
    if (initialBenchmarks) {
      addInitialBenchmarks(initialBenchmarks);
      setInitialBenchmarks(initialBenchmarks);
    }
  }, [initialBenchmarks]);

  const handleBenchmarkAdd = () => {
    setBenchmarks((state) => [...state, { id: bCnt }]);
    setBCnt((state) => state + 1);
  };

  const handleBenchmarkDelete = (inputId) => {
    setBenchmarks(benchmarks.filter((b) => b.id !== inputId));
    unregister(`C${inputId}`);
    unregister(`D${inputId}`);
    setBCnt((state) => state + 1);
  };

  const paintBenchmark = benchmarks.map((b) => {
    return (
      <div key={b.id} className="d-flex gap-1">
        <input
          id="benchmark"
          name="benchmark"
          type="number"
          min="0"
          className={cn(styles.benchInput, "form-control")}
          placeholder="O점 이상일때"
          autoComplete="off"
          {...register(`C${b.id}`)}
        ></input>
        <input
          id="benchmark"
          name="benchmark"
          type="text"
          className="survey-input-box form-control"
          placeholder="점수에 해당하는 문구를 작성하세요"
          autoComplete="off"
          {...register(`D${b.id}`)}
        ></input>
        <button
          className="btn material-icons p-0"
          onClick={() => handleBenchmarkDelete(b.id)}
        >
          clear
        </button>
      </div>
    );
  });

  return (
    <form className="w-100 survey-form-header">
      <CategoryRadio
        register={register}
        nowCategory={nowCategory}
        setNowCategory={setNowCategory}
      />
      <div className={cn(styles.inputBox)}>
        <input
          id="title"
          name="title"
          type="text"
          className={cn(styles.inputTag, "fs-1")}
          placeholder="설문 제목을 입력해주세요."
          autoComplete="off"
          {...register("title", { required: true })}
        ></input>
        <div className={cn(styles.inputLabel)}></div>
      </div>
      {errors.title && errors.title.type === "required" && (
        <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
          <span className="material-icons fs-5">priority_high</span>
          <span>설문 제목 입력은 필수입니다.</span>
        </div>
      )}
      <div className="d-flex mt-3 gap-3">
        <div className={cn(styles.datetimeBox)}>
          <label htmlFor="start_at" className="fw-bold ms-1">
            시작일
          </label>
          <input
            id="start_at"
            type="datetime-local"
            className="form-control"
            {...register("start_at", { required: true })}
          ></input>
          {errors.start_at && errors.start_at.type === "required" && (
            <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
              <span className="material-icons fs-5">priority_high</span>
              <span>시작일 입력은 필수입니다.</span>
            </div>
          )}
        </div>

        <div className={cn(styles.datetimeBox)}>
          <label htmlFor="end_at" className="fw-bold ms-1">
            종료일
          </label>
          <input
            id="end_at"
            type="datetime-local"
            className="form-control"
            {...register("end_at", { required: true })}
          ></input>

          {errors.end_at && errors.end_at.type === "required" && (
            <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
              <span className="material-icons fs-5">priority_high</span>
              <span>종료일 입력은 필수입니다.</span>
            </div>
          )}
        </div>
      </div>
      <textarea
        id="context"
        name="context"
        className="survey-input-box form-control mt-2"
        placeholder="설문에 대한 설명을 작성해주세요."
        rows="10"
        {...register("context", { required: true })}
      ></textarea>
      {errors.context && errors.context.type === "required" && (
        <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
          <span className="material-icons fs-5">priority_high</span>
          <span>설문 설명 입력은 필수입니다.</span>
        </div>
      )}
      {nowCategory === "0" && (
        <div className="bg-white border mt-3 rounded p-3">
          <div className="p-1 fw-bold">결과 화면에 출력될 요소 입력</div>
          <div className="form-control mt-2">
            <div className="my-1">설문 결과의 기준 점수를 입력하세요.</div>
            <div>{paintBenchmark}</div>
            <button
              type="button"
              className="btn material-icons p-0"
              onClick={handleBenchmarkAdd}
            >
              add
            </button>
          </div>
          <div className="form-floating">
            <input
              id="output_link"
              name="output_link"
              type="text"
              className={cn("form-control", "mt-2")}
              placeholder=" "
              autoComplete="off"
              {...register("output_link", { required: true })}
            ></input>
            <label htmlFor="output_link" className="text-secondary">
              관련 건강 정보 링크
            </label>
          </div>
          {errors.output_link && errors.output_link.type === "required" && (
            <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
              <span className="material-icons fs-5">priority_high</span>
              <span>
                설문 참여자에게 제공되는 건강 정보 링크 입력은 필수입니다.
              </span>
            </div>
          )}
          <div className="form-floating">
            <input
              id="reservation_link"
              name="reservation_link"
              type="text"
              className={cn("form-control", "mt-2")}
              placeholder=" "
              autoComplete="off"
              {...register("reservation_link", { required: true })}
            ></input>
            <label htmlFor="reservation_link" className="text-secondary">
              관련과 진료 예약 바로가기 링크
            </label>
          </div>
          {errors.reservation_link &&
            errors.reservation_link.type === "required" && (
              <div className="error d-flex align-items-center mt-1 bg-primary text-white p-1 rounded">
                <span className="material-icons fs-5">priority_high</span>
                <span>
                  설문 참여자에게 제공되는 진료 예약 링크 입력은 필수입니다.
                </span>
              </div>
            )}
        </div>
      )}
    </form>
  );
}

export default SurveyCreateFormHeader;
