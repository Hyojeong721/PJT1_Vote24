import React, { useState } from "react";
import Link from "next/link";

function NavItem({ url, title }) {
  return (
    <li class="nav-item">
      <Link href={url}>
        <a class="nav-link">{title}</a>
      </Link>
    </li>
  );
}

export default NavItem;
