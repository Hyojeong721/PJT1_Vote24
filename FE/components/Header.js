import Image from "next/image";

function Header({ title, subtitle, image, children }) {
  return (
    <div className="header-box bg-primary text-white d-flex flex-column justify-content-center shadow">
      <div className="header-title ms-3 d-flex">
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
  );
}

export default Header;
