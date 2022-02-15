import React from "react";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const QuestionList = ({ total, dataList }) => {
  console.log("total:", total);
  console.log("dataList", dataList);

  return (
    <div className="m-5">
      <div className="d-flex justify-content-around">
        {/* <PieChart total={total} result={dataList.result}></PieChart> */}
        {/* <PieChart total={total} dataList={dataList}></PieChart> */}
      </div>

      <div className={cn(ct.questionListResult)}>문항별 응답현황</div>
      {dataList
        ? dataList.map((item) => {
            return (
              <div name="질문" className={cn(ct.questionList)} key={item.id}>
                <div className={cn(ct.question)}>
                  {item.order}. {item.context}
                </div>
                {item.type == 0 && <BarChart total={total} item={item} />}
                {item.type == 1 && <div>예비 주관식 답 더보기</div>}
                {item.option
                  ? item.option.map((opt) => {
                      return (
                        <div key={opt.id} className={cn(ct.option)}>
                          <div>
                            - {opt.context}
                            <span> [배점 : {opt.weight}]</span>
                          </div>

                          <div className={cn(ct.optionCnt)}>
                            <span>선택횟수 : </span>
                            <span>{opt.count} </span>
                            {opt.count != 0 && (
                              <span>
                                ({Math.round((opt.count / total) * 100)}%)
                              </span>
                            )}
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
