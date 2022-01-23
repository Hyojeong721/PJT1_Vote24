import { useState } from "react";
import FileInput from "./EventFileInput";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EVENT_URL = "https://teama205.iptime.org/api/event/947780";

function EventForm() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    imgFile: null,
  });

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
        const imgFile = values[key];
        const imgName = imgFile.name;
        fd.append("img_file", imgFile);
        fd.append("img_name", imgName);
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
      })
      .then((res) => {
        toast("이벤트 등록 성공!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("이벤트 등록 실패!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
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
        <div class="mb-3">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            name="content"
            value={values.content}
            onChange={handleInputChange}
            id="content"
            rows="3"
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
      <ToastContainer position="top-right" />
    </div>
  );
}

export default EventForm;
