import React from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/navitem.module.css";

function NavItem({ active, url, title }) {
  const className = active ? cn("nav-link", styles.navItem) : cn("nav-link");

  return (
    <li className="nav-item">
      <Link href={url}>
        <a className={className}>{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
