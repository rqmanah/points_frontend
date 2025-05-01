import { ToastContainer, toast } from "react-toastify";
// import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row } from "reactstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import client from "../../../utils/client";
import { getErrors } from "../../../utils";
//@ts-ignore
import studentsImage from "../../../assets/sidebar/image 5.png";
import { handleClickRandomPassword } from "../../../utils/api.functions";
import PhoneInput2 from "../../../components/PhoneInput2";
import SuccessModal from "../../../components/SuccessModal";
function AddStudent() {
  document.title = "اضافة طالب";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  type student = {
    name: string;
    user_name: string;
    row_id: number;
    class_id: number;
    grade_id: number;
    national_id: string;
    password: string;
    is_active: number;
    guardian_phone: string;
    password_confirmation: string;
  };
  const methods = useForm<student>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = methods;
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
  const [grades, setGrades] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordCheckType, setPasswordCheckType] = useState("password");
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  console.log("🚀 ~ AddStudent ~ messageError:", messageError);

  const [selectedValue, setSelectedValue] = useState("1");

  const fetchGrades = async () => {
    try {
      const response = await client.get(`school/manager/school/grades`);
      setGrades(response.data.result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRows = async () => {
    try {
      const response = await client.get(`school/manager/rows`);
      setRows(response.data.result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClasses = async () => {
    try {
      const response = await client.get(`school/manager/classes`);
      setClasses(response.data.result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<student> = async (data) => {
    setLoading(true);
    try {
      const response = await client.post(`school/manager/students`, data); // Capture the response
      await new Promise((resolve) => {
        setModal(true);
        setMessage(response.data.message);
      });
    } catch (error: any) {
      const errorMessage = getErrors(error.response.data.data).join(", ");

      setModalError(true);
      setMessageError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchGrades();
    fetchRows();
  }, []);
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
          <img width={35} className="p-1" src={studentsImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">الطلاب</div>
      </h3>
      <div className="container  ">
        <Row className="d-flex justify-content-center">
          <Col xxl={10}>
            <Card className="px-5 mt-2">
              <div className=" ">
                <FormProvider {...methods}>
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <Col xs={12}>
                      <div
                        className="align-items-center p-2 text-center fw-bold"
                        style={{ color: "#368AAF", fontSize: "22px" }}
                      >
                        إضافة الطلاب
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
                          style={{ height: "34px" }}
                          className="form-control ffcairo text-end p-3 has-error"
                          placeholder="اسم الطالب"
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
                            برجاء إدخال اسم الطالب
                          </p>
                        )}
                      </Col>

                      {/* <Col lg={6}>
                        <Label
                          for="exampleEmail"
                          className="ffcairo fw-bold text-muted"
                        >
                          اسم المستخدم
                        </Label>
                        <input
                          id="exampleEmail"
                          autoComplete="off"
                          placeholder="اسم المستخدم"
                          style={{ height: "34px" }}
                          type="text"
                          className="form-control ffcairo text-end p-3"
                          {...register("user_name", { required: true })}
                        />
                        {errors.user_name && (
                          <p className="text-right text-danger">
                            برجاء إدخال اسم المستخدم
                          </p>
                        )}
                      </Col> */}
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
                        {/* <Label
                        for="exampleDadPhone"
                        className="ffcairo fw-bold text-muted"
                      >
                        رقم الهاتف لوالد الطالب
                      </Label>
                      <input
                        id="exampleDadPhone"
                        style={{ height: "34px" }}
                        placeholder="رقم الهاتف لوالد الطالب"
                        type="text"
                        className="form-control ffcairo text-end p-3"
                        {...register("guardian_phone", { required: true })}
                      /> */}
                        <div className="mb-3 col-12">
                          <PhoneInput2
                            label=" رقم الهاتف لوالد الطالب"
                            customClass="phone-input-class"
                            name="guardian_phone"
                          />
                        </div>

                        {errors.guardian_phone && (
                          <p className="text-right text-danger">
                            برجاء إدخال رقم الهاتف للوالد
                          </p>
                        )}
                      </Col>

                      <Col lg={6}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          المرحلة الدراسية
                        </Label>
                        <select
                          style={{ height: "36px" }}
                          className="form-control ffcairo text-end"
                          {...register("grade_id", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            //@ts-ignore
                            setValue("grade_id", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option value={""} selected disabled>
                            اختر المرحلة التعليمية
                          </option>
                          {grades.map((item: any, index: number) => (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                        {errors.grade_id && (
                          <p className="text-right text-danger">
                            برجاء اختيار المرحلة التعليمية{" "}
                          </p>
                        )}
                      </Col>
                      <Col lg={6}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          الصف
                        </Label>
                        <select
                          style={{ height: "36px" }}
                          className="form-control ffcairo text-end "
                          {...register("row_id", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            //@ts-ignore
                            setValue("row_id", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option disabled selected value={""}>
                            اختر الصف{" "}
                          </option>
                          {rows.map((item: any, index: number) => (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                        {errors.row_id && (
                          <p className="text-right text-danger">
                            برجاء إختيار الصف{" "}
                          </p>
                        )}
                      </Col>
                      <Col lg={6}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          الفصل
                        </Label>
                        <select
                          style={{ height: "36px" }}
                          className="form-control ffcairo text-end"
                          {...register("class_id", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            //@ts-ignore
                            setValue("class_id", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option selected disabled value={""}>
                            اختر الفصل
                          </option>
                          {classes.map((item: any, index: number) => (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                        {errors.class_id && (
                          <p className="text-right text-danger">
                            برجاء اختيار الفصل{" "}
                          </p>
                        )}
                      </Col>
                      <Col lg={6}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          الحالة
                        </Label>
                        <select
                          style={{ height: "36px" }}
                          className="form-control ffcairo text-end"
                          {...register("is_active", { required: true })}
                          value={selectedValue} // القيمة الحالية
                          onChange={(e) => {
                            setSelectedValue(e.target.value); // تحديث القيمة عند التغيير
                            //@ts-ignore
                            setValue("is_active", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <option value={""} disabled>
                            اختر الحالة
                          </option>
                          {[
                            { type: "فعال", value: "1" },
                            { type: "غير فعال", value: "0" },
                          ].map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.type}
                            </option>
                          ))}
                        </select>

                        {errors.is_active && (
                          <p className="text-right text-danger">
                            برجاء اختيار الحالة{" "}
                          </p>
                        )}
                      </Col>
                      <Col lg={6} className="d-flex flex-column">
                        <Label
                          for="exampleEmail"
                          className="ffcairo fw-bold text-muted"
                        >
                          كلمة المرور
                        </Label>
                        <div className="d-flex align-items-center">
                          <input
                            id="exampleEmail"
                            placeholder=" كلمة المرور"
                            style={{ height: "34px" }}
                            autoComplete="new-password"
                            type={passwordType}
                            className="form-control ffcairo text-end p-3"
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
                      <Col lg={6} className="d-flex flex-column">
                        <Label
                          htmlFor="verify_user"
                          className="ffcairo fw-bold"
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

                    <Col lg={12} className="d-flex justify-content-end   mt-1 ">
                      <Button
                        color="primary"
                        size="lg"
                        style={{ fontFamily: "cairo" }}
                        className="px-5 mt-5"
                        disabled={loading}
                      >
                        إضافة
                      </Button>
                    </Col>

                    <div className="mt-5"></div>
                  </form>
                </FormProvider>
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
            navigate("/students");
          }}
          actionClose={() => {
            setModal(false);
            navigate("/students");
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

export default AddStudent;
