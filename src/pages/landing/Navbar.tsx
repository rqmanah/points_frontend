import { useContext } from "react";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import logo from "../../assets/sidebar-logo.png";
import NavAvatar from "../../components/NavAvatar";
import NavMessage from "../../components/NavMessage";
import { UserContext } from "../../utils/userContext";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MenuMobile from "./MenuMobile";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const endpoint = `school/manager/get/country`
  const { data: LocationData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  })
  const navigateLing =
    LocationData?.result?.data == "EG"
      ? "https://eg.school-points.com"
      : LocationData?.result?.data == "AE"
      ? "https://ae.school-points.com"
      : "https://sa.school-points.com"

  return (
    <div>
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center">
            <div className="col-md-1 d-flex align-items-center py-4">
              <Link className="navbar-brand" to={navigateLing}>
                <img
                  src={logo}
                  width="100"
                  height="50"
                  className="d-inline-block align-top"
                  alt="App Logo"
                />
              </Link>
            </div>
            <div className="col-lg-11 d-block">
              <div className="row d-flex justify-content-end">
                <div className="col-md-3 d-flex topper align-items-center  py-md-4">
                  <div className="icon d-flex justify-content-center align-items-center">
                    <FaPaperPlane className="primary-color" />
                  </div>
                  <div className="text d-flex flex-column gap-2 mx-4">
                    <span className="fw-700">Email</span>
                    <span>youremail@email.com</span>
                  </div>
                </div>
                <div className="col-md-3 d-flex topper align-items-center  py-md-4">
                  <div className="icon d-flex justify-content-center align-items-center">
                    <FaPhoneAlt className="primary-color" />
                  </div>
                  <div className="text d-flex flex-column gap-2 mx-4">
                    <span className="fw-700">Call</span>
                    <span>Call Us: + 1235 2355 98</span>
                  </div>
                </div>
                {user?.token ? (
                  <div className="col-md-3 topper d-flex align-items-center gap-2 justify-content-end">
                    <nav className="header-nav d-flex  justify-content-end w-100 ">
                      <ul className="d-flex align-items-center justify-content-start  gap-2 ">
                        <NavMessage />
                        <NavAvatar />
                      </ul>
                    </nav>
                  </div>
                ) : (
                  <div className="col-md-3 topper d-flex align-items-center gap-2 justify-content-end">
                    <p className="mb-0">
                      <Link
                        to="/login"
                        className="btn py-2 px-3 primary-bgColor text-white d-flex align-items-center justify-content-center"
                      >
                        <span>Login</span>
                      </Link>
                    </p>
                    <p className="mb-0">
                      <a
                        href="#"
                        className="btn py-2 px-3 primary-bgColor text-white d-flex align-items-center justify-content-center"
                      >
                        <span>Register</span>
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container  px-4">
        <nav
          className="navbar navbar-expand-lg "
          style={{
            backgroundColor: "#0d1128",
          }}
        >
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">
            Navbar
          </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item py-2 ">
                  <a
                    className="nav-link text-white active"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item py-2 ">
                  <a className="nav-link text-white" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item py-2 ">
                  <a className="nav-link text-white" href="#">
                    Courses
                  </a>
                </li>

                <li className="nav-item py-2 ">
                  <a className="nav-link text-white ">Staff</a>
                </li>
                <li className="nav-item py-2 ">
                  <a className="nav-link text-white ">Blog</a>
                </li>
                <li className="nav-item py-2 ">
                  <a className="nav-link text-white ">Contact</a>
                </li>
              </ul>
              {/* <form className="d-flex position-relative" role="search">
                <input
                  className="form-control me-2 rounded-4  text-white py-2 px-3"
                  style={{
                    backgroundColor:"transparent"
                  }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="position-absolute top-0 end-0 mx-3 mt-1 z-3">
                  <CiSearch  className="text-white fs-5"/>
                </div>
              </form> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
};

export default Navbar;
