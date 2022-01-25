import React from "react";
import DateForm from "./DateForm";
import Table from "./Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Link from "next/link";

const EventList = ({ dataList }) => {
  return (
    <div>
      <Table headersName={["글번호", "생성일", "제목", "기한", "조회수"]}>
        {dataList
          ? dataList.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>{DateForm(item.created_at)}</TableColumn>
                  <TableColumn>
                    <Link href={`/event/${item.id}`}>{item.title}</Link>
                  </TableColumn>
                  <TableColumn>
                    {DateForm(item.start_at)} ~ {DateForm(item.end_at)}
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
