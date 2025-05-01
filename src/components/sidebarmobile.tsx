import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
//@ts-ignore
import logo from "../assets/sidebar-logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logout } from "../utils/api.functions";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { userRoles } from "../types";
function SideBar({ active, handleSideBar }: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logoutContext } = useContext(UserContext);
  const handleSideBarFun = () => {
    if (window.innerWidth <= 768) {
      console.log("🚀 ~ handleSideBarFun ~ window.innerWidth <= 768:", window.innerWidth <= 768)
      console.log("Handling sidebar for small screens");
      handleSideBar()
    }
  };
  
  return (
    <aside
      id="sidebar"
      className={active ? `sidebar` : `sidebar sidebar-collapsed`}
    >
      <img src={logo} />
      <ul className="sidebar-nav" id="sidebar-nav">
        {user?.guard === userRoles.MANAGER && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/analytics" ? "active-page" : ""
                }`}
                to="/analytics"
                // onClick={handleSideBarFun}
              >
                <i className="bi bi-speedometer2"></i>
                <span>احصائيات </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/packages" ? "active-page" : ""
                }`}
                to="/packages"
                onClick={handleSideBar}
              >
                <i className="bi bi-speedometer2"></i>
                <span>الباقات </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/schools" ? "active-page" : ""
                }`}
                to="/schools"
                onClick={handleSideBar}
              >
                <i className="bi bi-buildings"></i>
                <span>المدرسة </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/teachers" ? "active-page" : ""
                }`}
                to="/teachers"
                onClick={handleSideBar}
              >
                <i className="bi bi-people"></i>
                <span>المعلمين </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/students" ? "active-page" : ""
                }`}
                to="/students"
                onClick={handleSideBar}
              >
                <i className="bi bi-people"></i>
                <span>الطلاب </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/prizes" ? "active-page" : ""
                }`}
                to="/prizes"
                onClick={handleSideBar}
              >
                <i className="ri-trophy-line"></i>
                <span>الجوائز </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/addaction" ? "active-page" : ""
                }`}
                to="/addaction"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>اضافة حسم </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/support" ? "active-page" : ""
                }`}
                to="/support"
                onClick={handleSideBar}
              >
                <i className="bi bi-headset"></i>
                <span>الدعم الفني </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/behaviors" ? "active-page" : ""
                }`}
                to="/behaviors"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>السلوكيات </span>
              </Link>
            </li>
          </>
        )}
        {user?.guard === userRoles.TEACHER && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/notes" ? "active-page" : ""
                }`}
                to="/notes"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>الملاحظات </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/reports" ? "active-page" : ""
                }`}
                to="/reports"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>التقارير </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/first-students" ? "active-page" : ""
                }`}
                to="/first-students"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>الأوائل </span>
              </Link>
            </li>
          </>
        )}
        {user?.guard === userRoles.STUDENT && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/student/home" ? "active-page" : ""
                }`}
                to="/student/home"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>الرئيسية </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/student/prizes" ? "active-page" : ""
                }`}
                to="/student/prizes"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>المتجر </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/student/orders" ? "active-page" : ""
                }`}
                to="/student/orders"
                onClick={handleSideBar}
              >
                <i className="ri-emotion-line"></i>
                <span>الطلبات </span>
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={() => {
              logout(user?.guard ?? "").then(() => {
                navigate("/login");
                logoutContext();
              });
            }}
          >
            <i className="bi bi-box-arrow-left"></i>
            <span>تسجيل الخروج</span>
          </span>
        </li>
      </ul>
      <ToastContainer />
    </aside>
  );
}

export default SideBar;
