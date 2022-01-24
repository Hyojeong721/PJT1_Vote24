import { useState } from "react";
import { useSelector } from "react-redux";
import FileInput from "./EventFileInput";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

const EventForm = () => {
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
  //   const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/1`;

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
          fd.append("event_img", imgFile);
          fd.append("attachment", imgName);
        }
      } else {
        console.log(key, values[key]);
        fd.append(`${key}`, values[key]);
      }
    }

    // // formData 안에 값들 확인할 때
    // for (let value of fd.values()) {
    //   console.log(value);
    // }

    // 서버에 보내기
    await axios
      .post(EVENT_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        toast("이벤트 등록 성공!");
        console.log(res.data);
        post_id = res.data.id;
      })
      .catch((err) => {
        toast.error("이벤트 등록 실패!");
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            className="form-control"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            id="title"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="start_at">시작일</label>
          <input
            id="start_at"
            name="start_at"
            type="date"
            onChange={handleInputChange}
            value={values.start_at}
          ></input>

          <label htmlFor="end_at">마감일</label>
          <input
            id="end_at"
            name="end_at"
            type="date"
            onChange={handleInputChange}
            value={values.end_at}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="context" className="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            name="context"
            value={values.context}
            onChange={handleInputChange}
            id="context"
            rows="5"
          ></textarea>
        </div>

        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        ></FileInput>

        <div>
          <Link href="/event/">
            <button className="btn btn-secondary">취소</button>
          </Link>

          <button type="submit" className="btn btn-secondary">
            작성완료
          </button>

          {/* <button type="submit" className="btn btn-primary">
            작성 완료
          </button>
          <Link href={`${EVENT_URL}/${post_id}`}></Link> */}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
