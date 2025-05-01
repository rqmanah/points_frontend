// import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../../utils/client";
//@ts-ignore
import behaviorImage from "../../../assets/sidebar/reward 1.png";
function PointsSettings() {
  document.title = "اعدادات النقاط";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [behaviorType, setBehaviorType] = useState(true);
  type behavior = {
    id: number;
    title: string;
    points: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<behavior>();
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
  const onSubmit: SubmitHandler<behavior> = async (data) => {
    setLoading(true);
    try {
      await client.post(`school/manager/behaviors`, {
        points: behaviorType ? data.points : -Math.abs(data.points),
        title: data.title,
      });
      await new Promise((resolve) => {
        toast.success("تم اضافة سلوك بنجاح", {
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
      navigate("/behaviors");
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
  return (
    <div>
      <div className="container-fluid">
        <h3
          className="col-12 col-lg-4 col-md-6  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
            <img width={35} className="p-1" src={behaviorImage} alt="" />
          </div>
          <div className="flex-grow-1 text-center">
            إعدادات البوينت والسلوكيات
          </div>
        </h3>
        {/* <PageTitle title={`إعدادات البوينت والسلوكيات`} /> */}
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <Card className="px-4 mt-2 row">
              <div className="col-12">
                <form className="row " onSubmit={handleSubmit(onSubmit)}>
                  {/* <p className="text-end form-label  text-center  fs-6 ffcairo">
                    نوع السلوك
                  </p> */}
                  <div className="col-12">
                    <div
                      className="d-flex justify-content-between my-1 row"
                      // style={{ height: "40px" }}
                    >
                      <div className="d-flex align-items-center col-12 col-lg-8 col-md-7 col-sm-5 my-1">
                        <Label
                          htmlFor="points"
                          className="ffcairo text-center mx-1 m-0"
                        >
                          عدد البوينت
                        </Label>
                        <input
                          id="points"
                          {...register("points", { required: true, min: 0 })}
                          placeholder="56"
                          min={0}
                          className=" ffcairo text-end rounded px-2"
                          type="number"
                          style={{ width: "100px" , height:"40px" }}
                        />
                        {errors.points && (
                          <p className="text-right text-danger">
                            برجاء إدخال عدد النقاط
                          </p>
                        )}
                      </div>
                      <div
                        className="d-flex p-1 rounded-pill justify-content-between col-12 col-lg-4 col-md-4 col-sm-7 my-1"
                        style={{ background: "#ECECEC", height: "40px", width:"300px" }}
                      >
                        <p
                          className={`positive rounded-pill px-3 py-1 pointer ${
                            behaviorType ? "positive-note" : ""
                          }`}
                          onClick={() => setBehaviorType(true)}
                        >
                          ملاحظة إيجابية
                        </p>
                        <p
                          className={`negative rounded-pill px-3 py-1 pointer ${
                            behaviorType == false ? "negative-note" : ""
                          }`}
                          onClick={() => setBehaviorType(false)}
                        >
                          ملاحظة سلبية
                        </p>
                      </div>
                      <div className="d-flex align-items-center col-12 col-lg-8 col-md-7 col-sm-5 my-1">
                        <Label className="ffcairo me-2 mt-2 ">السلوك</Label>
                        <input
                          {...register("title", { required: true })}
                          placeholder="وصف السلوك"
                          className="form-control rounded w-50 mx-1 ffcairo text-end mb-3"
                        />
                        {errors.title && (
                          <p className="text-right text-danger">
                            برجاء إدخال وصف السلوك
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Col lg={12} className="d-flex  justify-content-center my-2">
                    <Button
                      color="success"
                      size="lg"
                      style={{ fontFamily: "cairo" }}
                      className="px-5"
                      disabled={loading}
                    >
                      إضافة
                    </Button>
                  </Col>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PointsSettings;
