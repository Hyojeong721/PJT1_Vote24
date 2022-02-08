import React from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/navitem.module.css";

function NavItem({ active, url, title }) {
  const className = active
    ? cn("nav-item", styles.navItemUser)
    : cn("nav-item");

  return (
    <li className={className}>
      <Link href={url}>
        <a className="nav-link">{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
