import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import router from "next/router";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";

const NoticeUpdateForm = ({ noticeId, url }) => {
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
          console.log("병원공지 get error", error);
          toast.error("병원 공지사항을 가져오는데 실패했습니다.");
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

  // 고정 체크 박스 수정
  const handlefixed = (e) => {
    handleChange("fixed", e.target.value);
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
          fd.append("notice_img", imgFile);
          fd.append("attachment", imgName);
        }
      } else {
        if (key != "attachment") {
          fd.append(key, values[key]);
        }
      }
    }

    const jwt = localStorage.getItem("jwt");
    await axios
      .put(url, fd, {
        headers: {
          authorization: jwt,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast.success("병원 공지사항 수정 성공!", { autoClose: 3000 });
        router.push(`/notice/${noticeId}`);
      })
      .catch((err) => {
        toast.error("병원 공지 수정 실패!", {
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
              <span className={cn(cs.star)}>*{"  "}</span>
              <span>제목</span>
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            <input
              className={cn(cs.input)}
              name="title"
              onChange={handleInputChange}
              id="title"
              defaultValue={values.title}
              required
            ></input>
          </div>
        </div>

        <div name="체크박스" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <span className={cn(cs.star)}>*{"  "}</span>
            <span>TYPE</span>
          </div>
          <div className={cn(cs.formControl)}>
            <span className="form-label me-3">
              <input
                id="fixed"
                type="radio"
                name="fixed"
                defaultValue={1}
                checked={values.fixed == 1}
                onChange={handlefixed}
              />
              <span>{"  "} </span>
              <label htmlFor="fixed">고정공지</label>
            </span>
            <input
              id="no_fixed"
              type="radio"
              name="fixed"
              defaultValue={0}
              checked={values.fixed == 0}
              onChange={handlefixed}
            />
            <span>{"  "} </span>
            <label htmlFor="no_fixed">일반공지</label>
          </div>
        </div>

        <div name="내용" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="context">
              <span className={cn(cs.star)}>*{"  "}</span>
              <span>내용</span>
            </label>
          </div>

          <div className={cn(cs.formControl)}>
            <textarea
              className={cn(cs.textarea)}
              name="context"
              defaultValue={values.context}
              onChange={handleInputChange}
              id="context"
              rows="20"
              required
            ></textarea>
          </div>
        </div>

        <div name="첨부파일" className={cn(cs.formRow)}>
          <div className={cn(cs.formRow, "d-flex")}>
            <div className={cn(cs.formLabel)}>
              <label htmlFor="formFile" className="form-label">
                첨부파일
              </label>
            </div>
            <div className={cn(cs.formControl)}>
              {values.attachment != null ? (
                <div>
                  <span>{values.attachment}</span>
                  <button className={cn(cs.delete)} onClick={handleClearClick}>
                    삭제
                  </button>
                </div>
              ) : (
                <input
                  className="form-control"
                  type="file"
                  name="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleChangeFile}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div name="취소등록버튼" className={cn(cs.btns, "d-flex")}>
        <div className={cn(cs.btn)}>
          <Link href={`/notice/${noticeId}`} passHref>
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

export default NoticeUpdateForm;
