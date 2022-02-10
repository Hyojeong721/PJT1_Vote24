import React from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/navitem.module.css";

function NavItem({ active, url, title }) {
  return (
    <li className="nav-item">
      <Link href={url}>
        <a className="nav-link">{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
