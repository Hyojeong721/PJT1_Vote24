import Link from "next/link";

function BackButton({ url }) {
  return (
    <Link href={url}>
      <button className="btn position-absolute start-0">
        <span className="material-icons">arrow_back_ios</span>
      </button>
    </Link>
  );
}

export default BackButton;
