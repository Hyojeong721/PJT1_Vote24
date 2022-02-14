import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";
import DateTimeForm from "../DateTimeForm";

const EventUpdateForm = ({ eventId, url }) => {
  const [values, setValues] = useState([]);
  const router = useRouter();
  // 기존 data 가져오기
  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(url)
        .then((res) => {
          const data = res.data;
          setValues(data);
        })
        .catch((err) => {
          console.log("이벤트 원본데이터 get 실패", err);
          router.push("/404");
        });
    };
    getPost();
  }, [url]);
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
  // 글 수정 서버 요청
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
        console.log(key, values[key]);
        fd.append(`${key}`, values[key]);
      }
    }
    // 서버에 보내기
    const jwt = localStorage.getItem("jwt");
    await axios
      .put(url, fd, {
        headers: {
          authorization: jwt,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log("이벤트 수정 성공", res.data);
        router.push(`/event/${eventId}`);
      })
      .catch((err) => {
        toast.error("이벤트 수정 실패!", {
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
              <span className={cn(cs.star)}>* </span>제목
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            <input
              className={cn(cs.input)}
              name="title"
              id="title"
              value={values.title}
              onChange={handleInputChange}
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
              value={DateTimeForm(values.start_at)}
              required
            ></input>
            {"  "}~{"  "}
            <input
              id="end_at"
              name="end_at"
              type="datetime-local"
              onChange={handleInputChange}
              value={DateTimeForm(values.end_at)}
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
              id="context"
              name="context"
              value={values.context}
              onChange={handleInputChange}
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
export default EventUpdateForm;
