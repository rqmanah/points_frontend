import "../../index.css";
//@ts-ignore
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/IMG_0890 1.png";
import MainCardResetPassword from "../../components/ResetPassword/MainCardResetPassword";
import { rolesDefaultRoutes } from "../../types";
import { UserContext } from "../../utils/userContext";

function ResetPassword() {
  document.title = "تسجيل الدخول";
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      navigate(rolesDefaultRoutes?.[user.guard ?? ""]);
    }
  }, [user]);
  return (
    <div className="container ">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-9 col-xl-5  d-flex flex-column justify-content-center">
          <img src={logo} className=" w-50 mx-auto" />
          <p className="mt-5 font-size-24 fw-700  text-center primary-color">
            اهلاً وسهلا بكم في موقع بوينت
          </p>
          <MainCardResetPassword />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
