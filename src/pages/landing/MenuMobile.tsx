import { t } from "i18next";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/sidebar-logo.png";
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import NavMessage from "../../components/NavMessage";
import NavAvatar from "../../components/NavAvatar";
import LngSetting from "../../components/LngSetting";
import useFetch from "../../hooks/useFetch";

function MenuMobile() {
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
      <div className="d-flex align-items-center mx-2 ">
        <button
          className="btn "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          style={{}}
        >
          <IoMenu className="fs-2" />
        </button>
        <LngSetting />
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="offcanvasRightLabel"
            style={{
              flex: "1",
            }}
          >
            <Link className="navbar-brand" to={navigateLing}>
              <img
                src={logo}
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt={t("App Logo")}
              />
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className=" mt-3">
            <ul
              style={{
                fontSize: "14px",
              }}
              className=" d-flex flex-column gap-4"
            >
              <a href="#" className="pointer text-dark border p-2 rounded-2">
                {t("Home")}
              </a>
              <a
                href="#packages"
                className="pointer text-dark border p-2 rounded-2"
              >
                {t("Packages")}
              </a>
              <Link
                to={"/privacy-policy"}
                className="pointer text-dark border p-2 rounded-2"
              >
                {t("Privacy Policy")}
              </Link>
              <Link
                to={"/terms"}
                className="pointer text-dark border p-2 rounded-2"
              >
                {t("Terms of Service")}
              </Link>
              <div className="d-flex align-items-center justify-content-between">
                {user?.token && user?.has_package && user?.has_school ? (
                  <ul className="d-flex align-items-center justify-content-end  gap-3 ">
                    <NavMessage />
                    <NavAvatar />
                  </ul>
                ) : (
                  <ul className="navbar-nav  d-flex flex-row gap-3 align-items-center  justify-content-center  justify-content-lg-end  col-md-12 col-sm-12 col-12">
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        style={{
                          backgroundColor: "#0077B6",
                          color: "white",
                          width: "140px",
                          fontSize: "12px",
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                        to="/register"
                      >
                        {t("Register")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#0077B6",
                            width: "100px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        >
                          {t("Login")}
                        </button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuMobile;
