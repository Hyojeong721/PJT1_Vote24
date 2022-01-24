import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PostDetail = () => {
  const [postdata, setPostData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  const getPost = async () => {
    const res = await axios.get(
      `http://teama205.iptime.org/api/notice/947780/${id}`
    );
    console.log(res);
    const data = res.data;
    console.log(data);
    setPostData(data);
  };
  getPost();

  return (
    <div>
      Post id
      {postdata}
    </div>
  );
}

export default PostDetail;
