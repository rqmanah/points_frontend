import { useNavigate } from "react-router-dom";
// import PageTitle from "../../../components/PageTitle";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import client from "../../../utils/client";
//@ts-ignore

import HeadPhoneIcon from "../../../components/icons/HeadPhoneIcon";
import SupportIcon from "../../../components/icons/SupportIcon";
import UploadFile from "../../../components/UploadFile";
function AddTicket() {
  document.title = "اضافة تذكرة";
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  type ticket = {
    message: string;
    image: any;
    subject: string;
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ticket>();
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
  // const fetchSchools = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}school/manager/tickets`);
  //     setSchools(response.data.result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchManagers = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}mcp/managers`);
  //     setManagers(response.data.result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const onSubmit: SubmitHandler<ticket> = async (data) => {
    setLoading(true);
    try {
      const res = await client.post(`school/manager/tickets`, data);
      await new Promise((resolve) => {
     
        setMessage(res);
        setOpen(true);
      });
      // navigate("/support");
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

  return (
    <div className="container-fluid">
      {/* <PageTitle title={"اضافة تذكرة"} /> */}
      <h3
        className="col-10 col-lg-2 col-md-3 col-sm-4 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
        style={{
          border: "2px solid #A7C957",
          fontSize: "24px",
          borderRight: "transparent",
          width: "204px",
        }}
      >
        <div
          className="rounded-circle"
          style={{
            border: "2px solid #A7C957",
            width: "45px",
            height: "45px",
            padding: "6px",
            scale: "1.6",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SupportIcon />
        </div>
        <div className="flex-grow-1 text-center mx-3">الدعم الفني</div>
      </h3>
      <br />

      {/* Input element to select an image file */}

      <Row className="d-flex justify-content-center">
        {/* Conditionally render the selected image if it exists */}

        <br />
        <Col xs={12} lg={10}>
          <Card className="px-3 px-md-5 mt-2">
            <div className=" mt-4  ">
              <Col xs={12}>
                <div
                  className="align-items-center p-1 text-center fw-bold"
                  style={{ color: "#368AAF", fontSize: "22px" }}
                >
                  إنشاء تذكرة دعم جديدة
                </div>
              </Col>
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
                    حذف
                  </Button>
                </div>
              )}

              <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                <Row
                  className="rounded py-3 mt-2 w-100"
                  style={{ border: "1px solid #cecece" }}
                >
                  <Col lg={12}>
                    <Label for="country" className="ffcairo">
                        عنوان المشكلة 
                    </Label>
                    <input
                      type="text"
                     
                      className="form-control ffcairo text-end "
                      {...register("subject", { required: true })}
                    />
                    {errors.subject && (
                      <p className="text-right text-danger">
                        برجاء إدخال عنوان التذكرة
                      </p>
                    )}
                  </Col>

                  <Col lg={6}>
                    <Label for="description" className="ffcairo">
                      الوصف
                    </Label>
                    <textarea
                      id="description"
                      className="form-control ffcairo text-end custom_input"
                      placeholder="الوصف"
                      {...register("message", { required: true })}
                      rows={5}
                    />
                    {errors.message && (
                      <p className="text-right text-danger">
                        برجاء إدخال الوصف
                      </p>
                    )}
                  </Col>
                  <Col lg={6}>
                    <UploadFile
                      action={(event) => {
                        handlebutton(event.target.files[0]);
                      }}
                      label={" صورة التذكرة"}
                    />
                  </Col>
                  <Col lg={12} className="d-flex justify-content-end mt-2   ">
                    {!loading && (
                      <Button
                        color="primary"
                        size="lg"
                        style={{ fontFamily: "cairo" }}
                        className="px-5 "
                        disabled={loading}
                      >
                        إضافة
                      </Button>
                    )}
                    {loading && (
                      <Button
                        color="primary"
                        size="lg"
                        style={{ fontFamily: "cairo" }}
                        className="px-5"
                      >
                        <Spinner className="" color="white">
                          Loading...
                        </Spinner>
                      </Button>
                    )}
                  </Col>
                </Row>

                <div className="mt-5"></div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={open} toggle={""} centered>
        <ModalHeader className="border-bottom-0 justify-content-center">
          <HeadPhoneIcon />
        </ModalHeader>
        <ModalBody className="d-flex flex-column  align-items-center">
          <p style={{ fontSize: "24px", color: "#0077B6", fontWeight: "bold" }}>
            تم إرسال تذكرة رقم {message?.data?.result?.data?.id}
          </p>
          <p style={{ fontSize: "24px", color: "#0077B6", fontWeight: "bold" }}>
            وسوف يتم الرد باسرع وقت
          </p>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={ () => {setOpen(false)
              navigate("/support")
            }}
            style={{
              backgroundColor: "#FF4F4F",
              border: "0px solid",
              width: "108px",
              height: "50px",
              fontSize: "18px",
            }}
          >
            تم
          </button>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default AddTicket;
