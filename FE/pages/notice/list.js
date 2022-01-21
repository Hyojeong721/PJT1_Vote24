import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const About = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(
        `http://teama205.iptime.org/api/event/947780`
      );
      const data = res.data;
      console.log(data);
      setList(data);
    };
    getList();
  }, []);

  return (
    <div>
      <Header title="병원 공지사항"></Header>
      <div className="container">
        {list.length &&
          list.slice(0, 10).map((item) => <li key={item.id}>{item.title}</li>)}
      </div>
    </div>
  );
};

export default About;
