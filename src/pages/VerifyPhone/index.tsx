import "../../index.css";
//@ts-ignore
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import {
  resendVerficationMessage,
  verifyPhone,
} from "../../utils/api.functions";
import useFetch from "../../hooks/useFetch";

function VerifyPhone() {
  document.title = "التحقق من رقم الهاتف";
  const location = useLocation();
  console.log("🚀 ~ VerifyPhone ~ location:", location?.search == "?resend-direct");
  const resendDirectOTP = location?.search == "?resend-direct";
  console.log("🚀 ~ VerifyPhone ~ resendDirectOTP:", resendDirectOTP)
  const navigate = useNavigate();
  document.title = "";
  const [verifiedCode, setVerifiedCode] = useState("");
  const [seconds, setSeconds] = useState<number>(60);
  const [timerId, setTimerId] = useState<number | null>(null);
  const resendVerifyCode = () => {
    resendVerficationMessage(verifiedCode);
    setSeconds(60);
  };
  const verifyMobileNumber = () => {
    verifyPhone(verifiedCode)
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)
        if (data.status !== "error") {
          toast.success(data?.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/schools/add");
        } else {
          toast.error(data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch(() => {
        toast.error("لقد حدث خطأ ما", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  useEffect(() => {
    if (seconds === 60) {
      setTimerId(
        setInterval(() => {
          setSeconds((prev) => prev - 1);
        }, 1000)
      );
    } else if (seconds < 0) {
      clearInterval(timerId ?? 1);
      setTimerId(null);
    }
  }, [seconds]);
  const [hasResent, setHasResent] = useState(false); 

  useEffect(() => {
    if (resendDirectOTP && !hasResent) {  
      resendVerifyCode();
      setHasResent(true);  
    }
  }, [resendDirectOTP, hasResent]);
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
    <div className="container ">
      <div
        className="row d-flex justify-content-center"
        style={{ height: "88vh" }}
      >
        <div className="col-lg-6 col-md-8 col-sm-9 col-xl-5  d-flex flex-column justify-content-center">
          <div className="col-12 col-md-12 col-lg-12 col-sm-12 my-3">
            <div className="row">
              <div className="col-12 col-md-8 col-sm-6 col-lg-12 mx-auto d-flex align-items-center p-0">
                <h3
                  className="fw-bold text-center px-3 py-1 rounded-pill mx-auto"
                  style={{
                    border: "2px solid #A7C957",
                  }}
                >
                  التحقق من الهاتف او البريد المسجل
                </h3>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-sm-12 col-lg-6 col-md-6">
              <div className="row mx-auto">
                <div className="col-12 col-sm-10 col-lg-6 col-md-6">
                  <label
                    htmlFor="username"
                    className=" text-end d-block  font-size-16 mb-2"
                  >
                    رمز التحقق
                  </label>
                  <input
                    id="username"
                    type={"text"}
                    value={verifiedCode}
                    onChange={(ev) => setVerifiedCode(ev.target.value)}
                    style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
                    className="form-control text-end p-3 "
                    placeholder={"رمز التحقق"}
                  />
                </div>
                <div className="col-12 col-sm-12 col-lg-6 col-md-6 my-1 d-flex align-items-end">
                  <button
                    className="btn btn-outline-primary"
                    disabled={seconds > 0}
                    onClick={() => resendVerifyCode()}
                  >
                    إعادة إرسال
                    {seconds > 0 ? `  ( ${seconds} )  ` : ""}
                  </button>
                </div>
                <button
                  className="btn btn-success my-2"
                  onClick={() => verifyMobileNumber()}
                  disabled={!verifiedCode}
                >
                  حفظ
                </button>
              </div>
            </div> */}
          <div className="col-12 col-lg-12 col-md-12 p-3 p-lg-0">
            <Card className="custom-card shadow p-2">
              <CardBody>
                <div className="col-12 mb-3">
                  <label
                    htmlFor="username"
                    className=" text-end d-block  font-size-16 mb-2 fw-bolder "
                  >
                    رمز التحقق
                  </label>
                  <input
                    id="username"
                    type={"number"}
                    value={verifiedCode}
                    onChange={(ev) => setVerifiedCode(ev.target.value)}
                    className="form-control text-end p-3 "
                    placeholder={"رمز التحقق"}
                  />
                </div>
                <div className="col-12 mb-3">
                  <button
                    // type="submit"
                    style={{ backgroundColor: "#0077b6" }}
                    className={`btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-3`}
                    onClick={() => verifyMobileNumber()}
                    disabled={!verifiedCode}
                  >
                    دخول
                  </button>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-outline-primary"
                    disabled={seconds > 0}
                    onClick={() => resendVerifyCode()}
                  >
                    إعادة إرسال
                    {seconds > 0 ? `  ( ${seconds} )  ` : ""}
                  </button>
                  <Link
                    className="text-primary btn redirect-btn"
                    to={navigateLing}
                  >
                    {"الرجوع الى الصفحة الرئيسية"}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default VerifyPhone;
