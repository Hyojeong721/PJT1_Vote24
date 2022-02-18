import React, { useEffect, useState } from "react";
import axios from "axios";
import DateForm from "../DateForm";
import Image from "next/image";
import router from "next/router";
import Prev from "../Prev";
import Next from "../Next";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import Link from "next/link";
import { toast } from "react-toastify";

const EventDetailItem = ({ id, url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(url)
        .then((res) => {
          const data = res.data;
          setData(data);
        })
        .catch((err) => {
          console.log("이벤트 상세 get 실패", err);
          router.push("/404");
        });
    };
    if (id) {
      getPost();
    }
  }, [id, url]);

  //삭제
  const handleRemove = () => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`${url}`, {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        toast.success("이벤트 삭제 완료!", {
          autoClose: 3000,
        });
        console.log("delete성공", res);
        router.push("/event");
      })
      .catch((error) => {
        console.log("delete실패", error);
        toast.error("이벤트 삭제 실패!", {
          autoClose: 3000,
        });
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
          <div>
            <Link href={`/event/${id}/update`} passHref>
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
        <div>
          <div className={cn(ct.contentInfo)}>
            <span className={cn(ct.item)}>이벤트 기간 : </span>
            <span className={cn(ct.item)}> : </span>
            <span className={cn(ct.item)}>
              {DateForm(data.start_at)} ~ {DateForm(data.end_at)}
            </span>
          </div>
        </div>
      </div>
      <div name="내용" className={(cn(ct.contentBody), "m-3")}>
        <div className="d-flex justify-content-center">
          {data.attachment && (
            <Image
              src={data.image}
              alt={data.attachment}
              width="800px"
              height="800px"
              objectFit="contain"
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
        <Link href="/event">
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

export default EventDetailItem;
