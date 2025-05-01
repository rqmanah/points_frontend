import "./Nav.css";
import NavAvatar from "./NavAvatar";
import NavMessage from "./NavMessage";
// import NavNotice from "./NavNotice";
function Nav() {
  return (
    <nav className="header-nav d-flex  justify-content-end w-100 ">
      <ul className="d-flex align-items-center justify-content-start  gap-2 ">
        {/* <NavNotice /> */}
        <NavMessage />
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
