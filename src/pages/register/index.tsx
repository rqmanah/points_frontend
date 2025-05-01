import RegisterForm from "../../components/registerForm/index";
import "../../index.css";
//@ts-ignore
import settingsLogo from "../../assets/settings.png";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/userContext";
import { rolesDefaultRoutes } from "../../types";

function Register() {
  document.title = "تسجيل مدير جديد";
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      navigate(rolesDefaultRoutes?.[user.guard ?? ""]);
    }
  }, [user]);
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center my-5">
        <div className="col-12 my-3">
          <div className="row">
            <div className="col-10 col-md-6 col-sm-8 col-lg-4 mx-auto d-flex align-items-center p-0">
              <h3
                className="col-12 col-lg-8 col-md-10  col-sm-12 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
                style={{ border: "2px solid #A7C957", fontSize: "20px" }}
              >
                <div
                  className="rounded-circle"
                  style={{
                    border: "2px solid #A7C957",
                    width: "45px",
                    scale: "1.3",
                    background: "#A7C957",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img width={35} className="p-1" src={settingsLogo} alt="" />
                </div>
                <div className="flex-grow-1 text-center">تسجيل مستخدم جديد</div>
              </h3>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-10 col-xl-6  d-flex flex-column justify-content-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
