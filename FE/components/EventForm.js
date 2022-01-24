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

  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_URL = `http://teama205.iptime.org/api/event/${hospital_id}`;

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    // 기본 submit기능인 페이지이동기능을 막아준다. = preventDefault();
    e.preventDefault();
    console.log({ values });

    // const onSubmit = async (values) => {
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

    for (let value of fd.values()) {
      console.log(value);
    }

    await axios
      .post(EVENT_URL, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
        // params: { "hospital_id": '947780' },
      })
      .then((res) => {
        toast("이벤트 등록 성공!");
        console.log(res.data);
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
          <button type="submit" className="btn btn-primary">
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
