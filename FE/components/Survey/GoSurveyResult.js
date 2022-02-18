import Link from "next/link";

function GoSurveyResult({ sId }) {
  return (
    <div>
      <div>
        <Link href={`/survey/${sId}/result`}>
          <a type="button" className={"btn btn-primary"}>
            자세히보기
          </a>
        </Link>
      </div>
    </div>
  );
}

export default GoSurveyResult;
