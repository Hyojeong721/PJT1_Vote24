import React, { useEffect, useState } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import axios from "axios";
import Link from "next/link";

const EventList = () => {
  const [dataList, setDataList] = useState([]);

  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_URL = `http://teama205.iptime.org/api/event/${hospital_id}`;

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(EVENT_URL);
      const data = res.data;
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

export default EventList;
