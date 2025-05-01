import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  // Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
// import PageTitle from "../../../components/PageTitle";
import { toast } from "react-toastify";
import DeleteModal3 from "../../../components/deletemodal3";
import client from "../../../utils/client";
//@ts-ignore
import prizeImage from "../../../assets/sidebar/image 1.png";
import { UserContext } from "../../../utils/userContext";
import SuccessMan from "../../../components/icons/SucessMan";
import SuccessModal from "../../../components/SuccessModal";
const SimplePage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [prizes, setPrizes] = useState<any>([]);
  const [prizesOutOfStock, setPrizesOutOfStock] = useState<any>([]);
  const [outStock, setOutStock] = useState<any>([]);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await client.get(`school/manager/prize/stock?filter[stock]=max`);
      setPrizes(response.data.result.data);
      console.log("🚀 ~ fetchData ~ response:", response)
      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const aboutToBeOutofStock = async () => {
    setLoading2(true);
    try {
      const response = await client.get(
        `school/manager/prize/stock?filter[stock]=mini`
      );
      setPrizesOutOfStock(response.data.result.data);
      // setNoData2(false);
      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };
  const outOfStock = async () => {
    try {
      const response = await client.get(
        `school/manager/prize/stock?filter[stock]=empty`
      );
      setOutStock(response.data.result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePrize = async (id: number) => {
    try {
      client.delete(`school/manager/prizes/${id}`);
      setModalDelete(true);
      fetchData();
    } catch (error) {
      console.log("error happend", error);
    }
  };
  useEffect(() => {
    fetchData();
    aboutToBeOutofStock();
    outOfStock();
  }, []);
  const sortPrizes = prizes?.sort(
    (a, b) => a?.order - b?.order
  );
  const sortPrizesOutOfStock = prizesOutOfStock?.sort(
    (a, b) => a?.order - b?.order
  );
  const sortOutStock = outStock?.sort(
    (a, b) => a?.order - b?.order
  );
  return (
    <React.Fragment>
      <div className="page-content ">
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
        {/* <PageTitle title={"الجوائز"} /> */}
        <div className="d-flex justify-content-end  ">
          <div className="flex-shrink-0  ms-2 mb-2 ">
            <Link
              to="/prizes/add"
              style={{ backgroundColor: "#0077B6" }}
              className="btn   rounded-5 p-2 px-3 text-white "
            >
              إضافة جائزة
              <i className="bi bi-plus-circle align-bottom me-2"></i>
            </Link>
          </div>
        </div>
        <Container fluid className="rounded-4  ">
          <Row className=" rounded-4" style={{ padding: "0" }}>
            <Col
              lg={12}
              className="rounded-4   p-0 "
              style={{ backgroundColor: "#0077B6" }}
            >
              <div className="p-0 rounded-4 border ">
                <div
                  className="d-flex  p-0 rounded-4  "
                  style={{ backgroundColor: "#0077B6" }}
                >
                  <Nav pills className=" flex-grow-1 pt-2 " role="tablist">
                    <NavItem className="p-0">
                      <NavLink
                        href="#overview-tab"
                        className={
                          activeTab === "1"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3 me-2  "
                            : "bg-transparent rounded-0 text-white me-2 "
                        }
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        <i className="ri-list-unordered d-inline-block d-md-none"></i>
                        <span className=" d-inline-block d-md-none">
                          {prizes.length}
                        </span>

                        <span className="d-none d-md-inline-block">
                          <span className="fs-4 ms-2">{prizes.length}</span>
                          الكل
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#activities"
                        className={
                          activeTab === "2"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3 me-2 "
                            : "bg-transparent rounded=0 text-white me-2"
                        }
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        <i className="bi bi-bag-dash d-inline-block d-md-none"></i>{" "}
                        <span className=" d-inline-block d-md-none">
                          {prizesOutOfStock.length}
                        </span>
                        <span className="d-none d-md-inline-block">
                          <span className="ms-2 fs-4">
                            {prizesOutOfStock.length}
                          </span>
                          موشكة علي النفاذ
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#projects"
                        className={
                          activeTab === "3"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3  me-2  "
                            : "bg-transparent rounded=0 text-white me-2 "
                        }
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        <i className="bi bi-bag-x-fill d-inline-block d-md-none"></i>{" "}
                        <span className=" d-inline-block d-md-none">
                          {outStock.length}
                        </span>
                        <span className="d-none d-md-inline-block">
                          <span className="ms-2 fs-4">{outStock.length}</span>
                          نفذت
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                <TabContent
                  activeTab={activeTab}
                  className="pt-4 p-3 bg-white rounded-bottom-2 border  "
                >
                  <TabPane tabId="1">
                    {!loading && prizes.length > 0 ? (
                      <div className="row">
                        {sortPrizes?.map((item: any, index: any) => {
                          return (
                            item?.min_stock > 0 && (
                              <div
                                key={index}
                                className="mb-3 col-md-4 col-lg-4 col-xl-4"
                              >
                                <Card className="rounded-4">
                                  <CardBody className="position-relative p-2">
                                    <div className="position-relative text-center rounded-4 border  w-100">
                                      <img
                                        className="  rounded-4  w-100 "
                                        style={{ height: "200px" }}
                                        src={item?.web_image}
                                      />
                                      <span
                                        style={{
                                          backgroundColor: "#FF901D",
                                          borderBottomLeftRadius: "0",
                                        }}
                                        className="badge  p-3 position-absolute start-0 top-0 rounded-top-4 rounded-end-0 "
                                      >
                                        الكمية {item?.quantity}
                                      </span>
                                    </div>

                                    <div
                                      className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-between justify-content-md-between"
                                      style={{
                                        borderBottom: "1px solid #6F6F6F26",
                                      }}
                                    >
                                      <p className="ffcairo text-muted fw-bold  fs-4 m-0">
                                        {item?.title}
                                      </p>
                                      <p
                                        className="ffcairo text-muted fs-4 m-0"
                                        style={{ direction: "ltr" }}
                                      >
                                        {item?.price}
                                      </p>
                                    </div>
                                    <Row>
                                      <Col lg={6} className="mb-2">
                                        <Link to={`/prizes/edit/${item.id}`}>
                                          <button
                                            style={{
                                              backgroundColor: "#7AAD00",
                                            }}
                                            className="w-100 btn text-white"
                                          >
                                            تعديل{" "}
                                          </button>
                                        </Link>
                                      </Col>
                                      <Col
                                        lg={6}
                                        className="justify-content-end  d-flex mb-2"
                                      >
                                        <DeleteModal3
                                          text="هل أنت متاكد من حذف الجائزة"
                                          title={"حذف"}
                                          onClick={() => {
                                            deletePrize(item.id);
                                            fetchData();
                                          }}
                                        />
                                      </Col>
                                      {/* <Col lg={6} className="mb-2 ">
                                      <Link to={`/prizes/addstock/${item.id}`}>
                                        <Button
                                          outline
                                          color="success"
                                          className="w-100"
                                        >
                                          + كمية{" "}
                                        </Button>
                                      </Link>
                                    </Col>
                                    <Col lg={6} className="mb-2 ">
                                      <Link to={`/prizes/minstock/${item.id}`}>
                                        <Button
                                          outline
                                          color="danger"
                                          className="w-100"
                                        >
                                          -كمية{" "}
                                        </Button>
                                      </Link>
                                    </Col> */}
                                    </Row>
                                  </CardBody>
                                </Card>
                              </div>
                            )
                          );
                        })}
                      </div>
                    ) : (
                      <Row className="justify-content-center">
                        <div className=" d-flex flex-column align-items-center justify-content-center">
                          <i
                            className="bi bi-exclamation-circle-fill"
                            style={{ fontSize: "50px" }}
                          ></i>
                          <p className="fs-3">لايوجد بيانات</p>
                        </div>
                      </Row>
                    )}
                  </TabPane>
                  <TabPane tabId="2">
                    {!loading2 && prizesOutOfStock.length > 0 ? (
                      <div className="row">
                        {sortPrizesOutOfStock?.map((item: any, index: any) => {
                          return (
                            // item?.min_stock > 0 &&
                            // item?.quantity <= item?.min_stock && (
                            <div
                              key={index}
                              className="mb-3 col-md-4 col-lg-4 col-xl-4"
                            >
                              <Card className="rounded-4">
                                <CardBody className="position-relative p-2">
                                  <div className="position-relative text-center rounded-4 border  w-100">
                                    <img
                                      className="  rounded-4  w-100 "
                                      style={{ height: "200px" }}
                                      src={item?.web_image}
                                    />
                                    <span
                                      style={{
                                        backgroundColor: "#FF901D",
                                        borderBottomLeftRadius: "0",
                                      }}
                                      className="badge  p-3 position-absolute start-0 top-0 rounded-top-4 rounded-end-0 "
                                    >
                                      الكمية {item?.quantity}
                                    </span>
                                  </div>

                                  <div
                                    className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-between justify-content-md-between"
                                    style={{
                                      borderBottom: "1px solid #6F6F6F26",
                                    }}
                                  >
                                    <p className="ffcairo text-muted fw-bold  fs-4 m-0">
                                      {item?.title}
                                    </p>
                                    <p
                                      className="ffcairo text-muted fs-4 m-0"
                                      style={{ direction: "ltr" }}
                                    >
                                      {item?.price}
                                    </p>
                                  </div>
                                  <Row>
                                    <Col lg={6} className="mb-2">
                                      <Link to={`/prizes/edit/${item.id}`}>
                                        <button
                                          style={{
                                            backgroundColor: "#7AAD00",
                                          }}
                                          className="w-100 btn text-white"
                                        >
                                          تعديل{" "}
                                        </button>
                                      </Link>
                                    </Col>
                                    <Col
                                      lg={6}
                                      className="justify-content-end  d-flex mb-2"
                                    >
                                      <DeleteModal3
                                        title={"حذف"}
                                        onClick={() => {
                                          deletePrize(item.id);
                                          fetchData();
                                        }}
                                      />
                                    </Col>
                                    {/* <Col lg={6} className="mb-2 ">
                                      <Link to={`/prizes/addstock/${item.id}`}>
                                        <Button
                                          outline
                                          color="success"
                                          className="w-100"
                                        >
                                          + كمية{" "}
                                        </Button>
                                      </Link>
                                    </Col>
                                    <Col lg={6} className="mb-2 ">
                                      <Link to={`/prizes/minstock/${item.id}`}>
                                        <Button
                                          outline
                                          color="danger"
                                          className="w-100"
                                        >
                                          -كمية{" "}
                                        </Button>
                                      </Link>
                                    </Col> */}
                                  </Row>
                                </CardBody>
                              </Card>
                            </div>
                            // )
                          );
                        })}
                      </div>
                    ) : (
                      <Row className="justify-content-center">
                        <div className=" d-flex flex-column align-items-center justify-content-center">
                          <i
                            className="bi bi-exclamation-circle-fill"
                            style={{ fontSize: "50px" }}
                          ></i>
                          <p className="fs-3">لايوجد بيانات</p>
                        </div>
                      </Row>
                    )}
                  </TabPane>
                  <TabPane tabId="3">
                    {outStock.length > 0 ? (
                      <div className="row">
                        {sortOutStock?.map((item: any, index: any) => {
                          return (
                            <div className="mb-3 col-md-4 col-lg-4 col-xl-4">
                              <Card className="rounded-4">
                                <CardBody className="position-relative p-2">
                                  <div className="position-relative text-center rounded-4 border  w-100">
                                    <img
                                      className="  rounded-4  w-100 "
                                      style={{ height: "200px" }}
                                      src={item?.web_image}
                                    />
                                    <span
                                      style={{
                                        backgroundColor: "#FF901D",
                                        borderBottomLeftRadius: "0",
                                      }}
                                      className="badge  p-3 position-absolute start-0 top-0 rounded-top-4 rounded-end-0 "
                                    >
                                      الكمية {item?.quantity}
                                    </span>
                                  </div>

                                  <div
                                    className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-between justify-content-md-between"
                                    style={{
                                      borderBottom: "1px solid #6F6F6F26",
                                    }}
                                  >
                                    <p className="ffcairo text-muted fw-bold  fs-4 m-0">
                                      {item?.title}
                                    </p>
                                    <p
                                      className="ffcairo text-muted fs-4 m-0"
                                      style={{ direction: "ltr" }}
                                    >
                                      {item?.price}
                                    </p>
                                  </div>
                                  <Row>
                                    <Col lg={6} className="mb-2">
                                      <Link to={`/prizes/edit/${item.id}`}>
                                        <button
                                          style={{ backgroundColor: "#7AAD00" }}
                                          className="w-100 btn text-white"
                                        >
                                          تعديل{" "}
                                        </button>
                                      </Link>
                                    </Col>
                                    <Col
                                      lg={6}
                                      className="justify-content-end  d-flex mb-2"
                                    >
                                      <DeleteModal3
                                        title={"حذف"}
                                        onClick={() => {
                                          deletePrize(item.id);
                                          fetchData();
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Row className="justify-content-center">
                        <div className=" d-flex flex-column align-items-center justify-content-center">
                          <i
                            className="bi bi-exclamation-circle-fill"
                            style={{ fontSize: "50px" }}
                          ></i>
                          <p className="fs-3">لايوجد بيانات</p>
                        </div>
                      </Row>
                    )}
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <SuccessModal
        isOpen={modalDelete}
        text={"تم حذف الجائزة بنجاح"}
        toggle={toggleDelete}
        setOpen={setModalDelete}
      />
    </React.Fragment>
  );
};

export default SimplePage;
