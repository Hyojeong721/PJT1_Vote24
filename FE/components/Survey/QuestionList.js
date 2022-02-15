import React from "react";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import PieChartAge from "./PieChartAge";
import PieChartGender from "./PieChartGender";
import BarChart from "./BarChart";

const QuestionList = ({ total, dataList, dataresult }) => {
  console.log("datalist", dataList);
  return (
    <div className="mt-3 m-5">
      <div className="mb-5 d-flex justify-content-around">
        {total == 0 && <div>설문데이터가 없습니다.</div>}
        {total != 0 && <PieChartAge total={total} result={dataresult} />}
        {total != 0 && <PieChartGender total={total} result={dataresult} />}
      </div>

      <div className={cn(ct.questionListResult)}>문항별 응답현황</div>
      {dataList
        ? dataList.map((item) => {
            return (
              <div name="질문" className={cn(ct.questionList)} key={item.id}>
                <div className={cn(ct.question)}>
                  {item.order}. {item.context}
                </div>
                {(item.type == 0) & (total != 0) && (
                  <BarChart total={total} item={item} />
                )}
                {/* 여기 자꾸 0이 뜨는데 이유를 모름..ㅠㅠ */}
                {item.type == 1 && (
                  <div>예비 주관식 답 더보기{item.result}</div>
                )}
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
