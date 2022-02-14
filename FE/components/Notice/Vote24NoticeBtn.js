import Link from "next/link";
import cn from "classnames";
import listbtn from "../../styles/listbtn.module.css";

const CREATE_URL = "service/notice/create";

const Vote24NoticeBtn = ({ userId, handleRemove }) => {
  if (userId == 0) {
    return (
      <div className={cn(listbtn.btns)}>
        <div></div>
        <div>
          <Link href={CREATE_URL} passHref>
            <button className={cn(listbtn.createbtn, "btn btn-primary")}>
              공지 작성
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
    );
  } else {
    return <div className={cn(listbtn.nonbtn)}></div>;
  }
};

export default Vote24NoticeBtn;
