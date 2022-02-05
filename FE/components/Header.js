function Header({ title, subtitle, children }) {
  return (
    <div className="header-box bg-primary text-white d-flex flex-column justify-content-center">
      <div className="header-title ms-3">{title}</div>
      <div className="fs-2 ms-3 d-flex">
        <p>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

export default Header;
