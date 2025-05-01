import { ToastContainer, toast } from "react-toastify";
// import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
import { getErrors } from "../../../utils";
import { useEffect, useState } from "react";
//@ts-ignore
import teachersImage from "../../../assets/sidebar/image 6.png";
import { handleClickRandomPassword } from "../../../utils/api.functions";
import SuccessModal from "../../../components/SuccessModal";

function AddTeacher() {
  document.title = "اضافة المعلم";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordCheckType, setPasswordCheckType] = useState("password");
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  type teacher = {
    name: string;
    user_name: string;
    password: string;
    is_active: boolean;
    password_confirmation: string;
    national_id: string;
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm<teacher>();
  const formValues: any = watch();

  useEffect(() => {
    if (formValues)
      Object.keys(formValues).forEach((key: string) => {
        //@ts-ignore
        if (formValues[key] && typeof formValues[key] == "string") {
          //@ts-ignore
          let trimmedValue = formValues[key]?.trimStart();
          //@ts-ignore
          if (trimmedValue !== formValues[key]) {
            //@ts-ignore
            setValue(key, trimmedValue);
          }
        }
      });
  }, [formValues, setValue]);
  const onSubmit: SubmitHandler<teacher> = async (data) => {
    setLoading(true);
    try {
      const response = await client.post(`school/manager/teachers`, data);
      await new Promise((resolve) => {
        setModal(true);
        setMessage(response.data.message);
      });
      navigate("/teachers");
    } catch (error: any) {
      const errorMessage = getErrors(error.response.data.data).join(", ");
      setModalError(true);
      setMessageError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3
        className="col-12 col-lg-2 col-md-3  col-sm-5 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
        style={{ border: "2px solid #A7C957", fontSize: "20px" }}
      >
        <div
          className="rounded-circle"
          style={{
            border: "2px solid #A7C957",
            width: "45px",
            scale: "1.6",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={35} className="p-1" src={teachersImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">المعلمين</div>
      </h3>
      {/* <PageTitle title={"اضافة المعلم"} /> */}
      <div className="container  ">
        <Row className="d-flex justify-content-center">
          <Col xxl={10}>
            <Card className="px-5 mt-2">
              <div className=" ">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <Col xs={12}>
                    <div
                      className="align-items-center p-2 text-center fw-bold"
                      style={{ color: "#368AAF", fontSize: "22px" }}
                    >
                      إضافة معلم
                    </div>
                  </Col>
                  <Row
                    className="rounded py-3"
                    style={{ border: "1px solid #cecece" }}
                  >
                    <Col lg={6} className="d-flex flex-column ">
                      <Label
                        for="exampleEmail"
                        className="ffcairo fw-bold text-muted"
                      >
                        الاسم
                      </Label>
                      <input
                        type="text"
                        id="name"
                        placeholder="اسم المعلم"
                        style={{ height: "34px" }}
                        className="form-control ffcairo has-error text-end "
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                        onKeyPress={(e) => {
                          const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.name && (
                        <p className="text-right text-danger">
                          برجاء إدخال إسم المعلم
                        </p>
                      )}
                    </Col>
{/* 
                    <Col lg={6}>
                      <Label
                        for="exampleEmail"
                        className="ffcairo fw-bold text-muted"
                      >
                        اسم المستخدم
                      </Label>
                      <input
                        id="exampleEmail"
                        placeholder="اسم المستخدم"
                        autoComplete="off"
                        style={{ height: "34px" }}
                        type="text"
                        className="form-control ffcairo text-end "
                        {...register("user_name", { required: true })}
                      />
                      {errors.user_name && (
                        <p className="text-right text-danger">
                          برجاء إدخال اسم المستخدم
                        </p>
                      )}
                    </Col> */}
                    <Col lg={6}>
                      <Label
                        for="exampleEmail"
                        className="ffcairo fw-bold text-muted"
                      >
                        الحالة
                      </Label>
                      <select
                        style={{ height: "36px" }}
                        className="form-control ffcairo text-end "
                        {...register("is_active", { required: true })}
                        onChange={(e) =>
                          e.target.value &&
                          //@ts-ignore
                          setValue("is_active", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <option selected value={""} disabled>
                          اختر الحالة
                        </option>
                        {[
                          { type: "فعال", value: "1" },
                          { type: " غير فعال", value: "0" },
                        ].map((item, index) => (
                          <option key={index} value={item.value}>
                            ({item.type})
                          </option>
                        ))}
                      </select>
                      {errors.is_active && (
                        <p className="text-right text-danger">
                          برجاء إختيار الحالة
                        </p>
                      )}
                    </Col>
                    <Col lg={6} className="d-flex flex-column">
                      <Label
                        for="exampleEmail"
                        className="ffcairo fw-bold text-muted"
                      >
                        رقم الهوية
                      </Label>
                      <input
                        id="exampleEmail"
                        placeholder="رقم الهوية"
                        style={{ height: "34px" }}
                        type="text"
                        className="form-control ffcairo text-end p-3"
                        {...register("national_id", { required: true })}
                      />
                      {errors.national_id && (
                        <p className="text-right text-danger">
                          برجاء إدخال رقم الهوية
                        </p>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Label
                        for="exampleEmail"
                        className="ffcairo fw-bold text-muted"
                      >
                        كلمة المرور
                      </Label>
                      <div className="d-flex align-items-center">
                        <input
                          id="exampleEmail"
                          style={{ height: "34px" }}
                          autoComplete="new-password"
                          placeholder=" كلمة المرور"
                          type={passwordType}
                          className="form-control ffcairo text-end"
                          {...register("password", {
                            required: true,
                            validate: (value: string) =>
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) &&
                              value.length >= 6,
                          })}
                        />
                        <div className="input-group-prepend pointer">
                          <i
                            className={`bi ${
                              passwordType === "password"
                                ? "bi-eye"
                                : "bi-eye-slash"
                            }`}
                            onClick={() =>
                              setPasswordType((prev: string) =>
                                prev === "password" ? "text" : "password"
                              )
                            }
                          ></i>
                        </div>
                        <Button
                          className="btn btn-secondary mx-2"
                          onClick={(ev) =>
                            handleClickRandomPassword(ev, setValue)
                          }
                        >
                          الإفتراضية
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-right text-danger">
                          برجاء إدخال كلمة المرور ويجب ألا تقل عن 6 أحرف وأن
                          تحتوي علي حرف capital وحرف small و رقم علي الأقل
                        </p>
                      )}
                    </Col>
                    <Col lg={6} className="d-flex flex-column ">
                      <Label
                        htmlFor="confirmpass"
                        className="ffcairo fw-bold text-muted"
                      >
                        تاكيد كلمة المرور
                      </Label>
                      <div className="d-flex align-items-center">
                        <input
                          id="verify_user"
                          autoComplete="new-password"
                          style={{ height: "34px" }}
                          className="form-control text-end p-3 ffcairo"
                          placeholder="تاكيد كلمة المرور"
                          type={passwordCheckType}
                          {...register("password_confirmation", {
                            required: true,
                            validate: (value: string) =>
                              value === getValues("password"),
                          })}
                        />
                        <div className="input-group-prepend pointer">
                          <i
                            className={`bi ${
                              passwordCheckType === "password"
                                ? "bi-eye"
                                : "bi-eye-slash"
                            }`}
                            onClick={() =>
                              setPasswordCheckType((prev: string) =>
                                prev === "password" ? "text" : "password"
                              )
                            }
                          ></i>
                        </div>
                      </div>

                      {errors.password_confirmation && (
                        <p className="text-right text-danger">
                          برجاء مطابقة كلمة المرور
                        </p>
                      )}
                    </Col>
                  </Row>

                  <Col lg={12} className="d-flex justify-content-end   mt-2 ">
                    <Button
                      color="primary"
                      size="lg"
                      style={{ fontFamily: "cairo" }}
                      className="px-5"
                      disabled={loading}
                    >
                      إضافة
                    </Button>
                  </Col>

                  <div className="mt-5"></div>
                </form>
              </div>
            </Card>
          </Col>
        </Row>
        <SuccessModal
          isOpen={modal}
          setOpen={setModal}
          text={message}
          toggle={() => {
            setModal(!modal);
            navigate("/teachers");
          }}
          actionClose={() => {
            setModal(false);
            navigate("/teachers");
          }}
        />
        <SuccessModal
          isOpen={modalError}
          setOpen={setModalError}
          text={messageError}
          toggle={() => {
            setModalError(!modalError);
          }}
          actionClose={() => {
            setModalError(false);
          }}
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddTeacher;
