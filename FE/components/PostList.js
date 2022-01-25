import React, { useEffect, useState } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import axios from "axios";
import Link from "next/link";

const PostList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(
        `http://teama205.iptime.org/api/notice/947780`
      );
      const data = res.data;
      console.log(data);
      setDataList(data);
    };
    getList();
  }, []);

  return (
    <div>
      <Table headersName={["글번호", "제목", "등록일", "조회수"]}>
        {dataList
          ? dataList.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>
                    <Link href={`/notice/${item.id}`}>{item.title}</Link>
                  </TableColumn>
                  <TableColumn>{item.created_at}</TableColumn>
                  <TableColumn>{item.views}</TableColumn>
                </TableRow>
              );
            })
          : ""}
      </Table>
    </div>
  );
};

export default PostList;
