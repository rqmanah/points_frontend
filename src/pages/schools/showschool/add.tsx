import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Label, Row } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
//@ts-ignore
import settingsImage from "../../../assets/settings.png";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
import { UserContext } from "../../../utils/userContext";
import UploadFile from "../../../components/UploadFile";
import useFetch from "../../../hooks/useFetch";

function AddSchool() {
  document.title = "اضافة مدرسة";
  const { user, loginContext } = useContext(UserContext);
  const [countries, setCountries] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  type school = {
    title: string;
    description: string;
    address: string;
    rows_id: number[];
    gender: string; // male or female
    image: string;
    country_id: string;
    is_active: boolean;
    grades_id: number[];
    type: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<school>();

  const endpoint = `school/manager/grades`;
  const { data: gradesData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  const fetchCountries = async () => {
    try {
      const response = await client.get(`school/manager/countries`);
      setCountries(response.data.result.data);
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

  const handlebutton = async (file: any) => {
    setSelectedImage(file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await client.post(`school/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setValue("image", response.data.result.data);
      toast.success("image uploaded successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<school> = async (data) => {
    setLoading(true);
    try {
      const { data: resData } = await client.post(
        `school/manager/school`,
        data
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          has_school: true,
          has_package: true,
          school_logo: resData.result.data.image,
          school: {
            ...resData.result.data,
          },
        })
      );
      loginContext({
        ...user,
        has_school: true,
        has_package: true,

        school_logo: resData.result.data.image,
        school: {
          ...resData.result.data,
        },
      });
      await new Promise((resolve) => {
        toast.success("تم اضافة مدرسة بنجاح", {
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
      navigate("/analytics");
    } catch (error: any) {
      const errors = error.response.data.data;
      for (const errorType in errors) {
        errors[errorType].forEach((errorMessage: any) => {
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchRows();
  }, [user]);
  if (user?.has_package == false && user?.has_school == false) {
    return (
      <div className="container-fluid" dir="rtl">
        <h3
          className="col-12 col-lg-3 col-md-4  col-sm-6 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center mt-5"
          style={{ border: "2px solid #A7C957", fontSize: "20px" }}
        >
          <div
            className="rounded-circle"
            style={{
              border: "2px solid #A7C957",
              width: "45px",
              background: "#A7C957",
              scale: "1.2",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img width={35} className="p-1" src={settingsImage} alt="" />
          </div>
          <div className="flex-grow-1 text-center">أكمل المعلومات المطلوبة</div>
        </h3>

        <Row className="d-flex justify-content-center my-5">
          <Col lg={8}>
            <Card className="px-2 mt-2">
              <div className=" mt-4  ">
                {selectedImage && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      alt="not found"
                      width={"50%"}
                      className="rounded-3"
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <br /> <br />
                    <Button
                      color="danger"
                      style={{ width: "100px" }}
                      className="border"
                      onClick={() => setSelectedImage(null)}
                    >
                      حذف
                    </Button>
                  </div>
                )}

                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className=" p-3 justify-content-center ">
                    <Col lg={10} className="d-flex flex-column ">
                      <Label for="title" className="ffcairo">
                        اسم المدرسة
                      </Label>
                      <input
                        id="title"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        onKeyPress={(e) => {
                          const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="form-control text-end p-3 ffcairo"
                        placeholder="اسم المدرسة"
                        type="text"
                        {...register("title", {
                          required: "اسم المدرسة مطلوب",
                          maxLength: {
                            value: 100,
                            message: "اسم المدرسة لا يجب أن يتجاوز 100 حرف",
                          },
                        })}
                      />
                      {errors.title && (
                        <span className="text-danger">
                          {errors.title.message}
                        </span>
                      )}
                    </Col>
                    <Col lg={10}>
                      <Label
                        for="grades"
                        className="ffcairo fw-bold text-muted"
                      >
                        إختر أو حدد المراحل الدراسية:
                      </Label>
                      <div className="d-flex flex-column  gap-4 flex-wrap  p-2">
                        {gradesData?.result?.data?.map(
                          (item: any, index: any) => (
                            <div key={index}>
                              <input
                                className="form-check-input text-end  ffcairo"
                                type="checkbox"
                                value={parseInt(item.id)}
                                id={item.id}
                                {...register("grades_id", {
                                  required:
                                    "يرجى تحديد مرحلة دراسية واحدة على الأقل",
                                })}
                              />
                              <label
                                className="form-check-label mx-2 ffcairo text-muted fw-bold"
                                htmlFor={item?.id}
                              >
                                {item?.title}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      {errors.grades_id && (
                        <span className="text-danger">
                          {errors.grades_id.message}
                        </span>
                      )}
                    </Col>
                    <Col lg={10}>
                      <Label for="type" className="ffcairo fw-bold text-muted">
                        نوع التعليم
                      </Label>
                      <div className="d-flex  gap-2 p-3">
                        <input
                          className="form-check-input mx-3 text-end  ffcairo"
                          type="radio"
                          value="governmental"
                          {...register("type", {
                            required: "نوع التعليم مطلوب",
                          })}
                        />
                        <Label check className="ffcairo text-muted fw-bold">
                          حكومي
                        </Label>

                        <input
                          className="form-check-input mx-3 text-end  ffcairo"
                          type="radio"
                          value="private"
                          {...register("type", {
                            required: "نوع التعليم مطلوب",
                          })}
                        />
                        <Label check className="ffcairo text-muted fw-bold">
                          خاص
                        </Label>
                      </div>
                      {errors.type && (
                        <span className="text-danger">
                          {errors.type.message}
                        </span>
                      )}
                    </Col>
                    <Col lg={10}>
                      <Label
                        for="gender"
                        className="ffcairo fw-bold text-muted"
                      >
                        نوع المدرسة
                      </Label>
                      <div className="p-3 d-flex gap-2">
                        <input
                          className="form-check-input mx-3 text-end ffcairo"
                          type="radio"
                          value="boys"
                          {...register("gender", {
                            required: "نوع المدرسة مطلوب",
                          })}
                        />
                        <Label check className="ffcairo text-muted fw-bold">
                          بنين
                        </Label>

                        <input
                          className="form-check-input mx-3 text-end ffcairo"
                          type="radio"
                          value="girls"
                          {...register("gender", {
                            required: "نوع المدرسة مطلوب",
                          })}
                        />
                        <Label check className="ffcairo text-muted fw-bold">
                          بنات
                        </Label>

                        <input
                          className="form-check-input mx-3 text-end  ffcairo"
                          type="radio"
                          value="mixed"
                          {...register("gender", {
                            required: "نوع المدرسة مطلوب",
                          })}
                        />
                        <Label check className="ffcairo text-muted fw-bold">
                          مختلط
                        </Label>
                      </div>
                      {errors.gender && (
                        <span className="text-danger">
                          {errors.gender.message}
                        </span>
                      )}
                    </Col>
                    <Col lg={10}>
                      <Label for="country" className="ffcairo">
                        الدولة
                      </Label>
                      <select
                        id="country"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control text-end p-1 ffcairo"
                        {...register("country_id", {
                          required: "يرجى اختيار الدولة",
                        })}
                        onChange={(e) =>
                          e.target.value &&
                          setValue("country_id", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <option value="" disabled selected>
                          اختر الدولة
                        </option>
                        {countries?.map((item: any, index: any) => (
                          <option key={index} value={`${item.id}`}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.country_id && (
                        <span className="text-danger">
                          {errors.country_id.message}
                        </span>
                      )}
                    </Col>
                    <Col lg={10} className="d-flex flex-column ">
                      <Label for="address" className="ffcairo">
                        العنوان
                      </Label>
                      <input
                        id="address"
                        placeholder="العنوان"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control text-end p-3 ffcairo"
                        type="text"
                        {...register("address", {
                          required: "يرجى إدخال العنوان",
                          maxLength: {
                            value: 200,
                            message: "العنوان لا يجب أن يتجاوز 200 حرف",
                          },
                        })}
                      />
                      {errors.address && (
                        <span className="text-danger">
                          {errors.address.message}
                        </span>
                      )}
                    </Col>
                    {/* <Col lg={10} className="p-4">
                    <p className="ffcairo text-muted fw-bold">حالة المدرسة</p>
                    <select
                      style={{
                        backgroundColor: "#EEF1F5",
                        borderRadius: "20px",
                      }}
                      className="form-control text-end p-3 ffcairo"
                      {...register("is_active", {
                        required: "يرجى تحديد حالة المدرسة",
                      })}
                    >
                      <option value="" disabled>
                        اختر الحالة
                      </option>
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
                      <span className="text-danger">
                        {errors.is_active.message}
                      </span>
                    )}
                  </Col> */}
                    <Col lg={10} className="p-3">
                      <Label
                        for="description"
                        className="ffcairo text-muted fw-bold"
                      >
                        الوصف
                      </Label>
                      <textarea
                        id="description"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control text-end p-3 ffcairo"
                        placeholder="الوصف"
                        {...register("description", {
                          required: "يرجى إدخال الوصف",
                          maxLength: {
                            value: 500,
                            message: "الوصف لا يجب أن يتجاوز 500 حرف",
                          },
                        })}
                      />
                      {errors.description && (
                        <span className="text-danger">
                          {errors.description.message}
                        </span>
                      )}
                    </Col>
                  </Row>
                  <div className="d-flex flex-column gap-2 px-4 col-12 col-lg-10 m-auto ">
                    <UploadFile
                      label={" صورة المدرسة"}
                      action={() => handlebutton(event.target.files[0])}
                    />
                  </div>
                  <Col lg={12} className="d-flex justify-content-center mt-5 ">
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
              </div>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  } else {
    navigate("/analytics");
  }
}

export default AddSchool;
