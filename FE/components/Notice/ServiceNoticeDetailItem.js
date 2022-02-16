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

const ServiceNoticeDetailItem = ({ url, userId }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const nId = router.query.id;

  console.log("userid", userId);
  // 게시글 내용 받아오기
  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`${url}/${nId}`)
        .then((res) => {
          console.log("서비스공지get 성공", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log("공지 상세 get 실패", err);
          router.push("/404");
        });
    };
    if (nId) {
      getPost();
    }
  }, [nId, url]);
  //삭제
  const handleRemove = () => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`${url}/${nId}`, {
        headers: {
          authorization: jwt,
        },
        data: { hospital_id: userId },
      })
      .then((res) => {
        console.log("delete성공", res);
        router.push("/service/notice");
      })
      .catch((error) => {
        console.log("delete실패", error);
      });
  };

  const vote24btn = () => {
    if (userId == 24) {
      return (
        <div name="수정/삭제">
          <Link href={`/service/notice/${nId}/update`} passHref>
            <a className={cn(ct.btn, "btn btn-primary")}>수정</a>
          </Link>
          <button
            onClick={handleRemove}
            className={cn(ct.btn, "btn btn-danger")}
          >
            삭제
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className={cn(ct.content)}>
      <div className={cn(ct.contentHeader)}>
        <h2 className={cn(ct.title)}>
          <div>{data.title}</div>
        </h2>

        <div className={cn(ct.contentInfo, "d-flex justify-content-between")}>
          <div>
            <span className={cn(ct.item)}>Vote24</span>
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>
              작성 : {DateForm(data.created_at)}
            </span>

            {data.updated_at && (
              <span className={cn(ct.item)}>
                수정 : {DateForm(data.updated_at)}
              </span>
            )}
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>조회수 : {data.views} </span>
          </div>

          {/* <div name="수정/삭제">
            <Link href={`/service/notice/${id}/update`} passHref>
              <a className={cn(ct.btn, "btn btn-primary")}>수정</a>
            </Link>
            <button
              onClick={handleRemove}
              className={cn(ct.btn, "btn btn-danger")}
            >
              삭제
            </button>
          </div> */}

          {vote24btn()}
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
        <div>
          {data.context &&
            data.context.split("\n").map((line, idx) => {
              return (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              );
            })}
        </div>
      </div>
      <div>
        <Link href="/service/notice">
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

export default ServiceNoticeDetailItem;
