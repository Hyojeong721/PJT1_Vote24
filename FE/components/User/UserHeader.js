import cn from "classnames";
import styles from "../../styles/userheader.module.css";

function UserHeader({ title }) {
  return (
    <div className={cn(styles.UserHeaderBorder, "fs-1", "mb-3")}>{title}</div>
  );
}

export default UserHeader;
