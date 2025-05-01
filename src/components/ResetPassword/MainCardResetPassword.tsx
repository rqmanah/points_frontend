import { Card, CardBody, Spinner } from "reactstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutate } from "../../hooks/useMutate";
import countries from "../../data/countries";
import SuccessModal from "../SuccessModal";
import PhoneInput2 from "../PhoneInput2";

function MainCardResetPassword() {
  const navigate = useNavigate();
  const [isManger, setIsManger] = useState(false);
  const [modal, setModal] = useState(false);

  type Inputs = {
    phone: string;
    dialing_code: string;
    verification_code?: string;
    password?: string;
  };
  const methods = useForm<Inputs>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { mutate: resetPassword, isPending: loadingSubmit } = useMutate({
    mutationKey: ["school/manager/forget/password"],
    endpoint: `school/manager/forget/password`,
    onSuccess: (data) => {
      if (data?.data?.status === "error") {
      
        setModal(true);
      } else {
        toast.success("تم إرسال الكود بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsManger(true); // تحويل الحالة لإدخال الكود وكلمة المرور الجديدة
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما", {
        position: "top-right",
        autoClose: 2000,
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

  const { mutate: sendCode, isPending: loadingSetCode } = useMutate({
    mutationKey: ["school/manager/reset/password"],
    endpoint: `school/manager/reset/password`,
    onSuccess: (data) => {
      if (data?.data?.status === "error") {
        toast.error(data?.data?.message || "حدث خطأ ما", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("تم تغيير كلمة المرور بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما", {
        position: "top-right",
        autoClose: 2000,
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetPassword(data);
  };

  const onSubmitSendCode: SubmitHandler<Inputs> = (data) => {
    sendCode(data);
  };

  return (
    <div className="col-12 col-lg-12 col-md-12 p-3 p-lg-0">
      <Card className="custom-card shadow p-2">
        <p className="fw-bold fs-2 text-center primary-color">
          إعادة تعيين كلمة المرور
        </p>
        {!isManger ? (
          <CardBody>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center row"
              >
                {/* <div className="mb-3 col-12">
                <label
                  htmlFor="dialing_code"
                  className="text-end d-block font-size-16 mb-2"
                >
                  كود البلد
                </label>

                <select
                  className="form-control"
                  style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
                  {...register("dialing_code", { required: true })}
                >
                  <option value="" disabled>
                    اختر كود الدولة
                  </option>
                  {countries.map((item: any, index: any) => (
                    <option key={index} value={item.code}>
                      ({item.code}) {item.country}
                    </option>
                  ))}
                </select>
                {errors.dialing_code && (
                  <p className="text-right text-danger">
                    برجاء إختيار كود الدولة
                  </p>
                )}
              </div>
              <div className="mb-3 col-12">
                <label
                  htmlFor="phone"
                  className="text-end d-block font-size-16 mb-2"
                >
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  placeholder="رقم الهاتف"
                  type="text"
                  className="form-control text-end p-3"
                  autoComplete="off"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "برجاء إدخال رقم صحيح فقط",
                    },
                  })}
                />
              </div> */}
                <div className="mb-3 col-12">
                  {/* <PhoneInput2
                  label="رقم الجوال"
               
                  customClass="phone-input-class"
                  name="phone"
                /> */}
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
                      style={{
                        backgroundColor: "#EEF1F5",
                        borderRadius: "20px",
                      }}
                      className="form-control text-end p-3"
                      placeholder={"البريد الإلكتروني"}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-right text-danger">
                        برجاء إدخال البريد الإلكتروني
                      </p>
                    )}
                  </div>
                </div>

                <p className="col-12 text-center text-danger">
                  {errors.phone?.message}
                </p>

                {!loadingSubmit && (
                  <button
                    type="submit"
                    style={{ backgroundColor: "#0077b6" }}
                    className="btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-3"
                  >
                    إرسال الكود
                  </button>
                )}
                {loadingSubmit && (
                  <button
                    type="submit"
                    disabled
                    style={{ backgroundColor: "#0077b6" }}
                    className="btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-4"
                  >
                    <Spinner className="" color="white">
                      Loading...
                    </Spinner>
                  </button>
                )}
              </form>
            </FormProvider>
          </CardBody>
        ) : (
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmitSendCode)}
              className="d-flex flex-column justify-content-center align-items-center row"
            >
              <div className="">
                <label
                  htmlFor="verification_code"
                  className="text-end d-block font-size-16 mb-2"
                >
                  رمز التحقق
                </label>
                <input
                  id="verification_code"
                  type="text"
                  style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
                  className="form-control text-end p-3"
                  placeholder="رمز التحقق"
                  autoComplete="off"
                  {...register("otp", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "برجاء إدخال رمز صحيح فقط",
                    },
                  })}
                />
                <p className="text-right text-danger">{errors.otp?.message}</p>
              </div>
              <div className="mb-3 col-12">
                <label
                  htmlFor="password"
                  className="text-end d-block font-size-16 mb-2"
                >
                  كلمة المرور الجديدة
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control text-end p-3"
                  placeholder="كلمة المرور الجديدة"
                  autoComplete="off"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-right text-danger">
                    برجاء إدخال كلمة المرور الجديدة
                  </p>
                )}
              </div>

              {!loadingSetCode && (
                <button
                  type="submit"
                  style={{ backgroundColor: "#0077b6" }}
                  className="btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-3"
                >
                  تعيين كلمة المرور
                </button>
              )}
              {loadingSetCode && (
                <button
                  type="submit"
                  disabled
                  style={{ backgroundColor: "#0077b6" }}
                  className="btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-4"
                >
                  <Spinner className="" color="white">
                    Loading...
                  </Spinner>
                </button>
              )}
            </form>
          </CardBody>
        )}
      </Card>
      <SuccessModal
        isOpen={modal}
        setOpen={setModal}
        subText={"عليك التوجه إلى مدير المدرسة"}
        text="لإستعادة كلمة المرور"
        toggle={() => setModal(!modal)}
      />

      <ToastContainer />
    </div>
  )
}

export default MainCardResetPassword;
