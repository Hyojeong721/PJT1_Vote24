import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import DateForm from "../DateForm";

const NoticeDetailItem = () => {
  const [data, setData] = useState([]);
  // 게시글 id 찾기
  const router = useRouter();
  const { id } = router.query;

  // 데이터 보내는 서버 url 작성
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}/${id}`;
  //   const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/1/${id}`;

  useEffect(() => {
    // 게시글 내용 받아오기
    const getPost = async () => {
      const res = await axios.get(NOTICE_DETAIL_URL);
      const data = res.data[0];
      console.log("data", data);
      setData(data);
    };
    getPost();
  }, []);

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h2 className="detail-title">
          <div>제목 : {data.title}</div>
        </h2>
        <hr></hr>
        <div className="detail-info">
          <p>
            작성자 : 관리자 | 작성일 : {DateForm(data.created_at)} | 조회수 :{" "}
            {data.views}
          </p>
        </div>
      </div>
      <div className="post-detail-body">
        <div>
          {/* 수정사항 첨부파일 있을때만 보이게 만들기  */}
          {/* <div className="detail-file">첨부파일
          {data.event_img}</div> */}
        </div>
        <hr></hr>
        <div className="detail-context">내용 : {data.context}</div>
      </div>
      <hr></hr>
    </div>
  );
};

export default NoticeDetailItem;
