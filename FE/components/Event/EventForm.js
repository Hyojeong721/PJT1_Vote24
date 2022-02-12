import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";

const EventForm = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    title: "",
    context: "",
    start_at: "",
    end_at: "",
    imgFile: null,
  });

  // 데이터 보내는 서버 url 작성
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/${hospital_id}`;

  // 글 작성시 state에 반영
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //작성완료
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (let key in values) {
      if (key === "imgFile") {
        if (values[key] != null) {
          const imgFile = values[key];
          const imgName = imgFile.name;
          fd.append("event_img", imgFile);
          fd.append("attachment", imgName);
        }
      } else {
        fd.append(`${key}`, values[key]);
      }
    }

    const jwt = localStorage.getItem("jwt");

    await axios
      .post(EVENT_URL, fd, {
        headers: {
          authorization: jwt,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log("이벤트 등록 성공!", res.data);
        router.push(`/event/${res.data.id}`);
      })
      .catch((err) => {
        toast.error("이벤트 등록 실패!", {
          autoClose: 3000,
        });
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div name="form" className={cn(cs.form)}>
        <div name="제목" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="title">
              <span className={cn(cs.star)}>*{"  "}</span>제목
            </label>
          </div>

          <div className={cn(cs.formControl)}>
            <input
              className={cn(cs.input)}
              name="title"
              value={values.title}
              onChange={handleInputChange}
              id="title"
              required
            ></input>
          </div>
        </div>

        <div className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="start_at">
              <span className={cn(cs.star)}>*{"  "}</span>시작일
            </label>{" "}
            ~ <label htmlFor="end_at">마감일</label>
          </div>
          <div className={cn(cs.formControl)}>
            <input
              id="start_at"
              name="start_at"
              type="datetime-local"
              onChange={handleInputChange}
              value={values.start_at}
              required
            ></input>
            {"  "}~{"  "}
            <input
              id="end_at"
              name="end_at"
              type="datetime-local"
              onChange={handleInputChange}
              value={values.end_at}
              required
            ></input>
          </div>
        </div>

        <div className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="context">
              <span className={cn(cs.star)}>*{"  "}</span>내용
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            <textarea
              className={cn(cs.textarea)}
              name="context"
              value={values.context}
              onChange={handleInputChange}
              id="context"
              rows="20"
              required
            ></textarea>
          </div>
        </div>
        <div className={cn(cs.formRow)}>
          <FileInput
            name="imgFile"
            value={values.imgFile}
            onChange={handleChange}
          ></FileInput>
        </div>
      </div>

      <div className={cn(cs.btns, "d-flex")}>
        <div className={cn(cs.btn)}>
          <Link href="/event/" passHref>
            <button className="btn btn-secondary">취소</button>
          </Link>
        </div>
        <div className={cn(cs.btn)}>
          <button type="submit" className="btn btn-primary">
            등록
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
