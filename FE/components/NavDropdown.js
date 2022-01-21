import React, { useState } from "react";
import Link from "next/link";

function NavDropdown({ title, subtitles }) {
  return (
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        {subtitles
          ? subtitles.map((subtitle, idx) => (
              <li key={idx}>
                <Link class="dropdown-item" href={subtitle.url}>
                  {subtitle.title}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </li>
  );
}

export default NavDropdown;
