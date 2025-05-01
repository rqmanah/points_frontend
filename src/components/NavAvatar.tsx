import { useContext, useState } from "react";
import { GrHome } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { roleImages, userRoles } from "../types";
import { logout } from "../utils/api.functions";
import { UserContext } from "../utils/userContext";
import { MdOutlineDashboard } from "react-icons/md";
import { t } from "i18next";
import useFetch from "../hooks/useFetch";

function NavAvatar() {
  const { user, logoutContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const user: userType = JSON.parse(localStorage.getItem("user") ?? "{}");
  const user_name = user?.user_name;
  const location = useLocation();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const endpoint = `school/manager/school`;
  const { data: dataSchool } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
    const { data: LocationData } = useFetch({
      queryKey: [`school/manager/get/country`],
      endpoint: `school/manager/get/country`,
    })
    const navigateLing =
        LocationData?.result?.data == "EG"
        ? "https://eg.school-points.com"
        : LocationData?.result?.data == "AE"
        ? "https://ae.school-points.com"
        : "https://sa.school-points.com"

  return (
    <div className="d-flex  ">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          style={{
            width: 50,
            height: 50,
          }}
          className="my-2 bg-white border-2 rounded-circle text-center p-0 object-fit-cover"
        >
          {user?.image &&
          roleImages?.[user?.guard ?? ""]?.find((image) =>
            image.includes(user.image)
          ) ? (
            <img
              className="w-100 h-100 rounded-circle"
              src={roleImages?.[user?.guard ?? ""]?.find((image) =>
                image.includes(user.image)
              )}
            />
          ) : (
            <>
              {userRoles.MANAGER === user?.guard ? (
                <img
                  className="w-100 h-100 rounded-circle"
                  src={dataSchool?.result?.data?.image}
                  title="profile image"
                />
              ) : (
                <i className="bi-person text-dark"></i>
              )}
            </>
          )}
        </DropdownToggle>
        <DropdownMenu>
          {/* <Link
            to={
              ["teacher", "student"].includes(user?.guard ?? "")
                ? "/profile"
                : "/settings/profilesettings"
            }
            className="text-decoration-none"
          >
            <DropdownItem className="ffcairo d-flex gap-2">
              {user?.image &&
              roleImages?.[user?.guard ?? ""]?.find((image) =>
                image.includes(user.image)
              ) ? (
                <img
                  width={30}
                  height={40}
                  className="rounded-circle"
                  src={roleImages?.[user?.guard ?? ""]?.find((image) =>
                    image.includes(user.image)
                  )}
                />
              ) : (
                <i className="bi-person"></i>
              )}
              {t("Profile")}
            </DropdownItem>
          </Link>
          <DropdownItem divider /> */}
          {location?.pathname == "/" ? (
            <DropdownItem
              className="ffcairo d-flex gap-2 align-items-center"
              onClick={() => navigate("/analytics")}
            >
              <MdOutlineDashboard />
              {t("Dashboard")}
            </DropdownItem>
          ) : (
            <Link to={navigateLing}
            
              >
              <DropdownItem
                className="ffcairo d-flex gap-2 align-items-center"
                // onClick={() => navigate(navigateLing)}
              >
                <GrHome />
                {t("Home")}
              </DropdownItem>
            </Link>
          )}
          <DropdownItem divider />
          <DropdownItem
            className="ffcairo d-flex gap-2"
            onClick={() => {
              logout(user?.guard ?? "")
                .then(() => {
                  navigate("/login")
                  logoutContext()
                })
                .catch(() => {
                  localStorage.removeItem("user")
                  logoutContext()
                  navigate("/login")
                })
            }}
          >
            <i className="bi bi-box-arrow-left"></i>
            {t("Log out")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ToastContainer />
    </div>
  )
}

export default NavAvatar;
