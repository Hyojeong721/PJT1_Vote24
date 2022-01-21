function Header({ title, subtitle }) {
  return (
    <div className="header-box bg-primary text-white d-flex align-items-center mb-5">
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default Header;
