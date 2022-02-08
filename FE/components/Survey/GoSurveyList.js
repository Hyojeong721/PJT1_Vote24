import Link from "next/link";
import cn from "classnames";
import ct from "../../styles/detail.module.css";

const GoSurveyList = ({ url, category }) => {
  console.log("category", category);
  if (category == 0) {
    return (
      <div>
        <div>
          <Link href={`${url}/health`}>
            <a
              type="button"
              className={cn(ct.contenBtnList, "btn btn-primary")}
            >
              목록
            </a>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Link href={`${url}/service`}>
            <a
              type="button"
              className={cn(ct.contenBtnList, "btn btn-primary")}
            >
              목록
            </a>
          </Link>
        </div>
      </div>
    );
  }
};

export default GoSurveyList;
