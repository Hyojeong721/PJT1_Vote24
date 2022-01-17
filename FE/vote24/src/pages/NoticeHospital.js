import Table from "../components/Table";
import Title from "../components/Title";

function NoticeHospital() {
  return (
    <div>
      <Title>병원 공지사항</Title>
      <div className="container"></div>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}

export default NoticeHospital;
