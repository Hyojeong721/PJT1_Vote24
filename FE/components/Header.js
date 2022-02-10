import Image from "next/image";
import cn from "classnames";
import styles from "../styles/header.module.css";

function Header({ title, subtitle, image, children }) {
  return (
    <div
      className={cn(
        styles.headerBox,
        "bg-primary",
        "shadow",
        "d-flex",
        "flex-column",
        "justify-content-center"
      )}
    >
      <div className="container text-white">
        <div className={cn(styles.headerTitle, "ms-3", "d-flex")}>
          {image && (
            <div className="me-2">
              <Image
                src={image}
                width="30px"
                height="30px"
                layout="fixed"
                priority
              ></Image>
            </div>
          )}
          {title}
        </div>
        {children && (
          <div className="fs-2 ms-3 d-flex mt-3">
            <p>{subtitle}</p>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
