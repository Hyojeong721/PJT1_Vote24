import { useState, useEffect } from "react";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/postcreate.module.css";

const NoticeUpdateForm = ({ noticeId, url }) => {
  const [values, setValues] = useState([]);
  const router = useRouter();
  // 기존 data 가져오기
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${url}/`);
      const data = res.data;
      setValues(data);
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

  // 글 수정 서버 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.title == "") {
      alert("제목을 입력하세요.");
    } else if (values.context == "") {
      alert("내용을 입력하세요.");
    } else {
      console.log("수정 성공");
      const fd = new FormData();
      for (let key in values) {
        if (key === "imgFile") {
          if (values[key] != null) {
            const imgFile = values[key];
            const imgName = imgFile.name;
            fd.append("notice_image", imgFile);
            fd.append("attachment", imgName);
          }
        } else {
          fd.append(`${key}`, values[key]);
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
          console.log("병원공지 수정 성공", res.data);
          router.push(`/notice/${noticeId}`);
        })
        .catch((err) => {
          toast.error("병원공지 수정 실패!", {
            autoClose: 3000,
          });
          console.log(err);
        });
    }
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
              value={values.title}
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
              value={values.context}
              onChange={handleInputChange}
              id="context"
            ></textarea>
          </div>
        </div>

        <div name="첨부파일" className={cn(cs.formRow)}>
          <FileInput
            name="imgFile"
            value={values.imgFile}
            onChange={handleChange}
          ></FileInput>
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
            등록
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoticeUpdateForm;
