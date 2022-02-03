function Header({ title, subtitle }) {
  return (
    <div className="header-box bg-primary text-white d-flex flex-column justify-content-center">
      <div className="header-title ms-3">{title}</div>
      <div className="fs-2 ms-3">{subtitle}</div>
    </div>
  );
}

export default Header;
