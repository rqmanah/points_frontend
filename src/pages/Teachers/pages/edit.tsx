// import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row } from "reactstrap";
//@ts-ignore
import person from "../../../assets/dummy-person.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
//@ts-ignore
import teachersImage from "../../../assets/sidebar/image 6.png";
import { handleClickRandomPassword } from "../../../utils/api.functions";
function EditTeacher() {
  document.title = "تعديل المعلم";
  const { id } = useParams();
  const navigate = useNavigate();
  const [moderator, setModerator] = useState<any>({});
  const [passwordType, setPasswordType] = useState("password");

  type moderator = {
    name: string;
    user_name: string;
    password: string;
    is_active: boolean;
    password_confirmation: string;
    national_id:string
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm<moderator>();
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
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<moderator> = async (data) => {
    setLoading(true);
    try {
      await client.put(`school/manager/teachers/${id}`, data);
      await new Promise((resolve) => {
        toast.success("تم تحديث الحساب بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => resolve("success"),
        });
      });
      navigate("/teachers");
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchData = () => {
    client
      .get(`school/manager/teachers/${id}`)
      .then((response) => {
        // setModerators(response.data.result.data);
        setModerator(response.data.result.data);
        setValue("name", response?.data.result.data.name);
        setValue("user_name", response?.data.result.data.user_name);
        setValue("is_active", response?.data.result.data.is_active);
        setValue("national_id", response?.data.result.data.national_id);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
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
          <img width={35} className="p-1" src={teachersImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">المعلمين</div>
      </h3>
      {/* <PageTitle title={"تعديل مدير"} /> */}
      <div className="container">
        <div className="row gap-5 d-flex justify-content-center mt-5">
          <div></div>
        </div>
        <Row className="d-flex justify-content-center">
          <Col lg={10}>
            <Card className="px-5 mt-2">
              <div className=" ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Col xs={12}>
                    <div
                      className="align-items-center p-2 text-center fw-bold"
                      style={{ color: "#368AAF", fontSize: "22px" }}
                    >
                      تعديل معلم
                    </div>
                  </Col>
                  <Row
                    className="rounded py-3"
                    style={{ border: "1px solid #cecece" }}
                  >
                    <Col lg={6} className="d-flex flex-column ">
                      <Label for="name" className="ffcairo text-muted fw-bold">
                        الاسم
                      </Label>
                      <input
                        id="name"
                        style={{ height: "34px" }}
                        placeholder="اسم المعلم"
                        className="form-control ffcairo text-end p-3"
                        type="text"
                        {...register("name", { required: true })}
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

                    {/* <Col lg={6}>
                      <Label
                        for="user_name"
                        className="ffcairo text-muted fw-bold"
                      >
                        اسم المستخدم
                      </Label>
                      <input
                        id="user_name"
                        style={{ height: "34px" }}
                        placeholder="اسم المستخدم"
                        className="form-control ffcairo text-end p-3"
                        type="text"
                        {...register("user_name", { required: true })}
                      />
                      {errors.user_name && (
                        <p className="text-right text-danger">
                          برجاء إدخال اسم المستخدم
                        </p>
                      )}
                    </Col> */}
                    <Col lg={6}>
                      <Label for="title" className="ffcairo fw-bold text-muted">
                        الحالة
                      </Label>

                      <select
                        className="form-control ffcairo text-end"
                        style={{ height: "36px" }}
                        {...register("is_active", { required: true })}
                        onChange={(e) =>
                          e.target.value &&
                          //@ts-ignore
                          setValue("is_active", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <option>اختر الحالة</option>
                        {[
                          { type: "فعال", value: "1" },
                          { type: " غير فعال", value: "0" },
                        ].map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.type}
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
                    {/* <Col lg={6} className="d-flex flex-column">
                      <Label
                        for="password"
                        className="ffcairo fw-bold  text-muted"
                      >
                        كلمة المرور
                      </Label>
                      <div className="d-flex align-items-center">
                        <input
                          style={{ height: "34px" }}
                          id="password"
                          className="form-control ffcairo text-end"
                          placeholder="كلمة المرور الجديدة"
                          type={passwordType}
                          {...register("password", {
                            validate: (value: string) =>
                              !value ||
                              (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) &&
                                value.length >= 6),
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
                        htmlFor="confirmpass"
                        className="ffcairo fw-bold text-muted"
                      >
                        تاكيد كلمة المرور
                      </Label>
                      <input
                        id="confirmpass"
                        style={{ height: "34px" }}
                        placeholder="تاكيد كلمة المرور"
                        type="password"
                        className="form-control text-end ffcairo"
                        {...register("password_confirmation", {
                          validate: (value: string) =>
                            value === getValues("password"),
                        })}
                      />
                      {errors.password_confirmation && (
                        <p className="text-right text-danger">
                          برجاء مطابقة كلمة المرور
                        </p>
                      )}
                    </Col> */}
                  </Row>

                  <Col lg={12} className="d-flex justify-content-end mt-2 ">
                    <Button
                      color="primary"
                      className="px-5"
                      size="lg"
                      style={{ fontFamily: "cairo" }}
                      disabled={loading}
                    >
                      تحديث
                    </Button>
                  </Col>

                  <div className="mt-5"></div>
                </form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTeacher;
