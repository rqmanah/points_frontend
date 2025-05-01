import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sidebar.css";
//icons
//@ts-ignore
import logo from "../assets/sidebar-logo.png";
//@ts-ignore
import anlyticIcon from "../assets/sidebar/analytics 1.png";
//@ts-ignore
import boyIcon from "../assets/sidebar/boy-2.png";
//@ts-ignore
import techSupportIcon from "../assets/sidebar/g2025.png";
//@ts-ignore
import logouttIcon from "../assets/sidebar/check_out.png";
//@ts-ignore
import schoolIcon from "../assets/sidebar/image 3.png";
//@ts-ignore
import stdntIcon from "../assets/sidebar/image 5.png";
//@ts-ignore
import teacherIcon from "../assets/sidebar/image 6.png";
//@ts-ignore
import behavIcon from "../assets/sidebar/subscription 1.png";
//@ts-ignore
import noteIcon from "../assets/sidebar/image 4.png";
//@ts-ignore
import trophyIcon from "../assets/sidebar/trophy 1.png";
//@ts-ignore
import storeIcon from "../assets/sidebar/image 1.png";
//@ts-ignore
import notesIcon from "../assets/sidebar/notes_logo.png";
//@ts-ignore
import reportsIcon from "../assets/sidebar/reports_logo.png";
//@ts-ignore
import firstStudentsIcon from "../assets/sidebar/firstStudents.png";
//@ts-ignore
import homeIcon from "../assets/sidebar/home.png";
//@ts-ignore
import prizesIcon from "../assets/sidebar/prizes.png";
//@ts-ignore
import ordersIcon from "../assets/sidebar/orders.png";
import settingIcon from "../assets/sidebar/setting.png";

import { userRoles } from "../types";
import { logout } from "../utils/api.functions";
import { UserContext } from "../utils/userContext";
import useFetch from "../hooks/useFetch";

function SideBar({ active, handleSideBar }: any) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logoutContext } = useContext(UserContext);
  const [schoolState, setSchoolState] = useState(false);
  const [reportsState, setReportsState] = useState(false);
  const [giftState, setGiftState] = useState(false);
  const [settingState, setSettingState] = useState(false);

  const [studentPrizeOpen, setStudentPrizeOpen] = useState(false);

  const handleSchoolState = () => {
    setSchoolState((prev) => !prev);
  };

  const handelSettingState = () => {
    setSettingState((prev) => !prev);
  };
  const handleClickReports = () => {
    setReportsState((prev) => !prev);
    navigate("/reports");
  };
  const handleGiftState = () => {
    setGiftState((prev) => !prev);
  };
  const handleOpenPrizes = () => {
    setStudentPrizeOpen((prev) => !prev);
  };
  useEffect(() => {
    if (user?.guard == "manager" && !user?.has_package) {
      navigate("/packages");
    }
  }, [navigate, user?.has_package]);

  const handleSideBarFun = () => {
    if (window.innerWidth <= 768) {
      handleSideBar();
    }
  };
  const endpoint = `school/manager/school`;
  const { data: dataSchool } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  return (
    <aside
      id="sidebar"
      className={active ? `sidebar` : `sidebar sidebar-collapsed`}
    >
      <img src={logo} />
      <ul className="sidebar-nav" id="sidebar-nav">
        {user?.guard === userRoles.MANAGER && (
          <>
            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/schools/show" ? "active-page" : ""
                  }`}
                  to="/schools/show"
                >
                  <div className="mx-1 border rounded-5 ">
                    <img
                      width={40}
                      height={40}
                      className="p-1 rounded-5"
                      src={dataSchool?.result?.data?.image}
                      alt=""
                    />
                  </div>
                  <span>{user?.school?.title || user?.schools?.title} </span>
                </Link>
              </li>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/settings/profilesettings" ? "active-page" : ""
                  }`}
                  to="/settings/profilesettings"
                  onClick={handleSideBarFun}
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={settingIcon} alt="" />
                  </div>{" "}
                  <span> اعدادت الملف الشخصي </span>
                </Link>
              </li>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/analytics" ? "active-page" : ""
                  }`}
                  to="/analytics"
                  onClick={handleSideBarFun}
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-2" src={anlyticIcon} alt="" />
                  </div>
                  <span>احصائيات </span>
                </Link>
              </li>
            )}
            {/* {
            user?.has_package && */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname == "/packages" ? "active-page" : ""
                }`}
                to="/packages"
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5 ">
                  <img width={40} className="p-2" src={anlyticIcon} alt="" />
                </div>
                <span>الباقات</span>
              </Link>
            </li>
            {/* } */}
            {user?.has_package && (
              <li className="nav-item">
                <div
                  data-bs-target="#components-nav"
                  onClick={handleSchoolState}
                  className="nav-link"
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={boyIcon} alt="" />
                  </div>
                  <span>المدرسة</span>
                  <i
                    style={{
                      marginRight: "80px",
                    }}
                    className={`bi ${
                      schoolState ? "bi-chevron-down" : "bi-chevron-left"
                    }`}
                  ></i>
                </div>
              </li>
            )}
            {user?.has_package && schoolState && (
              <ul
                id="components-nav"
                className="nav-content-collapse"
                data-bs-parent="#sidebar-nav"
              >
                {" "}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/schools" ? "active-page" : ""
                    }`}
                    to="/schools/show"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={schoolIcon} alt="" />
                    </div>
                    <span>المدرسة </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/teachers" ? "active-page" : ""
                    }`}
                    to="/teachers"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img
                        width={40}
                        className="p-1"
                        src={teacherIcon}
                        alt=""
                      />
                    </div>{" "}
                    <span>المعلمين </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/students" ? "active-page" : ""
                    }`}
                    to="/students"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-2" src={stdntIcon} alt="" />
                    </div>{" "}
                    <span>الطلاب </span>
                  </Link>
                </li>
              </ul>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <div
                  data-bs-target="#components-nav"
                  onClick={handleGiftState}
                  className="nav-link"
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={storeIcon} alt="" />
                  </div>
                  <span>المتجر</span>
                  <i
                    style={{
                      marginRight: 92,
                    }}
                    className={`bi ${
                      giftState ? "bi-chevron-down" : "bi-chevron-left"
                    }`}
                  ></i>
                </div>
              </li>
            )}
            {user?.has_package && giftState && (
              <ul
                id="components-nav"
                className="nav-content-collapse"
                data-bs-parent="#sidebar-nav"
              >
                {" "}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/prizes" ? "active-page" : ""
                    }`}
                    to="/prizes"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={trophyIcon} alt="" />
                    </div>

                    <span>الجوائز </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/orders" ? "active-page" : ""
                    }`}
                    to="/orders"
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={noteIcon} alt="" />
                    </div>

                    <span>الطلبات </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/setting" ? "active-page" : ""
                    }`}
                    to="/setting"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img
                        width={40}
                        className="p-1"
                        src={settingIcon}
                        alt=""
                      />
                    </div>

                    <span>إعدادات المتجر </span>
                  </Link>
                </li>
              </ul>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <div
                  data-bs-target="#components-nav"
                  onClick={handelSettingState}
                  className="nav-link"
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={behavIcon} alt="" />
                  </div>
                  <span>الماليات</span>
                  <i
                    style={{
                      marginRight: "80px",
                    }}
                    className={`bi ${
                      settingState ? "bi-chevron-down" : "bi-chevron-left"
                    }`}
                  ></i>
                </div>
              </li>
            )}
            {user?.has_package && settingState && (
              <ul
                id="components-nav"
                className="nav-content-collapse"
                data-bs-parent="#sidebar-nav"
              >
                {" "}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/subscription" ? "active-page" : ""
                    }`}
                    to="/subscription"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={behavIcon} alt="" />
                    </div>
                    <span>الاشتراكات </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/invoice" ? "active-page" : ""
                    }`}
                    to="/invoice"
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={behavIcon} alt="" />
                    </div>{" "}
                    <span>الفواتير </span>
                  </Link>
                </li>
              </ul>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/addaction" ? "active-page" : ""
                  }`}
                  to="/addaction"
                  onClick={handleSideBarFun}
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={noteIcon} alt="" />
                  </div>{" "}
                  <span>اضافة - حسم </span>
                </Link>
              </li>
            )}

            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/support" ? "active-page" : ""
                  }`}
                  to="/support"
                  onClick={handleSideBarFun}
                >
                  <div className="mx-1 border rounded-5 ">
                    <img
                      width={40}
                      className="p-1"
                      src={techSupportIcon}
                      alt=""
                    />
                  </div>{" "}
                  <span>الدعم الفني </span>
                </Link>
              </li>
            )}
            {user?.has_package && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname == "/behaviors" ? "active-page" : ""
                  }`}
                  to="/behaviors"
                >
                  <div className="mx-1 border rounded-5 ">
                    <img width={40} className="p-1" src={behavIcon} alt="" />
                  </div>{" "}
                  <span>السلوكيات </span>
                </Link>
              </li>
            )}
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
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5">
                  <img width={40} className="p-2" src={notesIcon} alt="" />
                </div>
                <span>الملاحظات </span>
              </Link>
            </li>
            <li className="nav-item">
              <div
                data-bs-target="#reports"
                onClick={handleClickReports}
                className={`nav-link ${
                  pathname == "/reports" ? "active-page" : ""
                }`}
              >
                <div className="mx-1 border rounded-5 ">
                  <img width={40} className="p-1" src={reportsIcon} alt="" />
                </div>
                <span>التقارير</span>
                <i
                  style={{
                    marginRight: "80px",
                  }}
                  className={`bi ${
                    reportsState ? "bi-chevron-down" : "bi-chevron-left"
                  }`}
                ></i>
              </div>
            </li>
            {reportsState && (
              <ul
                id="reports"
                className="nav-content-collapse"
                data-bs-parent="#sidebar-nav"
              >
                {" "}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/first-students" ? "active-page" : ""
                    }`}
                    to="/first-students"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img
                        width={40}
                        className="p-1"
                        src={firstStudentsIcon}
                        alt=""
                      />
                    </div>

                    <span>الأوائل </span>
                  </Link>
                </li>
              </ul>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/profile" ? "active-page" : ""
                }`}
                to="/profile"
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5">
                  <img width={40} className="p-2" src={settingIcon} alt="" />
                </div>
                <span>اعدادت الملف الشخصي </span>
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
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5">
                  <img width={40} className="p-2" src={homeIcon} alt="" />
                </div>
                <span>الرئيسية </span>
              </Link>
            </li>
            <li className="nav-item">
              <div
                data-bs-target="#student-prizes"
                onClick={() => handleOpenPrizes()}
                className={`nav-link ${
                  pathname == "/student/prizes" ? "active-page" : ""
                }`}
              >
                <div className="mx-1 border rounded-5 ">
                  <img width={40} className="p-1" src={prizesIcon} alt="" />
                </div>
                <span>المتجر</span>
                <i
                  style={{
                    marginRight: "80px",
                  }}
                  className={`bi ${
                    studentPrizeOpen ? "bi-chevron-down" : "bi-chevron-left"
                  }`}
                ></i>
              </div>
            </li>
            {studentPrizeOpen && (
              <ul
                id="student-prizes"
                className="nav-content-collapse"
                data-bs-parent="#sidebar-nav"
              >
                {" "}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname == "/student/prizes" ? "active-page" : ""
                    }`}
                    to="/student/prizes"
                    onClick={handleSideBarFun}
                  >
                    <div className="mx-1 border rounded-5 ">
                      <img width={40} className="p-1" src={trophyIcon} alt="" />
                    </div>

                    <span>الجوائز </span>
                  </Link>
                </li>
              </ul>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/student/orders" ? "active-page" : ""
                }`}
                to="/student/orders"
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5">
                  <img width={40} className="p-2" src={ordersIcon} alt="" />
                </div>
                <span>الطلبات </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname == "/profile" ? "active-page" : ""
                }`}
                to="/profile"
                onClick={handleSideBarFun}
              >
                <div className="mx-1 border rounded-5">
                  <img width={40} className="p-2" src={settingIcon} alt="" />
                </div>
                <span>اعدادت الملف الشخصي </span>
              </Link>
            </li>
          </>
        )}

        <li className="nav-item" style={{ cursor: "pointer" }}>
          <span
            className="nav-link"
            onClick={() => {
              logout(user?.guard ?? "").then(() => {
                navigate("/login");
                logoutContext();
              });
            }}
          >
            <div className="mx-1 border rounded-5 ">
              <img width={40} className="p-1" src={logouttIcon} alt="" />
            </div>{" "}
            <span>تسجيل الخروج</span>
          </span>
        </li>
      </ul>
      <ToastContainer />
    </aside>
  );
}

export default SideBar;
