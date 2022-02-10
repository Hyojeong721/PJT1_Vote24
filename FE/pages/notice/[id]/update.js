import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../../../components/Header";
import NoticeUpdateForm from "../../../components/Notice/NoticeUpdateForm";

function NoticeUpdate() {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { userInfo } = useSelector((state) => state.userStatus);
  const noticeId = router.query.id;
  const hospitalId = userInfo.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospitalId}/${noticeId}`;

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`${NOTICE_DETAIL_URL}`)
        .then((res) => {
          const data = res.data;
          setData(data);
        })
        .catch((e) => {
          console.log("update_data_get_error", e);
        });
    };
    getPost();
  }, []);

  return (
    <div>
      <Header title="병원 공지사항 수정"></Header>
      <div className="container">
        <NoticeUpdateForm url={NOTICE_DETAIL_URL} data={data} />
      </div>
    </div>
  );
}

export default NoticeUpdate;
