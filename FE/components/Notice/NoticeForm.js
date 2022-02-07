import { useState } from "react";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/noticecreate.module.css";

const NoticeForm = ({ url }) => {
  const [values, setValues] = useState({
    title: "",
    context: "",
    fixed: "0",
    imgFile: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.title == "") {
      alert("제목을 입력하세요.");
    } else if (values.context == "") {
      alert("내용을 입력하세요.");
    } else {
      console.log("success");
      // 보낼 데이터들을 fromdata에 담아
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
      // 서버에 보내기
      await axios
        .post(url, fd, {
          headers: {
            authorization: jwt,
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((res) => {
          // toast("공지사항 등록 성공!");
          console.log(res.data);
          console.log(res.data.id);
          // return window.location.replace(`/notice/${res.data.id}`);
        })
        .catch((err) => {
          toast.error("공지사항 등록 실패!");
          console.log(err);
        });
    }
  };

  const handleCheckChange = () => {
    if (document.getElementById("input_check").checked) {
      handleChange("fixed", "1");
    } else {
      handleChange("fixed", "0");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn(cs.noticeCreate)}>
      <div>
        <p>
          <label className="form-label">
            <input
              type="checkbox"
              name="fixed"
              value="1"
              id="input_check"
              onChange={handleCheckChange}
            />
            고정공지
          </label>
        </p>
      </div>
      <div className={cn(cs.formRow, cs.formRowtop, "d-flex")}>
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

      <div className={cn(cs.btns, "d-flex")}>
        <div className={cn(cs.btn)}>
          <Link href="/notice/" passHref>
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

export default NoticeForm;
