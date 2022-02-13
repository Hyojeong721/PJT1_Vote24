import React from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/navitem.module.css";

function NavDropdown({ active, title, subtitles }) {
  const className = active ? cn(styles.navItem) : cn("");

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle d-flex align-items-center"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className={className}>{title}</div>
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
