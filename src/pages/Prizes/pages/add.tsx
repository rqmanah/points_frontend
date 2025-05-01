import { Link, useNavigate } from "react-router-dom";
// import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
//@ts-ignore
import prizeImage from "../../../assets/sidebar/image 1.png";
//@ts-ignore
import cupImage from "../../../assets/sidebar/cup.png";
import { UserContext } from "../../../utils/userContext";
import UploadFile from "../../../components/UploadFile";
import { useMutate } from "../../../hooks/useMutate";

function AddPrize() {
  document.title = "اضافة جائزة"
  const { user } = useContext(UserContext)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [uploadingImage, setUploadingImage] = useState<boolean>(false) // Used for image upload

  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  type prize = {
    title: string
    quantity: number
    price: number
    image: string
    min_stock: number
    order: number
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<prize>()
  const formValues: any = watch()
  const { mutate: handelSOrt, isPending: loadingSubmit } = useMutate({
    mutationKey: [`school/manager/prize/sort`],
    endpoint: `school/manager/prize/sort`,
    onSuccess: () => {},
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما")
    },
    formData: true,
  })

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
  const handlebutton = async (file: any) => {
    setUploadingImage(true) // Start loading spinner
    setSelectedImage(file)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await client.post(`school/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setValue("image", response.data.result.data)
      toast.success("image uploaded successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      console.log(error)
    } finally {
      setUploadingImage(false) 
    }
  }
  const onSubmit: SubmitHandler<prize> = async (data) => {
    setLoading(true)
    try {
      await client.post(`school/manager/prizes`, { ...data, min_stock: 2 })

      await new Promise((resolve) => {
        toast.success("تم اضافة جائزة بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => resolve("success"),
        })
      })
      navigate("/prizes")
    } catch (error: any) {
      const errors = error.response.data.data
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
          })
        })
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // fetchManagers();
  }, [])

  return (
    <div className="container-fluid">
      {/* <PageTitle title={"اضافة جائزة"} /> */}
      <h3
        className="col-12 col-lg-4 col-md-5  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
          <img width={35} className="p-1" src={prizeImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">{`متجر مدرسة ${
          user?.school?.title ?? ""
        }`}</div>
      </h3>

      <Row className="d-flex justify-content-center">
        <Col lg={10}>
          <Card
            className="px-2 mt-2"
            style={{
              border: "1px solid #007AB0B2",
            }}
          >
            <div
              className="col-10 align-items-center p-2"
              style={{ color: "#A7C957", fontSize: "22px" }}
            >
              <img src={cupImage} className="mx-2" />
              إضافة جائزة
            </div>
            <div className="  ">
              {selectedImage && (
                <div className="d-flex flex-column justify-content-center align-items-center">
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

              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <Row className=" p-3 ">
                  <Row xs={12}>
                    <Col
                      xs={3}
                      className="d-flex align-items-center col-6 col-lg-3 col-md-3 col-sm-3 "
                    >
                      <Label
                        for="address"
                        className=""
                        style={{
                          fontSize: "16.63px",
                          margin: "0 5px",
                        }}
                      >
                        الكمية المتاحة
                      </Label>
                      <input
                        id="address"
                        placeholder=""
                        className="f p-2 border-0"
                        style={{
                          width: "60.89px",
                          height: "44.26px",
                          backgroundColor: "#EEF1F5",
                          borderRadius: "10px",
                        }}
                        type="number"
                        {...register("quantity", { required: true })}
                      />
                      {errors.quantity && (
                        <p className="text-right text-danger">
                          برجاء إدخال الكمية
                        </p>
                      )}
                    </Col>
                    {/* <Col
                      xs={3}
                      className="d-flex align-items-center col-6 col-lg-3 col-md-3 col-sm-3 "
                    >
                      <Label
                        for="order"
                        className=""
                        style={{
                          fontSize: "16.63px",
                          margin: "0 5px",
                        }}
                      >
                        الترتيب
                      </Label>
                      <input
                        id="order"
                        placeholder=""
                        className="f p-2 border-0"
                        style={{
                          width: "60.89px",
                          height: "44.26px",
                          backgroundColor: "#EEF1F5",
                          borderRadius: "10px",
                        }}
                        type="number"
                        {...register("order", { required: false })}
                      />
                      {errors.quantity && (
                        <p className="text-right text-danger">
                          برجاء إدخال الكمية
                        </p>
                      )}
                    </Col> */}
                  </Row>
                  <Row
                    className="rounded mx-auto p-1 p-md-3 my-2 "
                    style={{ border: "1px solid #AAAAAA66" }}
                  >
                    <Col xs={6}>
                      <Label for="title" className="ffcairo">
                        اسم الجائزة
                      </Label>
                    </Col>
                    <Col xs={6}>
                      <Label for="address" className="ffcairo">
                        قيمة الجائزة
                      </Label>
                    </Col>
                    <Col xs={12} md={6} className="mt-2">
                      <input
                        id="title"
                        className="form-control ffcairo text-end p-3"
                        placeholder="اسم الجائزة"
                        style={{ height: "31px" }}
                        type="text"
                        {...register("title", { required: "true" })}
                      />
                      {errors.title && (
                        <p className="text-right text-danger">
                          برجاء إدخال اسم الجائزة
                        </p>
                      )}
                    </Col>
                    <Col xs={12} md={6} className="mt-2">
                      <input
                        id="address"
                        placeholder="قيمة الجائزة"
                        style={{ height: "31px" }}
                        className="form-control ffcairo text-end p-3"
                        type="number"
                        {...register("price", { required: true })}
                      />
                      {errors.price && (
                        <p className="text-right text-danger">
                          برجاء إدخال قيمة الجائزة
                        </p>
                      )}
                    </Col>

                    <Col xs={12}>
                      {/* <div className="d-flex flex-column   ">
                        <Label
                          for="title"
                          className="ffcairo fw-bold text-muted"
                        >
                          صورة الجائزة
                        </Label>

                        <div className="input-group d-flex flex-row-reverse  ">
                          <input
                            type="file"
                            className="form-control ffcairo text-end p-3 col-7"
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
                      </div> */}
                      <UploadFile
                        action={(event) => {
                          handlebutton(event.target.files[0])
                        }}
                        label={" صورة الجائزة"}
                      />
                    </Col>
                    {/* </Row> */}
                    <Col
                      // xs={6}
                      lg={12}
                      className="d-flex justify-content-center justify-content-md-end px-0 mt-5  gap-2"
                    >
                      <Button
                        color="primary"
                        // size="lg"
                        style={{
                          fontFamily: "cairo",
                          backgroundColor: "#0077B6",
                          width: "140px",
                        }}
                        className="px-md-5 mt-2 "
                        disabled={loading || uploadingImage}
                      >
                        إضافة
                      </Button>
                      <Link
                        to={"/prizes"}
                        className="btn btn-light px-md-5   mt-2"
                        style={{ border: "1px solid #cecece", width: "140px" }}
                      >
                        إلغاء
                      </Link>
                    </Col>
                  </Row>
                </Row>

                <div className="mt-5"></div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default AddPrize;
