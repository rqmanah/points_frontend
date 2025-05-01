import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { rolesDefaultRoutes, userRoles, userRoutes } from "../types";
import { matchRoute } from "../utils";
import { UserContext } from "../utils/userContext";
import Header from "./Header";
import Main from "./Main";
import SideBar from "./SideBar";
function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logoutContext } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      if (!matchRoute(pathname, userRoutes?.[user.guard ?? ""])) {
        if (user.guard == userRoles.MANAGER && !user.has_school) {
          navigate("/schools/add");
        } else navigate(rolesDefaultRoutes?.[user.guard ?? ""]);
      }
    } else navigate("/login");
  }, [navigate, pathname, user]);
  useEffect(() => {
    if (!user?.has_school) {
      // logoutContext();
      // navigate("/schools/add");
    }
  }, [user]);

  const [active, setActive] = useState(true);
  const handleSideBar = () => {
    setActive((prev) => !prev);
  };
  const [activeMobile, setActiveMobile] = useState(false);
  const handleMobileSideBar = () => {
    setActiveMobile((prev) => !prev);
  };
  
  if (user?.has_school)
    return (
      <div dir="rtl">
        <Header
          handleSideBar={handleSideBar}
          handleMobileSideBar={handleMobileSideBar}
        />
        <div className="">
          <SideBar active={active} handleSideBar={handleSideBar} />
        </div>
        {/* <div className="d-lg-none d-md-block d-block ">
          <SideBarMobile
            active={activeMobile}
            handleSideBar={handleMobileSideBar}
          />
        </div> */}
        <Main active={active} />

        <ToastContainer />
      </div>
    );
  else {
    navigate("/login");
    logoutContext();
  }
}

export default Layout;
