import { useContext, useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Card, Col, Label, Row } from "reactstrap"
import settingIcon from "../../../assets/sidebar/setting.png"
import PhoneInput2 from "../../../components/PhoneInput2"
import client from "../../../utils/client"
import { UserContext } from "../../../utils/userContext"
import SuccessModal from "../../../components/SuccessModal"

function ProfileSettings() {
  document.title = "اعدادات المستخدم"
  const [open, setOpen] = useState(false)

  type admin = {
    name: any
    user_name: any
    email: any
    gender: any
    password: any
    dialing_code: any
    // phone: any;
    is_active: any
  }
  type password = {
    password: string
    old_password: string
    password_confirmation: string
  }
  const { loginContext, user } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<boolean>(false)

  const methods = useForm<any>()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = methods
  const formValues: any = watch()

  useEffect(() => {
    if (formValues)
      Object.keys(formValues).forEach((key: string) => {
        //@ts-ignore
        if (formValues[key] && typeof formValues[key] == "string") {
          //@ts-ignore
          let trimmedValue = formValues[key]?.trimStart()
          //@ts-ignore
          if (trimmedValue !== formValues[key]) {
            //@ts-ignore
            setValue(key, trimmedValue)
          }
        }
      })
  }, [formValues, setValue])
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    getValues,
    formState: { errors: passwordErrors },
  } = useForm<password>()
  useEffect(() => {
    setValue("name", user?.name)
    setValue("email", user?.email)
    setValue("user_name", user?.user_name)
    setValue("dialing_code", user?.dialing_code)
    setValue("national_id", user?.national_id)
    setValue("gender", user?.gender)
    setValue("phone", user?.phone)
  }, [])

  const onSubmit: SubmitHandler<admin> = async (data) => {
    setLoading(true)
    try {
      await client
        .post(`school/manager/profile/update`, data)
        .then(({ data }) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...data.result.data,
              token: user?.token,
            })
          )
          loginContext({
            ...data.result.data,
            token: user?.token,
          })
        })
      await new Promise((resolve) => {
        // toast.success("تم تحديث  الملف الشخصي بنجاح", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   // hideProgressBar: false,
        //   // closeOnClick: true,
        //   // pauseOnHover: true,
        //   // draggable: true,
        //   // progress: undefined,
        //   // theme: "colored",
        //   onClose: () => resolve("success"),
        // });
        setOpen(true)
      })
    } catch (error: any) {
      // toast.error(error.response.data.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   // hideProgressBar: false,
      //   // closeOnClick: true,
      //   // pauseOnHover: true,
      //   // draggable: true,
      //   // progress: undefined,
      //   // theme: "light",
      //   // onClose: () => resolve("success"),
      setMessage(error.response.data.message)
      // })
        setOpen(true)

    } finally {
      setLoading(false)
    }
  }
  const passwordSubmit: SubmitHandler<password> = async (data: password) => {
    setLoading(true)
    try {
      await client.post(`school/manager/profile/password`, data)
      await new Promise((resolve) => {
        // toast.success("تم تحديث كلمة السر  بنجاح", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   // hideProgressBar: false,
        //   // closeOnClick: true,
        //   // pauseOnHover: true,
        //   // draggable: true,
        //   // progress: undefined,
        //   // theme: "colored",
        //   onClose: () => resolve("success"),
        // });
        
        setOpen(true)
      })
    } catch (error: any) {
      // toast.error(error.response.data.message, {
      //   position: "top-right",
      //   // autoClose: 5000,
      //   // hideProgressBar: false,
      //   // closeOnClick: true,
      //   // pauseOnHover: true,
      //   // draggable: true,
      //   // progress: undefined,
      //   theme: "light",
      // });
      setMessage(error.response.data.message)
        setOpen(true)

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container-fluid ">
      {/* <PageTitle title={"إعداد الملف الشخصي"} /> */}
      <h3
        className="col-10 col-lg-3 col-md-3  col-sm-4 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
          <img width={35} className="p-1" src={settingIcon} alt="" />
        </div>
        <div
          className="flex-grow-1 text-center "
          style={{
            fontSize: "16px",
          }}
        >
          {"اعدادات الملف الشخصي"}
        </div>
      </h3>
      <div className=" container  ">
        <Row className="justify-content-center">
          <Col xxl={6}>
            <Card className="px-2 mt-2 shadow-sm">
              <div className=" ">
                <FormProvider {...methods}>
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <Row className=" ">
                      <Col lg={6} className="d-flex flex-column ">
                        <Label htmlfor="name" className="ffcairo fw-bold">
                          الاسم
                        </Label>
                        <input
                          id="name"
                          placeholder="اسم المدير"
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control ffcairo text-end p-3"
                          type="text"
                          {...register("name", { required: true })}
                          onKeyPress={(e) => {
                            const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/
                            if (!regex.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                        />
                        <Col lg={6}>
                          {errors.name && (
                            <p className="text-right text-danger">
                              برجاء إدخال الاسم
                            </p>
                          )}
                        </Col>
                      </Col>
                      <Col lg={6} className="d-flex flex-column">
                        <Label className="ffcairo fw-bold">نوع المدير</Label>
                        <select
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control ffcairo text-end p-1 px-3"
                          {...register("gender", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            setValue("gender", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option disabled>اختر النوع</option>
                          {[
                            { type: "ذكر", value: "male" },
                            { type: "انثي", value: "female" },
                          ].map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.type}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col lg={12} className="d-flex flex-column ">
                        <Label htmlfor="email" className="ffcairo fw-bold">
                          البريد الإلكتروني
                        </Label>
                        <input
                          id="email"
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control ffcairo text-end p-3"
                          placeholder="البريد الإلكتروني"
                          type="email"
                          {...register("email", { required: true })}
                        />
                      </Col>
                      <Row>
                        <Col lg={6}>
                          {errors.email && (
                            <p className="text-right text-danger">
                              برجاء إدخال البريد الإلكتروني
                            </p>
                          )}
                        </Col>
                      </Row>

                      <Row className="m-auto ">
                        <Col lg={6} className=" p-0">
                          <PhoneInput2
                            label=" رقم الهاتف "
                            customClass="phone-input-class"
                            name="phone"
                          />
                        </Col>
                        <Col lg={6} className="d-flex flex-column p-0 pe-md-3">
                          <Label
                            htmlFor="national_id"
                            className="ffcairo fw-bold"
                          >
                            رقم الهوية
                          </Label>
                          <input
                            id="national_id"
                            placeholder=" رقم الهوية"
                            style={{
                              backgroundColor: "#EEF1F5",
                              borderRadius: "20px",
                            }}
                            className="form-control ffcairo text-end p-3"
                            type="text"
                            {...register("national_id", { required: true })}
                          />
                        </Col>
                      </Row>
                      {/* <Col lg={6} className="d-flex flex-column">
                      <Label htmlFor="user_name" className="ffcairo fw-bold">
                        اسم المستخدم
                      </Label>
                      <input
                        id="user_name"
                        placeholder="اسم المستخدم"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        type="text"
                        {...register("user_name", { required: true })}
                      />
                    </Col> */}

                      <Row>
                        <Col lg={6}>
                          {errors.user_name && (
                            <p className="text-right text-danger">
                              برجاء إدخال اسم المستخدم
                            </p>
                          )}
                        </Col>
                        <Col lg={6}>
                          {errors.gender && (
                            <p className="text-right text-danger">
                              برجاء إدخال النوع
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Row>

                    <Col
                      lg={12}
                      className="d-flex justify-content-center mt-3 "
                    >
                      <Button
                        color="primary"
                        size="lg"
                        style={{ fontFamily: "cairo" }}
                        className="px-5"
                        disabled={loading}
                      >
                        حفظ
                      </Button>
                    </Col>

                    <div className="mt-5"></div>
                  </form>
                </FormProvider>
              </div>
            </Card>
            <Card className="px-2 mt-2 shadow-sm">
              <div className=" ">
                <form
                  className=""
                  onSubmit={handleSubmitPassword(passwordSubmit)}
                >
                  <Row className=" ">
                    <Col lg={12} className="d-flex flex-column">
                      <Label htmlFor="exampleEmail" className="ffcairo fw-bold">
                        كلمة المرور القديمة
                      </Label>
                      <input
                        id="exampleEmail"
                        placeholder="كلمة المرور القديمة"
                        type="password"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        {...registerPassword("old_password", {
                          required: true,
                        })}
                      />
                      {passwordErrors.old_password && (
                        <p className="text-right text-danger">
                          برجاء إدخال كلمة المرور القديمة
                        </p>
                      )}
                    </Col>
                    <Col lg={12} className="d-flex flex-column">
                      <Label htmlFor="exampleEmail" className="ffcairo fw-bold">
                        كلمة المرور الجديدة
                      </Label>
                      <input
                        id="exampleEmail"
                        placeholder="كلمة المرور الجديدة"
                        type="password"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        {...registerPassword("password", {
                          required: true,
                          validate: (value: string) =>
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) &&
                            value.length >= 6,
                        })}
                      />
                      {passwordErrors.password && (
                        <p className="text-right text-danger">
                          برجاء إدخال كلمة المرور ويجب ألا تقل عن 6 أحرف وأن
                          تحتوي علي حرف capital وحرف small و رقم علي الأقل
                        </p>
                      )}
                    </Col>
                    <Col lg={12} className="d-flex flex-column">
                      <Label htmlFor="verify_user" className="ffcairo fw-bold">
                        تاكيد كلمة المرور
                      </Label>
                      <input
                        id="verify_user"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control text-end p-3 ffcairo"
                        placeholder="تاكيد كلمة المرور"
                        type="password"
                        {...registerPassword("password_confirmation", {
                          validate: (value: string) =>
                            value === getValues("password"),
                        })}
                      />
                      {passwordErrors.password_confirmation && (
                        <p className="text-right text-danger">
                          برجاء مطابقة كلمة المرور
                        </p>
                      )}
                    </Col>
                  </Row>

                  <Col lg={12} className="d-flex justify-content-center mt-3 ">
                    <Button
                      color="primary"
                      size="lg"
                      style={{ fontFamily: "cairo" }}
                      className="px-5"
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
      {/* <ToastContainer /> */}
      <SuccessModal
        isOpen={open}
        subText={message}
        setOpen={setOpen}
      text={"تم التحديث بنجاح"}students
        toggle={() => {
          setLoading(false)
          setOpen(!open)
        }}
      />
    </div>
  )
}

export default ProfileSettings
