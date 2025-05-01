import { useContext, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Spinner } from "reactstrap";
import { login } from "../utils/api.functions";
import { UserContext } from "../utils/userContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutate } from "../hooks/useMutate";
import useFetch from "../hooks/useFetch";

function CustomCard() {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, logoutContext } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  type Inputs = {
    national_id: string;
    password: string;
    phone: string;
  };
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

  const methods = useForm<Inputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: submitLogin, isPending: loadingLogin } = useMutate({
    mutationKey: ["school/manager/login"],
    endpoint: `school/manager/login`,
    onSuccess: (data) => {
      console.log("🚀 ~ CustomCard ~ data:", data);
      if (data?.data?.status == "error") {
        toast.error(data?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const user = data?.data?.result?.data;
        localStorage.setItem("user", JSON.stringify(user));
        loginContext(user);
        switch (user?.guard) {
          case "manager":
            if (user?.phone_verified_at == null) {
              navigate("/verifyPhoneNumber?resend-direct");
            } else if (user.has_school) {
              if (user.has_package == false) {
                navigate("/packages");
              } else {
                navigate("/analytics");
              }
            } else navigate("/schools/add");
            break;
          case "student":
            navigate("/student/home");
            break;
          case "teacher":
            navigate("/notes");
            break;
          default:
            navigate("/analytics");
        }
        toast.error(data?.data?.message, {
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
    },
    onError(err) {
      toast.error(err?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    formData: true,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    submitLogin(data);
    //   console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ data:", data)
    //   setLoading(true);
    //   try {
    //     const user = await login(data);
    //     localStorage.setItem("user", JSON.stringify(user));
    //     loginContext(user);
    //  const res =    await new Promise((resolve) => {
    //       switch (user?.guard) {
    //         case "manager":
    //           if (user?.phone_verified_at == null) {
    //             navigate("/verifyPhoneNumber?resend-direct");
    //           } else if (user.has_school) {
    //             if (user.has_package == false) {
    //               navigate("/packages");
    //             } else {
    //               navigate("/analytics");
    //             }
    //           } else navigate("/schools/add");
    //           break;
    //         case "student":
    //           navigate("/student/home");
    //           break;
    //         case "teacher":
    //           navigate("/notes");
    //           break;
    //         default:
    //           navigate("/analytics");
    //       }
    //       toast.success(res?.response?.data?.message, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //         onClose: () => resolve("success"),
    //       });
    //     });
    //   } catch (error: any) {
    //     console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ error:", error)
    //     toast.error(error?.response?.data?.message, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
  };
  if (!user) {
    return (
      <FormProvider {...methods}>
        <div className="col-12 col-lg-12 col-md-12 p-3 p-lg-0">
          <Card className="custom-card shadow p-2">
            <p className="fw-bold fs-2 text-center primary-color">تسجيل دخول</p>

            <CardBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center row"
              >
                <div className="mb-3 col-12">
                  <label
                    htmlFor="national_id"
                    className="text-end d-block font-size-16 mb-2"
                  >
                    رقم الهوية
                  </label>
                  <input
                    id="national_id"
                    type={"text"}
                    className="form-control text-end p-3"
                    placeholder={"رقم الهوية"}
                    {...register("national_id", { required: true })}
                  />
                </div>
                <div className="mb-3 col-12 position-relative">
                  <label
                    htmlFor="password"
                    className="text-end d-block font-size-16 mb-2"
                  >
                    كلمة المرور{" "}
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control text-end p-3"
                    placeholder={"كلمة المرور"}
                    {...register("password", { required: true })}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "58%",
                      left: "25px",
                      // transform: "translate(-50% )",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <p className="col-12 text-center text-danger">
                  {errors.national_id || errors.password
                    ? "برجاء إدخال رقم الهوية وكلمة السر"
                    : ""}
                </p>

                <div className="row col-12">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-2 text-center">
                    <Link
                      to={"/reset-password"}
                      className="link-color me-0 fw-400 text-decoration-none"
                    >
                      <label style={{ cursor: "pointer" }}>
                        هل نسيت كلمة المرور ؟
                      </label>
                    </Link>
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 link-color me-0 text-center my-1">
                    <input
                      type="checkbox"
                      name="remember me"
                      className="form-check-input mx-2"
                    />
                    <label>تذكير تسجيل الدخول</label>
                  </div>
                </div>

                {!loadingLogin && (
                  <button
                    type="submit"
                    style={{ backgroundColor: "#0077b6" }}
                    className={`btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-3`}
                  >
                    دخول
                  </button>
                )}
                {loadingLogin && (
                  <button
                    type="submit"
                    disabled
                    style={{ backgroundColor: "#0077b6" }}
                    className={`btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-4`}
                  >
                    <Spinner className="" color="white">
                      Loading...
                    </Spinner>
                  </button>
                )}
              </form>
              <div className="text-center mt-2">
                <Link
                  className="text-primary btn redirect-btn"
                  to={navigateLing}
                >
                  {"الرجوع الى الصفحة الرئيسية"}
                </Link>
                <Link
                  className="text-primary btn redirect-btn"
                  to={"/register"}
                >
                  تسجيل الان
                </Link>
              </div>
            </CardBody>
          </Card>
          <ToastContainer />
        </div>
      </FormProvider>
    )
  } else {
    logoutContext();
  }
}

export default CustomCard;
