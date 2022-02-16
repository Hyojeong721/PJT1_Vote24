import { useState, useEffect, useRef } from "react";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import router from "next/router";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";

const ServiceNoticeUpdateForm = ({ noticeId, url }) => {
  const [values, setValues] = useState([]);
  const router = useRouter();
  const inputRef = useRef(values.image);

  // 기존 data 가져오기
  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(url)
        .then((res) => {
          setValues(res.data);
        })
        .catch((err) => {
          console.log("서비스공지 원본data get 실패", err);
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
        } else if (values[key] == "null") {
          fd.append("notice_img", "null");
          fd.append("attachment", "null");
        } else {
          fd.append("notice_img", "null");
          fd.append("attachment", "null");
        }
      } else {
        if (key != "attachment") {
          fd.append(`${key}`, values[key]);
        }
      }
    }
    fd.append("hospital_id", 24);

    // formData 안에 값들 확인할 때
    for (let value of fd.values()) {
      console.log("form값들", value);
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
        console.log("서비스공지 수정", res.data);
        if (res.data.id) {
          router.push(`/service/notice/${res.data.id}`);
        } else {
          toast.error("then넘어온 수정 실패!", {
            autoClose: 3000,
          });
          // router.push("/404");
        }
      })
      .catch((err) => {
        toast.error("서비스공지 수정 실패!", {
          autoClose: 3000,
        });
        console.log(err);
        // router.push("/404");
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
              onChange={handleInputChange}
              id="title"
              defaultValue={values.title}
              required
            ></input>
          </div>
        </div>

        <div name="체크박스" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <span className={cn(cs.star)}>*{"  "}</span>TYPE
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
              {"  "} <label htmlFor="fixed">고정공지</label>
            </span>
            <input
              id="no_fixed"
              type="radio"
              name="fixed"
              defaultValue={0}
              checked={values.fixed == 0}
              onChange={handlefixed}
            />
            {"  "}
            <label htmlFor="no_fixed">일반공지</label>
          </div>
        </div>

        <div name="내용" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="context">
              <span className={cn(cs.star)}>*{"  "}</span>내용
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

        <div name="첨부파일" className={cn(cs.formRow, "d-flex")}>
          <div className={cn(cs.formLabel)}>
            <label htmlFor="formFile" className="form-label">
              첨부파일
            </label>
          </div>
          <div className={cn(cs.formControl)}>
            {values.image ? (
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

      <div name="취소등록버튼" className={cn(cs.btns, "d-flex")}>
        <div className={cn(cs.btn)}>
          <Link href={`/service/notice/${noticeId}`} passHref>
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

export default ServiceNoticeUpdateForm;
