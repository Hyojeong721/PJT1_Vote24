function Header(props) {
  return (
    <div className="header-box bg-primary text-white d-flex align-items-center mb-5">
      <h1 className="title">{props.title}</h1>
    </div>
  );
}

export default Header;
