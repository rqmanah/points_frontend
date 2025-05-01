import "./pagetitl.css";
function PageTitle({ title }: any) {
  return (
    <div className="pagetitle rtl " id="pagetitle">
      <h1 className="pagetitle ">{title}</h1>
      <nav className="">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">{title}</li>
          <li className="breadcrumb-item "></li>
          <a href="/login">
            <i className="bi bi-house-door"></i>
          </a>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
