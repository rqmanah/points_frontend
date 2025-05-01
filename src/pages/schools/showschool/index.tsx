import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
//@ts-ignore
import schoolImage from "../../../assets/school.jpg";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
import { CiEdit } from "react-icons/ci";
import { UserContext } from "../../../utils/userContext";

function ShowSchool() {
  document.title = "تعديل مدرسة";
  const [school, setSchool] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await client.get(`school/manager/school`);
      setSchool(response.data.result.data);
      setValue("title", response.data.result.data.title);
      setValue("description", response.data.result.description);
      setValue("address", response.data.result.data.address);
      setValue(
        "grades_id",
        response.data.result.data.grades.map((item: any) => {
          return String(item.id);
        })
      );
      setValue(
        "rows_id",
        response.data.result.data.rows.map((item: any) => {
          return String(item.id);
        })
      );
      setValue("gender", response.data.result.data.gender);
      setValue("country_id", response.data.result.data.country_id);
      setValue("user_id", response.data.result.data.user_id);
      setValue("type", response.data.result.data.type);
      setValue("is_active", response.data.result.data.is_active);
      setValue("description", response.data.result.data.description);
      setValue("image", response.data.result.data.image);
      setValue("name", response?.data.result.data.user.name);
      setValue("email", response?.data.result.data.user.email);
      setValue("user_name", response?.data.result.data.user.user_name);
      setValue("phone", response?.data.result.data.user.phone);
      setValue("dialing_code", response?.data.result.data.user.dialing_code);
      setValue(
        "manager_gender",
        response?.data.result.data.user.manager_gender
      );
      setValue(
        "manager_is_active",
        response?.data.result.data.user.manager_is_active
      );
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const [showEdition, setShowEditing] = useState(false);
  const [grades, setGrades] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  // const [managers, setManagers] = useState<any>([]);
  type school = {
    title: string;
    description: string;
    address: string;
    rows_id: any;
    gender: string; // male or female
    image: string;
    country_id: string;
    user_id: string;
    is_active: boolean;
    grades_id: any;
    type: string;
    name: string;
    user_name: string;
    phone: string;
    dialing_code: string;
    email: string;
    password: string;
    manager_is_active: any;
    manager_gender: string;
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<school>();
  const formValues: any = watch();
  const {user} = useContext(UserContext)

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
  const fetchGrades = async () => {
    try {
      const response = await client.get(`school/manager/grades`);
      setGrades(response.data.result.data);
    } catch (error) {
      console.log(error);
    }
  };
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
    setLoading(true);
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
      // toast.success("image uploaded successfully", {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit: SubmitHandler<school> = async (data) => {
    setLoading(true);
    try {
      await client.put(`school/manager/school`, data).then(async () => {
        await new Promise((resolve) => {
          toast.success("تم تعديل المدرسة بنجاح", {
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
        navigate("/schools/show");
      });
    } catch (error: any) {
      const errors = error.response.data.data;
      // Iterate through each error type
      for (const errorType in errors) {
        // Iterate through each error message in the array
        errors[errorType].forEach((errorMessage: any) => {
          // Display each error message using toast notification
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
    fetchGrades();
    fetchData();
    fetchCountries();
    fetchRows();
    setValue("type", school?.type);
    setValue("gender", school?.gender);
    setValue("description", school?.description);

    // fetchManagers();
  }, []);
  useEffect(() => {
    setValue("type", school?.type);
    setValue("gender", school?.gender);
    setValue("description", school?.description);

    // fetchManagers();
  }, [school?.description, school?.gender, school?.type, setValue]);

  return (
    <div className="container-fluid">
      {/* <PageTitle title={"تعديل المدرسة"} /> */}
      <h3
        className="col-12 col-lg-3 col-md-4  mb-4 col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
          <img
            width={40}
            height={40}
            className="p-1 rounded-5"
            src={user?.school?.image || user?.schools?.image}
            alt=""
          />
        </div>
        <div className="flex-grow-1 text-center">تعديل المدرسة</div>
      </h3>

      {school.length != 0 ? (
        <Row className="d-flex justify-content-center">
          {/* Conditionally render the selected image if it exists */}

          <br />

          <Col lg={8}>
            <Card>
              <CardBody>
                <Row className=" p-2">
                  <Col lg={6} className="order-lg-2 order-1">
                    <img
                      src={school?.image ? school.image : schoolImage}
                      className="flex-shrink-0 avatar-xl w-100 h-100 rounded-1  "
                      alt="..."
                      style={{
                        maxWidth: "432px",
                        maxHeight: "288px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col lg={6} className="order-lg-1 order-2 ">
                    <div className=" d-flex justify-content-center justify-content-lg-start  position-relative flex-wrap gap-3">
                      <div className=" col-12 ">
                        <div className="d-flex gap-2 align-items-center ">
                          <h5 className="my-3 fs-2  ffcairo text-center text-lg-end text-lg-start">
                            تفاصيل المدرسة
                          </h5>
                          <p
                            style={{
                              cursor: "pointer",
                            }}
                            className="my-3  "
                            onClick={() => setShowEditing(true)}
                          >
                            <CiEdit className="fs-3" />
                          </p>
                        </div>
                        <div className="d-flex flex-between  justify-content-lg-start justify-content-md-center  flex-wrap gap-2 ">
                          <p className="ffcairo text-muted fw-bold">الأسم:</p>
                          <p className="ffcairo text-muted">{school?.title}</p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">العنوان:</p>
                          <p className="ffcairo text-muted">
                            {school?.address}
                          </p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">
                            نوع المدرسة:
                          </p>
                          <p
                            className="ffcairo text-muted"
                            style={{ direction: "ltr" }}
                          >
                            {school?.gender == "boys"
                              ? "بنين"
                              : school?.gender == "girls"
                              ? "بنات"
                              : "مختلط"}{" "}
                            {school?.phone}
                          </p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">
                            المراحل الدراسية:
                          </p>
                          {school?.grades?.map((item: any, index: any) => {
                            return (
                              <Badge
                                color="success"
                                key={index}
                                className="ffcairo rounded-3 bg-success text-center d-block h-50 mt-1"
                              >
                                {item?.title}
                              </Badge>
                            );
                          })}
                        </div>
                        {/* <div className="d-flex flex-between flex-wrap mt-2 gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold"> الصفوف:</p>
                          {school?.rows?.length == 0
                            ? "---------"
                            : school?.rows?.map((item: any, index: any) => {
                                return (
                                  <Badge
                                    color="success"
                                    key={index}
                                    className="ffcairo rounded-3  bg-success text-center d-block h-50 mt-1"
                                  >
                                    {item?.title ? item.title : "------"}
                                  </Badge>
                                );
                              })}
                        </div> */}
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">
                            حالة الحساب:
                          </p>
                          {school?.is_active == 1 ? (
                            <Badge className="ffcairo rounded-3 bg-success text-center d-block px-2 py-1 h-50 mt-1">
                              فعال{" "}
                            </Badge>
                          ) : (
                            <Badge className="ffcairo rounded-3 bg-secondary text-center d-block px-2 py-1 h-50 mt-1">
                              غير فعال{" "}
                            </Badge>
                          )}
                        </div>
                        {/* <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">
                            {" "}
                            تاريخ الأنضمام:
                          </p>
                          <p className="ffcairo text-muted">
                            {school?.created_at}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {showEdition && (
            <Col lg={8}>
              <Card className="px-2 mt-2">
                <div className=" mt-4  ">
                  {/* Conditionally render the selected image if it exists */}
                  {selectedImage && (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      {/* Display the selected image */}
                      <img
                        alt="not found"
                        width={"50%"}
                        className="rounded-3"
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <br /> <br />
                      {/* Button to remove the selected image */}
                      <Button
                        color="danger"
                        style={{ width: "100px" }}
                        className="border"
                        onClick={() => setSelectedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="d-flex flex-column gap-2 p-2 col-12 col-lg-10  m-auto">
                    <Label for="title" className="ffcairo fw-bold text-muted">
                      صورة المدرسة
                    </Label>

                    <div className="input-group d-flex flex-row-reverse  justify-content-center align-items-center">
                      <input
                        type="file"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control text-end p-3 ffcairo col-7"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        name="myImage"
                        onChange={(event) => {
                          // Log the selected file
                          //@ts-ignore
                          handlebutton(event.target.files[0]);
                          // Update the state with the selected file
                        }}
                      />
                    </div>
                  </div>
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="justify-content-center ">
                      <Col lg={10} className=" ">
                        <Label
                          for="title"
                          className="ffcairo text-muted fw-bold"
                        >
                          اسم المدرسة
                        </Label>
                        <input
                          id="title"
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control text-end p-3 ffcairo"
                          placeholder="اسم المدرسة"
                          type="text"
                          {...register("title", { required: true })}
                          onKeyPress={(e) => {
                            const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.title && (
                          <p className="text-right text-danger">
                            برجاء إدخال اسم المدرسة
                          </p>
                        )}
                      </Col>
                      <Col lg={10} className="">
                        <Label
                          for="address"
                          className="ffcairo fw-bold text-muted"
                        >
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
                          {...register("address", { required: true })}
                          onKeyPress={(e) => {
                            const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.address && (
                          <p className="text-right text-danger">
                            برجاء إدخال عنوان المدرسة
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
                        <Label
                          for="country"
                          className="ffcairo text-muted fw-bold"
                        >
                          الدولة
                        </Label>

                        <select
                          id="country"
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control text-end p-1 px-3 ffcairo"
                          {...register("country_id", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            setValue("country_id", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option value="" disabled>
                            اختر الدولة
                          </option>
                          {countries?.map((item: any, index: any) => (
                            <option key={index} value={`${item.id}`}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.country_id && (
                          <p className="text-right text-danger">
                            برجاء إدخال الدولة
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          إختر أو حدد المراحل الدراسية:
                        </Label>

                        <div className="d-flex  flex-wrap flex-column gap-3  p-2 ">
                          {grades.map((item: any, index: any) => {
                            return (
                              <div key={index}>
                                <input
                                  className="form-check-input mx-2 "
                                  type="checkbox"
                                  value={parseInt(item.id)}
                                  id={item.id}
                                  {...register("grades_id", { required: true })}
                                />
                                <label
                                  className="form-check-label ffcairo text-muted fw-bold"
                                  htmlFor={item?.id}
                                >
                                  {item?.title}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        {errors.grades_id && (
                          <p className="text-right text-danger">
                            برجاء إختيار مرحلة دراسية علي الأقل
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          نوع التعليم
                        </Label>

                        <div className="d-flex gap-2 p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="governmental"
                            {...register("type", { required: true })}
                          />
                          <Label check className="ffcairo text-muted fw-bold">
                            حكومي
                          </Label>

                          <input
                            className="form-check-input"
                            type="radio"
                            value="private"
                            {...register("type", { required: true })}
                          />
                          <Label check className="ffcairo text-muted fw-bold">
                            خاص
                          </Label>
                        </div>
                        {errors.type && (
                          <p className="text-right text-danger">
                            برجاء إختيار نوع التعليم
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          نوع المدرسة
                        </Label>
                        <div className="p-3 d-flex gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="boys"
                            {...register("gender", { required: true })}
                          />
                          <Label check className="ffcairo text-muted fw-bold">
                            بنين
                          </Label>

                          <input
                            className="form-check-input"
                            type="radio"
                            value="girls"
                            {...register("gender", { required: true })}
                          />
                          <Label check className="ffcairo text-muted fw-bold">
                            بنات
                          </Label>

                          <input
                            className="form-check-input"
                            type="radio"
                            value="mixed"
                            {...register("gender", { required: true })}
                          />
                          <Label check className="ffcairo text-muted fw-bold">
                            مختلط
                          </Label>
                        </div>
                        {errors.gender && (
                          <p className="text-right text-danger">
                            برجاء إختيار نوع المدرسة
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
                        <p className="ffcairo text-muted fw-bold">
                          حالة المدرسة
                        </p>
                        <select
                          style={{
                            backgroundColor: "#EEF1F5",
                            borderRadius: "20px",
                          }}
                          className="form-control text-end p-3 ffcairo"
                          {...register("is_active", { required: true })}
                          onChange={(e) =>
                            e.target.value &&
                            //@ts-ignore
                            setValue("is_active", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option disabled>اختر الحالة</option>
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
                            برجاء إختيار حالة المدرسة
                          </p>
                        )}
                      </Col>
                      <Col lg={10}>
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
                          {...register("description", { required: true })}
                        />
                        {errors.description && (
                          <p className="text-right text-danger">
                            برجاء إدخال الوصف
                          </p>
                        )}
                      </Col>

                      <Col
                        lg={12}
                        className="d-flex justify-content-center mt-5 "
                      >
                        {!loading && (
                          <Button
                            color="primary"
                            size="lg"
                            style={{ fontFamily: "cairo" }}
                            className="px-5"
                          >
                            حفظ
                          </Button>
                        )}
                        {loading && (
                          <Button
                            color="primary"
                            size="lg"
                            style={{ fontFamily: "cairo" }}
                            className="px-5"
                            disabled
                          >
                            <Spinner className="" color="white">
                              Loading...
                            </Spinner>
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <div></div>

                    <div className="mt-5"></div>
                  </form>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      ) : (
        <div className="container  d-flex justify-content-center">
          <Spinner className="m-5" color="primary">
            Loading...
          </Spinner>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ShowSchool;
