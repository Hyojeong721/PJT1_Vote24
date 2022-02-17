const SurveyOuputLink = ({ output_link, reservation_link }) => {
  if (output_link || reservation_link) {
    return (
      <div>
        <div className="ms-5 m-2">건강정보링크 : {output_link}</div>
        <div className="ms-5 m-2">예약링크 : {reservation_link}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SurveyOuputLink;
