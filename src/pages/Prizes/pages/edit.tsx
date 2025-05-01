import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
//@ts-ignore
import dummyGift from "../../../assets/dummy-gift.jpg";

import { Button, Card, CardBody, Col, Label, Row, Spinner } from "reactstrap";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "../../../utils/client";
import UploadFile from "../../../components/UploadFile";

function EditPrize() {
  document.title = "تعديل جائزة";
  const { id } = useParams();
  const [prize, setPrize] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      const response = await client.get(`school/manager/prizes/${id}/edit`);
      setPrize(response.data.result.data);
      setValue("title", response.data.result.data.title);
      setValue("stock", response.data.result.data.stock);
      setValue("price", response.data.result.data.price);
      setValue("image", response.data.result.data.image);
      setValue("web_image", response.data.result.data.wb_image);
      setValue("min_stock", response?.data.result.data.min_stock);
      setValue("quantity", response?.data.result.data.quantity);
      setValue("order", response?.data.result.data.order);

    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  type prize = {
    title: string;
    stock: number;
    price: string;
    min_stock: any;
    stock: any;
    image: string;
    web_image: string;
    order:string
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm<prize>();
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
  const onSubmit: SubmitHandler<prize> = async (data) => {
    setLoading(true);
    try {
      // @ts-ignore
      // await axios.post(`${apiUrl}mcp/store`, { image: image[0]?.name });
      await client.put(`school/manager/prizes/${id}`, {...data ,min_stock:"2"});
      await new Promise((resolve) => {
        toast.success("تم تعديل الجائزة بنجاح", {
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
      navigate("/prizes");
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
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <PageTitle title={"تعديل جائزة"} />

      {prize.length != 0 ? (
        <Row className="d-flex justify-content-center">
          {/* Conditionally render the selected image if it exists */}

          <br />

          <Col lg={8}>
            <Card>
              <CardBody>
                <Row className=" p-2">
                  <Col lg={6} className="order-lg-2 order-1">
                    <img
                      src={prize?.web_image ? prize.web_image : dummyGift}
                      className="flex-shrink-0   avatar-xl rounded-3 "
                      alt="..."
                      style={{
                        height: "400px",
                        width: "400px",
                        objectFit: "fill",
                      }}
                    />
                  </Col>
                  <Col lg={6} className="order-lg-1 order-2 ">
                    <div className=" d-flex justify-content-center justify-content-lg-start  position-relative flex-wrap gap-3">
                      <div className=" col-12 ">
                        <h5 className="my-3 fs-2  ffcairo text-center text-lg-end text-lg-start">
                          تفاصيل الجائزة
                        </h5>
                        <div className="d-flex flex-between  justify-content-lg-start justify-content-md-center  flex-wrap gap-2 ">
                          <p className="ffcairo text-muted fw-bold">الأسم:</p>
                          <p className="ffcairo text-muted">{prize?.title}</p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">الكمية:</p>
                          <p className="ffcairo text-muted">{prize?.quantity}</p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">
                            أقل كمية:
                          </p>
                          <p className="ffcairo text-muted">
                            {prize?.min_stock}
                          </p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">السعر:</p>
                          <p
                            className="ffcairo text-muted"
                            style={{ direction: "ltr" }}
                          >
                            {prize?.price}
                          </p>
                        </div>
                        <div className="d-flex flex-between flex-wrap gap-2 justify-content-lg-start justify-content-md-center">
                          <p className="ffcairo text-muted fw-bold">الترتيب:</p>
                          <p
                            className="ffcairo text-muted"
                            style={{ direction: "ltr" }}
                          >
                            {prize?.order}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
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
                <div className="">
                  {/* <Label for="title" className="ffcairo fw-bold text-muted">
                    صورة الجائزة
                  </Label>

                  <div className="input-group d-flex flex-row-reverse  ">
                    <input
                      type="file"
                      style={{
                        backgroundColor: "#EEF1F5",
                        borderRadius: "20px",
                      }}
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
                  </div> */}
                  <UploadFile
                    action={(event) => {
                      handlebutton(event.target.files[0]);
                    }}
                    label={" صورة الجائزة"}
                  />
                </div>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className=" p-3 justify-content-center ">
                    <Col lg={10} className="d-flex flex-column ">
                      <Label for="title" className="ffcairo fw-bold text-muted">
                        اسم الجائزة
                      </Label>
                      <input
                        id="title"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        placeholder="اسم الجائزة"
                        type="text"
                        {...register("title", { required: "true" })}
                      />
                      {errors.title && (
                        <p className="text-right text-danger">
                          برجاء إدخال اسم الجائزة
                        </p>
                      )}
                    </Col>

                    <Col lg={10} className="d-flex flex-column ">
                      <Label
                        for="address"
                        className="ffcairo fw-bold text-muted"
                      >
                        السعر
                      </Label>
                      <input
                        id="address"
                        placeholder="السعر"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        type="number"
                        min={0}
                        {...register("price", { required: true, min: 0 })}
                      />
                      {errors.price && (
                        <p className="text-right text-danger">
                          برجاء إدخال سعر الجائزة
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row className="p-3 justify-content-center">
                    <Col lg={10} className="d-flex flex-column ">
                      <Label
                        for="exampleEmail"
                        className="ffcairo text-muted fw-bold"
                      >
                        الكمية
                      </Label>
                      <input
                        type="number"
                        id="name"
                        placeholder="الكمية "
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3 has-error"
                        {...register("quantity", {
                          required: true,
                          validate: (value: number) =>
                            value <= getValues("quantity"),
                        })}
                      />
                      {errors.quantity && (
                        <p className="text-right text-danger">
                          برجاء إدخال الكمية
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row className="p-3 justify-content-center">
                    <Col lg={10} className="d-flex flex-column ">
                      <Label
                        for="exampleEmail"
                        className="ffcairo text-muted fw-bold"
                      >
                        الترتيب
                      </Label>
                      <input
                        type="number"
                        id="name"
                        placeholder="الترتيب "
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3 has-error"
                        {...register("order", {
                          required: true,
                          validate: (value: number) =>
                            value <= getValues("order"),
                        })}
                      />
                      {errors.order && (
                        <p className="text-right text-danger">
                          برجاء إدخال الترتيب
                        </p>
                      )}
                    </Col>
                  </Row>
                  {/* <Row className="p-3 justify-content-center">
                    <Col lg={10} className="d-flex flex-column ">
                      <Label
                        for="exampleEmail"
                        className="ffcairo text-muted fw-bold"
                      >
                        اقل كمية متوفرة
                      </Label>
                      <input
                        type="number"
                        id="name"
                        placeholder="أقل كمية متوفرة"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3 has-error"
                        {...register("min_stock", {
                          required: true,
                          validate: (value: number) =>
                            value <= getValues("quantity"),
                        })}
                      />
                      {errors.min_stock && (
                        <p className="text-right text-danger">
                          برجاء إدخال أقل كمية متوفرة وألا تزيدعن الكمية
                        </p>
                      )}
                    </Col>
                  </Row> */}
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

export default EditPrize;
