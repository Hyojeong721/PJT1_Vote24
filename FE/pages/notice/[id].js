import React from "react";
import Header from "../../components/Header";
import PostList from "../../components/PostList";

function NoticeHospital() {
  return (
    <div>
      <Header title="병원 공지사항"></Header>
      <div className="container">
        <PostList></PostList>
      </div>
    </div>
  );
}

export default NoticeHospital;

export async function getServerSideProps(context) {
  const id = context.params.id;
  console.log("here");
  console.log(context);
  // const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  // const res = await axios.get(apiUrl);
  // const data = res.data;

  // return {
  //   props: {
  //     item: data,
  //   },
  // };
}
