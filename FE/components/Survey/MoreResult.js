import Link from "next/link";

function MoreResult() {
  return (
    <div>
      <div>
        <Link href={``}>
          <a type="button" className={"btn btn-primary"}>
            자세히보기
          </a>
        </Link>
      </div>
    </div>
  );
}

export default MoreResult;
