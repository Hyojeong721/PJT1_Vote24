import React, { useState } from "react";
import Link from "next/link";

function NavDropdown({ active, title, subtitles }) {
  return (
    <li className={`nav-item dropdown ${active ? "active" : ""}`}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        {subtitles
          ? subtitles.map((subtitle, idx) => (
              <li key={idx}>
                <Link className="dropdown-item" href={subtitle.url}>
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
