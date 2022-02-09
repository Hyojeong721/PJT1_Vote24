import cn from "classnames";
import styles from "../../styles/usersurveyagegender.module.css";

function UserSurveyAgeGender({ register }) {
  return (
    <div className="border rounded">
      <div className="ps-3 p-2 fs-4">필수 정보</div>
      <div className="d-flex gap-5 bg-light border-top">
        <div className="d-flex align-items-center ps-3 p-2">
          <div>연령</div>
          <select
            class={cn(styles.selectInput, "form-select")}
            aria-label="age"
            {...register("age", { required: true })}
          >
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60세 이상</option>
          </select>
        </div>
        <div className="d-flex align-items-center">
          <div>성별</div>
          <select
            class={cn(styles.selectInput2, "form-select")}
            aria-label="gender"
            {...register("gender", { required: true })}
          >
            <option value="0">남</option>
            <option value="1">여</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserSurveyAgeGender;
