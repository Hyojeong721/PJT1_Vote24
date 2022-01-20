import React, { useEffect, useState } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { postList } from "../data/Postdata";
import axios from "axios";

const PostList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    // await axios.get();
    setDataList(postList);
  }, []);

  return (
    <div>
      <Table headersName={["글번호", "제목", "등록일", "조회수"]}>
        {dataList
          ? dataList.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableColumn>{item.no}</TableColumn>
                  <TableColumn>
                    {/* <link to={`/noticeDetail/${item.no}`}>{item.title}</link> */}
                    {item.title}
                  </TableColumn>
                  <TableColumn>{item.createDate}</TableColumn>
                  <TableColumn>{item.readCount}</TableColumn>
                </TableRow>
              );
            })
          : ""}
      </Table>
    </div>
  );
};

export default PostList;
