import React from "react";

function SimpleCard(props) {
  return (
    <div class="simple-card card">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <div>
          <h6 class="card-subtitle mb-2 text-muted">{props.title}</h6>
        </div>
        <div className={props.color}>
          <h1 class="card-text">{props.context}</h1>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard;
