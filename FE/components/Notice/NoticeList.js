import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import axios from "axios";
import Link from "next/link";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";
import PagingFixed from "../../components/PagingFixed";
import router from "next/router";

const NoticeList = ({ url, createUrl }) => {
  const [dataList, setDataList] = useState([]);

  // 페이징 처리를 위한
  const [fixed, setFixed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // 체크박스를 위한
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);

  const headersName = ["번호", "제목", "생성일", "조회수"];

  useEffect(() => {
    const getList = async () => {
      await axios
        .get(url)
        .then((res) => {
          setDataList(res.data);
          console.log("공지목록", res.data);
          setFixed(res.data.filter((data) => data.fixed == 1));
          console.log(
            "fixed data",
            res.data.filter((data) => data.fixed == 1)
          );
          let ids = [];
          {
            res.data &&
              res.data.slice(0, postsPerPage).map((item, i) => {
                ids[i] = item.id;
              });
          }
          setIdList(ids);
        })
        .catch((err) => {
          console.log("병원 공지 목록 get 실패", err);
          router.push("/404");
        });
    };
    getList();
  }, [url]);

  // 페이징 처리를 위한 계산
  if (dataList.length) {
    const fixedCnt = fixed.length;
    const indexOfLastPost = currentPage * (postsPerPage - fixedCnt) + fixedCnt;
    const indexOfFirstPost = indexOfLastPost - postsPerPage + fixedCnt;
    const currentPosts = [
      ...dataList.slice(0, fixedCnt),
      ...dataList.slice(indexOfFirstPost, indexOfLastPost),
    ];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  }
  // 전체 선택/해제
  const onChangeAll = (e) => {
    setCheckList(e.target.checked ? idList : []);
  };

  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  // 선택 삭제
  const jwt = localStorage.getItem("jwt");
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((noticeId) => {
        axios
          .delete(`${url}/${noticeId}`, {
            headers: {
              authorization: jwt,
            },
          })
          .then((response) => {
            console.log(response);
            router.push("/notice");
          })
          .catch((error) => {
            console.log("삭제에러", error);
          });
        // list 재구성 = 삭제된애들 빼고 나머지 넣기
        setIdList(dataList.filter((data) => data.id !== noticeId));
        setDataList((dataList) =>
          dataList.filter((data) => data.id !== noticeId)
        );
      });
    } else {
      return alert("삭제할 목록을 선택하세요.");
    }
  };

  return (
    <div>
      <div className={cn(listbtn.btns)}>
        <div>설문</div>
        <div>
          <Link href={createUrl} passHref>
            <button className={cn(listbtn.createbtn, "btn btn-primary")}>
              글쓰기
            </button>
          </Link>

          <button
            className={cn(listbtn.deletebtn, "btn btn-secondary")}
            onClick={handleRemove}
          >
            선택 삭제
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-column">
              <input
                type="checkbox"
                onChange={onChangeAll}
                checked={checkList.length === idList.length}
              />
            </th>
            {headersName.map((item, index) => {
              return (
                <th className="table-header-column" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentPosts
            ? currentPosts.map((item, index) => {
                return (
                  <TableRow key={item.id} id={item.id}>
                    <td className="table-column">
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeEach(e, item.id)}
                        checked={checkList.includes(item.id)}
                      ></input>
                    </td>
                    <TableColumn
                      // content={
                      //   indexlst[Math.abs(index - postsPerPage) - 1] -
                      //   fixedCnt +
                      //   1
                      // }
                      // content={currentPage}
                      content={
                        index +
                        1 -
                        fixedCnt +
                        (currentPage - 1) * (postsPerPage - fixedCnt)
                      }
                      fixed={item.fixed}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.title}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={DateForm(item.created_at)}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                    <TableColumn
                      content={item.views}
                      url={`notice/${item.id}`}
                    ></TableColumn>
                  </TableRow>
                );
              })
            : ""}
        </tbody>
      </table>
      <PagingFixed
        postsPerPage={postsPerPage}
        totalPosts={dataList.length}
        paginate={paginate}
        fixedCnt={fixedCnt}
      />
    </div>
  );
};

export default NoticeList;
