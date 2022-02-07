import Link from "next/link";
import cn from "classnames";
import styles from "../styles/backbutton.module.css";

function BackButton({ url }) {
  return (
    <Link href={url} passHref>
      <a className={cn(styles.backButton)}>
        <span className="material-icons">arrow_back_ios</span>
      </a>
    </Link>
  );
}

export default BackButton;
