import React from "react";
import cn from "classnames";
import ct from "../../styles/detail.module.css";

const QuestionList = ({ dataList }) => {
  console.log("dataList", dataList);

  return (
    <div className="m-5">
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
                          <div className={cn("me-3")}>
                            <span>점수 : </span>
                            <span>{opt.weight}</span>
                          </div>
                          <div className={cn(ct.optionCnt)}>
                            <span>선택횟수 : </span>
                            <span>{opt.count}</span>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default QuestionList;
