// import { Nav } from "reactstrap";
import Nav from "./Nav";
import Logo from "./Logo";
import "./header.css";
function Header({ handleSideBar, handleMobileSideBar }: any) {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* logo */}
      <div className="">
        <Logo handleSideBar={handleSideBar} />
      </div>
      {/* <div className="d-lg-block d-xl-none  d-block d-md-block">
        <Logo handleSideBar={handleMobileSideBar} />
      </div> */}

      {/* searchbar */}
      {/* nav */}
      <Nav />
    </header>
  );
}

export default Header;
