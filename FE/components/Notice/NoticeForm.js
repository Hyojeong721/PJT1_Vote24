import { useState } from "react";
import { useSelector } from "react-redux";
import FileInput from "../FileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import cs from "../../styles/noticecreate.module.css";

const NoticeForm = () => {
  const [values, setValues] = useState({
    title: "",
    context: "",
    fixed: "0",
    imgFile: null,
  });

  // 데이터 보내는 서버 url 작성
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}`;

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

  // 작성완료 눌렀을때 서버에 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 보낼 데이터들을 fromdata에 담는 과정
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
        console.log(key, values[key]);
        fd.append(`${key}`, values[key]);
      }
    }

    // formData 안에 값들 확인할 때
    for (let value of fd.values()) {
      console.log(value);
    }

    // 서버에 보내기
    await axios
      .post(NOTICE_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast("공지사항 등록 성공!");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("공지사항 등록 실패!");
        console.log(err);
      });
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
          <label htmlFor="title">제목</label>
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
          <label htmlFor="context">내용</label>
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
