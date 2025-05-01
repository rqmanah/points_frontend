import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";
import client from "../../../utils/client";
import { useState } from "react";
function AddStock() {
  document.title = " اضف كمية";
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  type stock = {
    id: number;

    quantity: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<stock>();
  const onSubmit: SubmitHandler<stock> = async (data) => {
    setLoading(true);
    try {
      await client.post(`school/manager/prize/stock/add`, {
        id: id,
        quantity: data.quantity,
      });
      await new Promise((resolve) => {
        toast.success("تم اضافة كمية بنجاح", {
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
        <PageTitle title={`اضافة كمية`} />
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-12">
            <Card className="px-2 mt-2">
              <div className=" ">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="">
                    <Col lg={12}>
                      <Label
                        for="exampleEmail"
                        className="ffcairo text-center  d-block"
                      >
                        الكمية
                      </Label>
                      <input
                        id="exampleEmail"
                        {...register("quantity", { required: true })}
                        placeholder="الكمية"
                        style={{
                          backgroundColor: "#EEF1F5",
                          borderRadius: "20px",
                        }}
                        className="form-control ffcairo text-end p-3"
                        type="number"
                      />
                      {errors.quantity && (
                        <p className="text-right text-danger">
                          برجاء إدخال الكمية
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

export default AddStock;
