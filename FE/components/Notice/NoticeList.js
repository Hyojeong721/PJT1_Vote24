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
import SearchBar from "../SearchBar";
import { toast } from "react-toastify";

const NoticeList = ({ url, createUrl }) => {
  const [dataList, setDataList] = useState([]);
  const [dataListProp, setDataListProp] = useState([]);

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
          setDataListProp(res.data);
          setFixed(res.data.filter((data) => data.fixed == 1));

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
          toast.error("병원 공지 목록을 가져오는 데 실패했습니다.");
          router.push("/404");
        });
    };
    getList();
  }, [url]);

  // 페이징 처리를 위한 계산
  if (dataList.length) {
    const fixedCnt = fixed.length;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
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
            router.push("/notice");
          })
          .catch((error) => {
            console.log("삭제에러", error);
            toast.error("삭제에 실패하였습니다.");
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
      <div name="상단 버튼" className={cn(listbtn.btns)}>
        <div>
          <SearchBar setPostList={setDataList} postListProp={dataListProp} />
        </div>
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
                  <TableRow key={index} id={item.id}>
                    <td className="table-column">
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeEach(e, item.id)}
                        checked={checkList.includes(item.id)}
                      ></input>
                    </td>
                    <TableColumn
                      content={
                        index +
                        1 +
                        (postsPerPage - fixedCnt) +
                        (currentPage - 2) * postsPerPage
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
