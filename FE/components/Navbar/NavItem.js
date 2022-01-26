import React, { useState } from "react";
import Link from "next/link";

function NavItem({ active, url, title }) {
  return (
    <li className={`nav-item ${active ? "active" : ""}`}>
      <Link href={url}>
        <a className="nav-link">{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
