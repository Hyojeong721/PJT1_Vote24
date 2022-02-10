import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import DateForm from "../DateForm";
import Prev from "../Prev";
import Next from "../Next";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import Link from "next/link";

const NoticeDetailItem = ({ url }) => {
  const [data, setData] = useState([]);
  // 게시글 id 찾기
  const router = useRouter();
  const { id } = router.query;
  // 게시글 내용 받아오기
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${url}/${id}`);
      const data = res.data;
      console.log(data);
      setData(data);
    };
    if (id) {
      getPost();
    }
  }, [id, url]);
  //삭제
  const handleRemove = () => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`${url}/${id}`, {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        console.log("delete성공", res);
        router.push("/notice");
      })
      .catch((error) => {
        console.log("delete실패", error);
      });
  };
  return (
    <div className={cn(ct.content)}>
      <div className={cn(ct.contentHeader)}>
        <h2 className={cn(ct.title)}>
          <div>{data.title}</div>
        </h2>

        <div className={cn(ct.contentInfo, "d-flex justify-content-between")}>
          <div>
            <span className={cn(ct.item)}>관리자</span>
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>{DateForm(data.created_at)}</span>
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>조회수 : {data.views} </span>
          </div>

          <div>
            <Link href={`/notice/${id}/update`} passHref>
              <a className={cn(ct.btn, "btn btn-primary")}>수정</a>
            </Link>
            <button
              onClick={handleRemove}
              className={cn(ct.btn, "btn btn-danger")}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className={cn(ct.contentBody)}>
        <div>
          {data.attachment && (
            <Image
              src={data.image}
              alt={data.attachment}
              width="800px"
              height="800px"
              priority
            ></Image>
          )}
        </div>
        <div>{data.context}</div>
      </div>
      <div>
        <Link href="/notice">
          <button
            type="button"
            className={cn(ct.contenBtnList, "btn btn-primary btn-round")}
          >
            목록
          </button>
        </Link>
      </div>
      <ul className={cn(ct.contentNav)}>
        <Prev id={data.prev_id} title={data.prev_title}></Prev>
        <Next id={data.next_id} title={data.next_title}></Next>
      </ul>
    </div>
  );
};

export default NoticeDetailItem;
