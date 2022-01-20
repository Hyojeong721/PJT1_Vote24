import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPostByNo } from "../data/Postdata";

const NoticeDetail = ({ history, location, match }) => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { noticeId } = router.params;

  useEffect(() => {
    setData(getPostByNo(noticeId));
  }, []);

  return (
    <div>
      <div className="post-view-wrapper">
        {data ? (
          <div>
            <div className="post-view-row">
              <label>게시글 번호</label>
              <label>{data.no}</label>
            </div>
            <div className="post-view-row">
              <label>제목</label>
              <label>{data.title}</label>
            </div>
            <div className="post-view-row">
              <label>작성일</label>
              <label>{data.createData}</label>
            </div>
            <div className="post-view-row">
              <label>내용</label>
              <div>{data.content}</div>
            </div>
          </div>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
        <button
          className="post-view-go-list-btn"
          onClick={() => history.goBack()}
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;
