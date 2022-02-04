import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import DateForm from "../DateForm";
import Prev from "../Prev";
import Next from "../Next";
import cn from "classnames";
import content from "../../styles/detail.module.css";
import Link from "next/link";

const NoticeDetailItem = () => {
  const [data, setData] = useState([]);

  // 게시글 id 찾기
  const router = useRouter();
  const { id } = router.query;

  // 데이터 보내는 서버 url 작성
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}/${id}`;

  useEffect(() => {
    // 게시글 내용 받아오기
    const getPost = async () => {
      const res = await axios.get(NOTICE_DETAIL_URL);
      const data = res.data;
      console.log(data);
      setData(data);
    };
    if (id) {
      getPost();
    }
  }, [id, NOTICE_DETAIL_URL]);

  return (
    <div className={cn(content.content)}>
      <div className={cn(content.contentHeader)}>
        <h2 className={cn(content.title)}>
          <div>{data.title}</div>
        </h2>

        <div className={cn(content.contentInfo)}>
          <span className={cn(content.item)}>관리자</span>
          <span className={cn(content.item)}> | </span>
          <span className={cn(content.item)}>{DateForm(data.created_at)}</span>
          <span className={cn(content.item)}> | </span>
          <span className={cn(content.item)}>조회수 : {data.views} </span>
        </div>
      </div>
      <div className={cn(content.contentBody)}>
        <div>{data.attachment}</div>
        <div>{data.image}</div>
        <div>{data.context}</div>
      </div>
      <div>
        <Link href="/notice">
          <button
            type="button"
            className={cn(content.contenBtnList, "btn btn-primary btn-round")}
          >
            목록
          </button>
        </Link>
      </div>
      <ul className={cn(content.contentNav)}>
        <Prev id={data.prev_id} title={data.prev_title}></Prev>
        <Next id={data.next_id} title={data.next_title}></Next>
      </ul>
    </div>
  );
};

export default NoticeDetailItem;
