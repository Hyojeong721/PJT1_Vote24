import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EVENT_URL = "http://teama205.iptime.org/api/event/947780"

const EventDetailItem = () => {
    const [data, setData] = useState([]);
    
    
    useEffect (() => {
        const router = useRouter();
        const { id } = router.query;
        const getPost = async () => {
        const res = await axios.get(
          `${EVENT_URL}/${id}`
        );
        console.log('res', res)
        const data = res.data;
        console.log('data', data);
        setData(data);
      };
      getPost();
  }, []);  


  return (
    <div className="post-detail">
        <div className="post-detail-header">
            <h2 className="detail-title">
                <div>{data.title}</div>
            </h2>
            <div className="detail-info">
                <p>작성자 : 관리자</p>
                <p>작성일 : {data.created_at}</p>
                <p>조회수 : {data.views}</p>
            </div>
        </div>
        <div className="post-detail-body">
            <div className="detail-file">
                첨부파일
            </div>
            <div className="detail-content">
                {data.context}
            </div>
            <hr></hr>
        </div>
    </div>
  );
}

export default EventDetailItem;
