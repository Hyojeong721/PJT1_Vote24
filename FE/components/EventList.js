import React from "react";

import Table from "./Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Link from "next/link";

const EventList = ({ dataList }) => {
  // 날짜 형식 바꾸는 코드
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  return (
    <div>
      <Table headersName={["글번호", "생성일", "제목", "기한", "조회수"]}>
        {dataList
          ? dataList.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>{formatDate(item.created_at)}</TableColumn>
                  <TableColumn>
                    <Link href={`/notice/${item.id}`}>{item.title}</Link>
                  </TableColumn>
                  <TableColumn>
                    {formatDate(item.start_at)} ~ {formatDate(item.end_at)}
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

export default EventList;
