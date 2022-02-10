import cn from "classnames";
import ct from "../../styles/detail.module.css";

const BenchBox = ({ benchmark }) => {
  if (benchmark.length == 0) {
    return <div className={cn(ct.benchbox)}>점수별 평가가 없습니다.</div>;
  } else {
    return (
      <div className={cn(ct.benchbox)}>
        {benchmark
          ? benchmark.map((b) => {
              return (
                <div key={b.id} className={cn(ct.bench)}>
                  <p>
                    {" "}
                    총점 <span className={cn(ct.blue)}>~ {b.benchmark}점 </span>
                  </p>
                  <p> =&gt; {b.output_text}</p>
                </div>
              );
            })
          : ""}
      </div>
    );
  }
};

export default BenchBox;
