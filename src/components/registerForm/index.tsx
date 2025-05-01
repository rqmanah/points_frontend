import { Label, Spinner } from "reactstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import avatar from "../assets/modaluser.png";
import { useContext, useState } from "react";
import { register } from "../../utils/api.functions";
import { UserContext } from "../../utils/userContext";
import countries from "../../data/countries";
import PhoneInput2 from "../PhoneInput2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [acceptRules, setAcceptRules] = useState<boolean>(false);
  type Inputs = {
    national_id: string;
    user_name: string;
    password: string;
    email: string;
    phone: string;
    name: string;
    gender: string;
    dialing_code: string;
    password_confirmation: string;
  };
  const methods = useForm<Inputs>();

  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      await register(data).then((user) => {
        toast.success("تم التسجيل  بنجاح ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("user", JSON.stringify(user));
        loginContext(user);
        navigate("/verifyPhoneNumber");
      });
    } catch (error: any) {
      console.log("retest", error.response);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "لقد حدث خطأ ما",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className=" col-12 col-lg-12 col-md-12 p-3 p-lg-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="mb-3 col-12 ">
            <label
              htmlFor="name"
              className=" text-end d-block  font-size-16 mb-2"
            >
              أسم المدير
            </label>
            <input
              id="name"
              type={"text"}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              className="form-control text-end p-3"
              placeholder={"اسم المدير"}
              {...registerForm("name", { required: true })}
              onKeyPress={(e) => {
                const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {errors.name && (
              <p className="text-right text-danger">برجاء إدخال اسم المدير</p>
            )}

            {errors.name && (
              <p className="text-right text-danger">{errors.name.message}</p>
            )}

            {errors.name && (
              <p className="text-right text-danger">{errors.name.message}</p>
            )}

            {errors.name && (
              <p className="text-right text-danger">برجاء إدخال اسم المدير</p>
            )}
          </div>
          {/* <div className="mb-3 col-12 ">
            <label
              htmlFor="username"
              className=" text-end d-block  font-size-16 mb-2"
            >
              اسم المستخدم{" "}
            </label>

            <input
              id="username"
              type={"text"}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              className="form-control text-end p-3"
              placeholder={"اسم المستخدم"}
              {...registerForm("user_name", { required: true })}
            />
            {errors.user_name && (
              <p className="text-right text-danger">برجارقم الهوية</p>
            )}
          </div> */}
          <div className="mb-3 col-12 ">
            <label
              htmlFor="national_id"
              className=" text-end d-block  font-size-16 mb-2"
            >
              رقم الهوية
            </label>
            <input
              id="national_id"
              type={"text"}
              className="form-control text-end p-3"
              placeholder={"رقم الهوية"}
              {...registerForm("national_id", { required: true })}
            />
            {errors.national_id && (
              <p className="text-right text-danger">برجارقم الهوية</p>
            )}
          </div>
          <div className="mb-3 col-12 ">
            <label
              htmlFor="email"
              className=" text-end  d-block  font-size-16 mb-2"
            >
              البريد الإلكتروني
            </label>
            <input
              id=""
              type={"text"}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              className="form-control text-end p-3"
              placeholder={"البريد الإلكتروني"}
              {...registerForm("email", { required: true })}
            />
            {errors.email && (
              <p className="text-right text-danger">
                برجاء إدخال البريد الإلكتروني
              </p>
            )}
          </div>
          {/* <div className="mb-3 col-12 ">
          <label
            htmlFor="phone"
            className=" text-end d-block  font-size-16 mb-2"
          >
            كود البلد
          </label>

          <select
            className="form-control"
            style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
            {...registerForm("dialing_code", { required: true })}
            onChange={(e) =>
              e.target.value &&
              setValue("dialing_code", e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" selected disabled>
              اختر كود الدولة
            </option>
            {countries.map((item: any, index: any) => (
              <option key={index} value={`${item.code}`}>
                ({item.code}) {item.country}
              </option>
            ))}
          </select>
          {errors.dialing_code && (
            <p className="text-right text-danger">برجاء إختيار كود الدولة</p>
          )}
        </div>
        <div className="mb-3 col-12 ">
          <label
            htmlFor="phone"
            className=" text-end d-block  font-size-16 mb-2"
          >
            الهاتف
          </label>
          <input
            id="phone"
            type={"text"}
            style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
            className="form-control text-end p-3"
            placeholder={"الهاتف"}
            {...registerForm("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-right text-danger">برجاء إدخال رقم الهاتف </p>
          )}
        </div> */}
          <div className="mb-3 col-12">
            <PhoneInput2
              label="رقم الجوال"
          
              customClass="phone-input-class"
              name="phone"

            />
          </div>
          <div className="mb-3 col-12 ">
            <label
              htmlFor="name"
              className=" text-end d-block  font-size-16 mb-2"
            >
              النوع
            </label>
            <select
              className="form-control"
              {...registerForm("gender", { required: true })}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              onChange={(e) =>
                e.target.value &&
                setValue("gender", e.target.value, {
                  shouldValidate: true,
                })
              }
            >
              <option disabled value={""} selected>
                اختر النوع
              </option>
              {[
                { type: "ذكر", value: "male" },
                { type: "انثي", value: "female" },
              ].map((item, index) => (
                <option key={index} value={item.value}>
                  {item.type}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-right text-danger">برجاء إختيار النوع </p>
            )}
          </div>
          <div className="mb-3 col-12 position-relative ">
            <label
              htmlFor="password"
              className=" text-end d-block font-size-16 mb-2"
            >
              كلمة المرور{" "}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              className="form-control text-end p-3"
              placeholder={"كلمة المرور"}
              {...registerForm("password", {
                required: true,
                validate: (value: string) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
              })}
            />
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "15px",
                // transform: "translate(-50% )",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-right text-danger">
                برجاء إدخال كلمة المرور ويجب أن تحتوي علي حرف capital وحرف small
                و رقم علي الأقل
              </p>
            )}
          </div>
          <div className="mb-3 col-12 position-relative ">
            <Label htmlFor="confirm_pass" className="ffcairo fw-bold">
              تاكيد كلمة المرور
            </Label>
            <input
              id="confirm_pass"
              style={{
                backgroundColor: "#EEF1F5",
                borderRadius: "20px",
              }}
              className="form-control text-end p-3 ffcairo"
              placeholder="تاكيد كلمة المرور"
              type={showPasswordConfirmation ? "text" : "password"}
              {...registerForm("password_confirmation", {
                required: true,
                validate: (value: string) => value === getValues("password"),
              })}
            />
            <div
              style={{
                position: "absolute",
                top: "62%",
                left: "15px",
                cursor: "pointer",
              }}
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
            >
              {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password_confirmation && (
              <p className="text-right text-danger">برجاء مطابقة كلمة المرور</p>
            )}
          </div>
          <div className="mb-3 col-12 d-flex align-items-center">
            <p>
              <input
                type="checkbox"
                className="p-2"
                checked={acceptRules}
                onChange={(ev) => setAcceptRules(ev.target.checked)}
              />
            </p>
            <p>
              <span className="mx-2">الموافقة علي</span>
              <Link to={"/terms"} target="_blank" style={{ color: "#0368DF" }}>
                الشروط والأحكام
              </Link>
            </p>
          </div>
          {!loading && (
            <button
              type="submit"
              style={{ backgroundColor: "#A7C957" }}
              className={`btn text-white w-100 fw-700 font-size-24 p-3 mt-3`}
              disabled={!acceptRules}
            >
              حفظ
            </button>
          )}
          {loading && (
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
        <div className="text-center mt-2 ">
          <Link className="text-primary btn redirect-btn" to={"/login"}>
            {"التوجه إالي صفحة تسجيل الدخول"}
          </Link>
        </div>

        <ToastContainer />
      </div>
    </FormProvider>
  );
}

export default RegisterForm;
