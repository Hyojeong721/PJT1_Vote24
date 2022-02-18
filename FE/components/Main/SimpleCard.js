import React from "react";
import cn from "classnames";
import styles from "../../styles/simplecard.module.css";

function SimpleCard(props) {
  return (
    <div className={cn("card", styles.card)}>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <div>
          <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
        </div>
        <div className={cn(styles[`${props.color}`])}>
          <h1 className="card-text">{props.context}</h1>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard;
