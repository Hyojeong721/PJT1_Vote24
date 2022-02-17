import { useState, useEffect, useRef } from "react";
import router from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";
import { getPrevDate, getNextDate } from "../getDate";

const EventUpdateForm = ({ eventId, url }) => {
  const [values, setValues] = useState([]);
  const inputRef = useRef(values.image);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(url)
        .then((res) => {
          res.data.del = 0;
          setValues(res.data);
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

  //첨부파일
  const handleChangeFile = (e) => {
    const nextValue = e.target.files[0];
    handleChange("imgFile", nextValue);
    handleChange("attachment", nextValue.name);
  };

  const handleClearClick = () => {
    values.attachment = null;
    values.image = null;
    handleChange("imgFile", null);
    handleChange("attachment", null);
    handleChange("del", 1);
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
      } else if (key === "created_at") {
        fd.append(`${key}`, values[key].slice(0, -5).replace("T", " "));
      } else if (key === "start_at" || key == "end_at") {
        fd.append(`${key}`, values[key].slice(0, 10));
      } else {
        if (key != "attachment") {
          fd.append(`${key}`, values[key]);
        }
      }
    }

    // 서버에 보내기
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.reload();
    }

    await axios
      .put(url, fd, {
        headers: {
          authorization: jwt,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast.success("이벤트 수정 성공!", { autoClose: 3000 });
        router.push(`/event/${eventId}`);
      })
      .catch((err) => {
        toast.error("이벤트 수정 실패!", { autoClose: 3000 });
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div name="form" className={cn(cs.form)}>
        <div name="제목" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="title">
              <span className={cn(cs.star)}>* </span>
              <span>제목</span>
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            <input
              className={cn(cs.input)}
              name="title"
              id="title"
              defaultValue={values.title}
              onChange={handleInputChange}
              required
            ></input>
          </div>
        </div>
        <div className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="start_at">
              <span className={cn(cs.star)}>*{"  "}</span>
              <span>시작일</span>
            </label>{" "}
            ~ <label htmlFor="end_at">마감일</label>
          </div>
          <div className={cn(cs.formControl)}>
            <input
              id="start_at"
              name="start_at"
              type="date"
              onChange={handleInputChange}
              value={
                values.start_at ? values.start_at.slice(0, 10) : "2022-01-01"
              }
              min={new Date().toISOString().slice(0, 10)}
              max={getPrevDate(values.end_at)}
              required
            ></input>
            {"  "}~{"  "}
            <input
              id="end_at"
              name="end_at"
              type="date"
              onChange={handleInputChange}
              value={values.end_at ? values.end_at.slice(0, 10) : "2022-01-01"}
              min={getNextDate(values.start_at)}
              max={new Date(8640000000000000)}
              required
            ></input>
          </div>
        </div>
        <div className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="context">
              <span className={cn(cs.star)}>*{"  "}</span>
              <span>내용</span>
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            <textarea
              className={cn(cs.textarea)}
              id="context"
              name="context"
              defaultValue={values.context}
              onChange={handleInputChange}
              rows="20"
              required
            ></textarea>
          </div>
        </div>
        <div className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="formFile" className="form-label">
              첨부파일
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            {values.attachment != null ? (
              <div>
                {values.attachment}
                <button className={cn(cs.delete)} onClick={handleClearClick}>
                  삭제
                </button>
              </div>
            ) : (
              <input
                className="form-control"
                type="file"
                name="file"
                ref={inputRef}
                onChange={handleChangeFile}
              />
            )}
          </div>
        </div>
      </div>
      <div className={cn(cs.btns, "d-flex")}>
        <div className={cn(cs.btn)}>
          <Link href={`/event`} passHref>
            <button className="btn btn-secondary">취소</button>
          </Link>
        </div>
        <div className={cn(cs.btn)}>
          <button type="submit" className="btn btn-primary">
            수정
          </button>
        </div>
      </div>
    </form>
  );
};
export default EventUpdateForm;
