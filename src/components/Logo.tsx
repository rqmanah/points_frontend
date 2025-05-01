import "./logo.css";
function Logo({ handleSideBar }: any) {
  return (
    <div className=" rtl d-flex   me-2 justify-content-end">
      <a href="#" className="logo d-flex text-decoration-none me-2  ">
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleSideBar}
        ></i>
      </a>
    </div>
  );
}

export default Logo;
