import React from "react";
import cn from "classnames";
import content from "../styles/detail.module.css";
import Link from "next/link";

const Next = ({ id, title }) => {
  return (
    <li className={cn(content.prev)}>
      <strong>다음글</strong>
      <Link href={`notice/${id}`} passHref>
        <a>{title}</a>
      </Link>
    </li>
  );
};

export default Next;
