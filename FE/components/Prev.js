import React from "react";
import cn from "classnames";
import content from "../styles/detail.module.css";
import Link from "next/link";

const Prev = ({ id, title }) => {
  return (
    <li className={cn(content.prev)}>
      <strong>이전글</strong>
      <Link href={`notice/`} as={`${id}`} passHref>
        <a>{title}</a>
      </Link>
    </li>
  );
};

export default Prev;
