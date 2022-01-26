import React from "react";

function HomeUser() {
  return (
    <div>
      <div className="background bg-primary d-flex justify-content-center align-items-center">
        <div className="main_body d-flex flex-column justify-content-between align-items-center">
          <div className="main_title text-center text-white fw-bold ">
            <div>Vote24</div>
            <div>설문조사 플랫폼</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeUser;
export async function getServerSideProps({ params }) {
  console.log(params);
  const GET_HOSPITAL_INFO_URL = `http://i6a205.p.ssafy.io:8000/api/code/${params.hId}`;
  const { name, file } = await axios.get(GET_HOSPITAL_INFO_URL);

  return {
    props: {
      name: "name",
      file: "file",
    },
  };
}
