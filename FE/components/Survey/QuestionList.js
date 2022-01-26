import React from "react";
import Question from "./Question";

const QuestionList = ({ dataList }) => {
  console.log("dataList", dataList);

  return (
    <div>
      질문목록
      {dataList
        ? dataList.map((item) => {
            return (
              <div key={item.id}>
                <p>질문 : {item.context}</p>
                {item.option
                  ? item.option.map((opt) => {
                      return (
                        <div key={opt.id}>
                          {opt.context} | 선택수 : {opt.count}
                        </div>
                      );
                    })
                  : ""}
                <hr></hr>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default QuestionList;
