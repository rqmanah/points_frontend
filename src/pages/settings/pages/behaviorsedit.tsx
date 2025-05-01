import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, FormGroup, Label, Row } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../../utils/client";
function BehaviorsEdit() {
  document.title = "اعدادات النقاط";
  const navigate = useNavigate();
  const [behaviorType, setBehaviorType] = useState(true);
  const [behavior, setBehavior] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  type behavior = {
    id: number;
    title: string;
    points: number;
    type: boolean;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
  const fetchData = async () => {
    try {
      const response = await client.get(`school/manager/behaviors/${id}/edit`);
      setBehavior(response.data.result.data);
      setValue("points", Math.abs(response.data.result.data.points));

      response?.data?.result?.data?.points > 0
        ? setBehaviorType(true)
        : setBehaviorType(false);
      setValue("title", response.data.result.data.title);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<behavior> = async (data) => {
    setLoading(true);
    try {
      await client.put(`school/manager/behaviors/${id}`, {
        points: behaviorType ? data.points : -Math.abs(data.points),
        title: data.title,
      });
      await new Promise((resolve) => {
        toast.success("تم تعديل سلوك بنجاح", {
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
      setLoading(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <PageTitle title={`إعدادات البوينت والسلوكيات`} />
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-12">
            <Card className="px-2 mt-2">
              <div className=" ">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-end form-label  text-center  fs-6 ffcairo">
                    نوع السلوك
                  </p>
                  <div className="d-flex justify-content-center">
                    <FormGroup check inline>
                      <input
                        type="radio"
                        id="true"
                        checked={behaviorType === true}
                        className="form-check-input"
                        {...register("type")}
                        onClick={() => setBehaviorType(true)}
                      />
                      <Label
                        check
                        className="ffcairo"
                        htmlFor="true"
                        {...register("type")}
                        onClick={() => setBehaviorType(true)}
                      >
                        ايجابي
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <input
                        type="radio"
                        className="form-check-input"
                        id="false"
                        checked={behaviorType === false}
                        onClick={() => {
                          setBehaviorType(false);
                        }}
                        {...register("type")}
                      />
                      <Label
                        check
                        className="ffcairo"
                        htmlFor="false"
                        onClick={() => {
                          setBehaviorType(false);
                        }}
                        {...register("type")}
                      >
                        سلبي
                      </Label>
                    </FormGroup>
                  </div>
                  <Row className="">
                    <Col lg={12}>
                      <Label
                        for="exampleEmail"
                        className="ffcairo text-center  d-block"
                      >
                        عدد النقاط
                      </Label>
                      <input
                        id="exampleEmail"
                        {...register("points", { required: true, min: 0 })}
                        placeholder="عدد النقاط"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        type="number"
                        min={0}
                      />
                      {errors.points && (
                        <p className="text-right text-danger">
                          برجاء إدخال عدد النقاط
                        </p>
                      )}
                    </Col>

                    <Col lg={12}>
                      <p className="ffcairo me-2 mt-2 d-block text-center">
                        السلوك
                      </p>
                      <input
                        {...register("title", { required: true })}
                        placeholder="وصف السلوك"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3 mb-3"
                      />
                      {errors.title && (
                        <p className="text-right text-danger">
                          برجاء إدخال وصف السلوك
                        </p>
                      )}
                    </Col>
                  </Row>

                  <Col lg={12} className="d-flex justify-content-center mt-2 ">
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BehaviorsEdit;
