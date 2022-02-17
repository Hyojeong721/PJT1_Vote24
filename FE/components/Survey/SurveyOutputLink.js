const SurveyOuputLink = ({ output_link, reservation_link }) => {
  if (output_link || reservation_link) {
    return (
      <div>
        <div className="ms-5 m-2">
          건강정보링크 :<a href={output_link}>{output_link}</a>
        </div>
        <div className="ms-5 m-2">
          예약링크 :<a href={reservation_link}> {reservation_link}</a>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SurveyOuputLink;
