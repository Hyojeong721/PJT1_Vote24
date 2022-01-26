import React from "react";
import DateForm from "../DateForm";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableColumn from "../Table/TableColumn";
import Link from "next/link";

const NoticeList = ({ dataList }) => {
  return (
    <div>
      <Table headersName={["글번호", "생성일", "제목", "조회수"]}>
        {dataList
          ? dataList.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>{DateForm(item.created_at)}</TableColumn>
                  <TableColumn>
                    <Link href={`/notice/${item.id}`}>{item.title}</Link>
                  </TableColumn>
                  <TableColumn>{item.views}</TableColumn>
                </TableRow>
              );
            })
          : ""}
      </Table>
    </div>
  );
};

export default NoticeList;
