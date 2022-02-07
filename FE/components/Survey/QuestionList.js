import React from "react";
import Link from "next/link";
import cn from "classnames";
import ct from "../../styles/detail.module.css";

const QuestionList = ({ dataList }) => {
  console.log("dataList", dataList);

  return (
    <div>
      <div className={cn(ct.questionListResult)}>문항별 응답현황</div>
      {dataList
        ? dataList.map((item) => {
            return (
              <div className={cn(ct.questionList)} key={item.id}>
                <div className={cn(ct.question)}>
                  {item.order}. {item.context}
                </div>

                {item.option
                  ? item.option.map((opt, index) => {
                      return (
                        <div key={opt.id} className={cn(ct.option)}>
                          <div className={cn(ct.optionContext)}>
                            - {opt.context}
                          </div>
                          <div>
                            <span>투표수 : </span>
                            <span className={cn(ct.optionCnt)}>
                              {opt.count}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            );
          })
        : ""}
      <div>
        <div>
          <Link href="/survey">
            <a
              type="button"
              className={cn(ct.contenBtnList, "btn btn-primary")}
            >
              목록
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
