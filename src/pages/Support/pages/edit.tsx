import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Label, Row, Spinner } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../../utils/client";
import "react-toastify/dist/ReactToastify.css";
import SupportIcon from "../../../components/icons/SupportIcon";
import PreviewImageLink from "../../../components/PreviewImageLink";
function SupportEdit() {
  document.title = "الرد علي تذكرة";
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  type ticket = {
    ticket_id: number;
    message: string;
  };
  const { handleSubmit, register, setValue } = useForm<ticket>();
  const onSubmit: SubmitHandler<ticket> = async (data) => {
    setLoading(true);
    try {
      const res = await client.post(`school/manager/tickets/comment`, {
        ticket_id: id,
        message: data.message,
      });
      console.log("🚀 ~ constonSubmit:SubmitHandler<ticket>= ~ res:", res);
      await new Promise((resolve) => {
        toast.success(res?.data?.message, {
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
        setLoading(false);
      });
      fetchData();
      setValue("message", "");
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
      .get(`school/manager/tickets/${id}`)
      .then((response) => {
        setTicket(response?.data.result.data);
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
    <div className="container-fluid pe-4">
      {/* <PageTitle title={"التذكرة"} /> */}
      {ticket.length != 0 ? (
        <div className=" ">
          <div className="  ">
            <div className="">
              <div className="p-2 p-lg-2 mt-2">
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
                  <div className="flex-grow-1 text-center mx-3">
                    الدعم الفني
                  </div>
                </h3>
                <div className=" ">
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="">
                      <Col lg={12}>
                        <Label
                          for="exampleEmail"
                          className="ffcairo"
                          style={{ fontSize: "20px", fontWeight: "700" }}
                        >
                          الرد على التذكرة
                        </Label>

                        <textarea
                          id="exampleText"
                          cols={20}
                          rows={5}
                          className="form-control ffcairo"
                          style={{
                            borderRadius: "30px",
                            backgroundColor: "white",
                            padding: "10px 20px",
                            border: "1px solid #D4D4D4",
                            minHeight:"250px"
                          }}
                          {...register("message", { required: true })}
                        />
                      </Col>
                      <Col lg={4} className="d-flex  mt-3 ">
                        {!loading && (
                          <Button
                            color=""
                            size="lg"
                            style={{
                              fontFamily: "cairo",
                              minWidth: "104px",
                              height: "50px",
                              backgroundColor: "#A7C957",
                              color: "white",
                              border: "1spx solid transparent",
                            }}
                          >
                            رد
                          </Button>
                        )}

                        {loading && (
                          <Button
                            color="success"
                            size="lg"
                            disabled
                            style={{
                              fontFamily: "cairo",
                              minWidth: "200px",
                              height: "50px",
                            }}
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
                <div>
                  <div className="rtl mt-3 d-flex ">
                    <p className="fw-bold ffcairo fs-5  ">عنوان المشكلة:</p>
                    <p className="fw-semibold ffcairo fs-5 mx-2 ">
                      {ticket?.subject}{" "}
                    </p>
                  </div>
                  <PreviewImageLink url={ticket?.image} />
                  {/* <div>
                    <img
                      src={ticket?.image}
                      alt=""
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  </div> */}
                  <div className="w-100  d-flex justify-content-end ">
                    {/* <p className="rtl w-100 ffcairo">{ticket.subject}</p> */}
                  </div>
                  {ticket?.comments && ticket.comments.length > 0 && (
                    <div className="rtl mt-3  ">
                      <p className="fw-bold ffcairo fs-5  ">الردود:</p>
                      {ticket?.comments?.map((item: any, index: any) => {
                        return (
                          <div key={index} className="mb-5">
                            <p className="fw-semibold ffcairo fs-6 text-secondary ">
                              <i className="ri-user-fill fs-5 mx-2 "></i>
                              الدعم الفني {item?.created_at}
                            </p>
                            <div className="w-100  d-flex justify-content-end">
                              <p className="rtl w-100 ffcairo">
                                {item?.message}
                              </p>
                            </div>
                            {/* <hr /> */}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container  d-flex justify-content-center">
          <Spinner className="m-5" color="primary">
            Loading...
          </Spinner>
        </div>
      )}
      <ToastContainer />
      <div className=" d-flex justify-content-center mt-4"></div>
    </div>
  );
}

export default SupportEdit;
