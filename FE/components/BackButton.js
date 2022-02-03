import Link from "next/link";

function BackButton({ url }) {
  return (
    <Link href={url} passHref>
      <a className="btn position-absolute start-0">
        <span className="material-icons">arrow_back_ios</span>
      </a>
    </Link>
  );
}

export default BackButton;
