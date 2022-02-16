import React, { useState, useEffect } from "react";
import DateForm from "../DateForm";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import SearchBar from "../SearchBar";
import axios from "axios";
import Vote24NoticeBtn from "./Vote24NoticeBtn";
import router from "next/router";
import { toast } from "react-toastify";
import PagingFixed from "../../components/PagingFixed";

const ServiceNoticeList = ({ hospital_id, url }) => {
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
  const jwt = localStorage.getItem("jwt");

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
              res.data.map((item, i) => {
                ids[i] = item.id;
              });
          }
          setIdList(ids);
        })
        .catch((err) => {
          toast.error("서비스 공지 목록을 가져오는 데 실패했습니다.");
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
    setCheckList(e.target.checked ? currentPosts.map((post) => post.id) : []);
  };

  const onChangeEach = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((checkedId) => checkedId !== id));
    }
  };

  // 선택 삭제
  const handleRemove = () => {
    if (checkList.length) {
      checkList.map((noticeId) => {
        axios
          .delete(`${url}/${noticeId}`, {
            headers: {
              authorization: jwt,
            },
            data: {
              hospital_id: hospital_id,
            },
          })
          .then((response) => {
            toast.success("서비스 공지 삭제 성공!");
          })
          .catch((error) => {
            console.log("삭제에러", error);
            toast.error("서비스 공지 삭제 실패!");
          });

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
      <div className="d-flex justify-content-between align-items-center">
        <SearchBar setPostList={setDataList} postListProp={dataListProp} />
        <Vote24NoticeBtn userId={hospital_id} handleRemove={handleRemove} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-column">
              <input
                type="checkbox"
                onChange={onChangeAll}
                checked={
                  (currentPosts && checkList.length === currentPosts.length) ||
                  ""
                }
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
          {currentPosts ? (
            currentPosts.map((item, index) => {
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
                    content={index + 1 + (currentPage - 1) * postsPerPage}
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
          ) : (
            <tr></tr>
          )}
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

export default ServiceNoticeList;
