import CustomCard from "../../components/card";
import "../../index.css";
//@ts-ignore
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/IMG_0890 1.png";
import { UserContext } from "../../utils/userContext";
import useFetch from "../../hooks/useFetch";

function Login() {
  document.title = "تسجيل الدخول";
  const navigate = useNavigate();
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

  useEffect(() => {
    if (user) {
      // navigate(rolesDefaultRoutes?.[user.guard ?? ""]);
    }
  }, [user]);
  return (
    <div className="container ">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-9 col-xl-5  d-flex flex-column justify-content-center">
          <Link to={navigateLing} className="d-flex justify-content-center">
            <img src={logo} className=" w-50 mx-auto" />
          </Link>
          <p className="mt-5 font-size-24 fw-700  text-center primary-color">
            اهلاً وسهلا بكم في موقع بوينت
          </p>
          <CustomCard />
        </div>
      </div>
    </div>
  )
}

export default Login;
