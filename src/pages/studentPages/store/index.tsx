import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
//@ts-ignore
import giftSucess from "../../../assets/sidebar/gift_success.png";
//@ts-ignore
import giftFail from "../../../assets/sidebar/gift_fail.png";
import { prizeType } from "../../../types";
import {
  getStorePrizes,
  getStorePrizesEmpty,
  getStorePrizesMini,
  purchasePrize,
} from "../../../utils/api.functions";
import { GenericInfoModal } from "../../../components/genericInfoModal";
import prizeImage from "../../../assets/sidebar/image 1.png";
import { UserContext } from "../../../utils/userContext";
import useFetch from "../../../hooks/useFetch";

export function StudentStore() {
  document.title = "متجر الجوائز";
  const [activeTab, setActiveTab] = useState<string>("1");
  // const [prizes, setPrizes] = useState<prizeType[]>([]);
  const [prizesMini, setPrizesMini] = useState<prizeType[]>([]);
  const [prizesEmpty, setPrizesEmpty] = useState<prizeType[]>([]);

  const [openPurchaseModal, setOpenPurchaseModal] = useState<boolean>(false);
  const [selectedPrize, setSelectedPrize] = useState<prizeType | null>(null);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const endpoint = `school/student/prizes?filter[stock]=max`;
  const { data: prizes, refetch } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  const prizeEndpoint = `school/student/store/data`;
  const { data: StoreData } = useFetch({
    queryKey: [prizeEndpoint],
    endpoint: prizeEndpoint,
  });
  const purchaseItem = (prize: prizeType) => {
    setOpenPurchaseModal(true);
    setSelectedPrize({ ...prize });
  };
  const confirmPurchaseItem = () => {
    purchasePrize(selectedPrize?.id)
      .then((data) => {
        setOpenPurchaseModal(false);
        if (data.status == "error") {
          setPurchaseSuccess(false);
        } else {
          setPurchaseSuccess(true);
          // setPrizes(() => [
          //   ...prizes.map((prize) => {
          //     if (prize.id === selectedPrize?.id)
          //       return { ...prize, stock: prize.stock - 1 };
          //     return prize;
          //   }),
          // ]);
          refetch();
        }
        setOpenInfoModal(true);
      })
      .catch(() => {
        setOpenPurchaseModal(false);
        setPurchaseSuccess(false);
      });
  };
  useEffect(() => {
    switch (activeTab) {
      case "1":
        refetch();
        return;
      case "2":
        getStorePrizesMini().then((data: prizeType[]) =>
          setPrizesMini([...data])
        );
        return;
      case "3":
        getStorePrizesEmpty().then((data: prizeType[]) =>
          setPrizesEmpty([...data])
        );
        return;
    }
  }, [activeTab]);

  useEffect(() => {
    // getStorePrizes().then((data: prizeType[]) => setPrizes([...data]));

    getStorePrizesMini().then((data: prizeType[]) => setPrizesMini([...data]));
    getStorePrizesEmpty().then((data: prizeType[]) =>
      setPrizesEmpty([...data])
    );
  }, []);
  return (
    <React.Fragment>
      <div className="page-content ">
        <h3
          className="col-12 col-lg-3 col-md-5  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
          <div className="flex-grow-1 text-center">{`متجر  ${
            StoreData?.result?.data?.store_name
              ? StoreData?.result?.data?.store_name
              : user?.school?.title
          }`}</div>
        </h3>
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
                          setActiveTab("1");
                        }}
                      >
                        <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          {/* <Badge color="danger">  */}
                          <span className="fs-4 ms-2">
                            {prizes?.result?.data?.length}
                          </span>
                          {/* </Badge>  */}
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
                          setActiveTab("2");
                        }}
                      >
                        <i className="bi bi-bag-dash d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          <span className="ms-2 fs-4">
                            {prizesMini?.length}
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
                          setActiveTab("3");
                        }}
                      >
                        <i className="bi bi-bag-x-fill d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          <span className="ms-2 fs-4">
                            {prizesEmpty?.length}
                          </span>
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
                    {
                      prizes?.result?.data?.length > 0 ? (
                        <Row>
                          {prizes?.result?.data?.map(
                            (item: prizeType, index: number) => {
                              return (
                                <Col lg={3} key={index} className="mb-3">
                                  <Card className="rounded-4">
                                    <CardBody className="position-relative p-2">
                                      <div className="position-relative text-center rounded-4 border  w-100">
                                        <img
                                          className="  rounded-4  w-100 "
                                          style={{ height: "209px" }}
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
                                        className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-lg-between justify-content-md-between"
                                        style={{
                                          borderBottom: "1px solid #6F6F6F26",
                                        }}
                                      >
                                        <p
                                          className="  fw-bold  fs-4 m-0"
                                          style={{
                                            color: "#171740",
                                          }}
                                        >
                                          {item?.title}
                                        </p>
                                        <p
                                          className=" fw-bold fs-4 m-0"
                                          style={{
                                            direction: "ltr",
                                            color: "#171740",
                                          }}
                                        >
                                          {item?.price}
                                        </p>
                                      </div>
                                      <Row>
                                        <Col lg={11} className="mb-2 m-auto ">
                                          <button
                                            style={{
                                              backgroundColor: "#0077B6",
                                              fontSize: "21.99px",
                                            }}
                                            className="w-100 btn text-white"
                                            onClick={() => purchaseItem(item)}
                                          >
                                            شراء
                                          </button>
                                        </Col>
                                      </Row>
                                    </CardBody>
                                  </Card>
                                </Col>
                              );
                            }
                          )}
                        </Row>
                      ) : (
                        <Row className="justify-content-center">
                          <div className=" d-flex flex-column align-items-center justify-content-center">
                            <i
                              className="bi bi-exclamation-circle-fill"
                              style={{ fontSize: "50px" }}
                            ></i>
                            {prizes?.status == "error" ? (
                              <p>{prizes?.message}</p>
                            ) : (
                              <p className="fs-3">لايوجد بيانات</p>
                            )}
                          </div>
                        </Row>
                      )
                      //  (
                      //   <Row className="justify-content-center">
                      //     <Spinner className="m-5" color="primary">
                      //       Loading...
                      //     </Spinner>
                      //   </Row>
                      // )
                    }
                  </TabPane>
                  <TabPane tabId="2">
                    {
                      prizesMini.length > 0 ? (
                        <Row>
                          {prizesMini?.map((item: prizeType, index: number) => {
                            return (
                              <Col lg={3} key={index} className="mb-3">
                                <Card className="rounded-4">
                                  <CardBody className="position-relative">
                                    <div className="position-relative text-center rounded-4 border  w-100">
                                      <img
                                        className="  rounded-4  w-100 "
                                        style={{ height: "209px" }}
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
                                      className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-lg-between justify-content-md-between"
                                      style={{
                                        borderBottom: "1px solid #6F6F6F26",
                                      }}
                                    >
                                      <p
                                        className="  fw-bold  fs-4 m-0"
                                        style={{
                                          color: "#171740",
                                        }}
                                      >
                                        {item?.title}
                                      </p>
                                      <p
                                        className=" fw-bold fs-4 m-0"
                                        style={{
                                          direction: "ltr",
                                          color: "#171740",
                                        }}
                                      >
                                        {item?.price}
                                      </p>
                                    </div>
                                    <Row>
                                      <Col lg={12} className="mb-2">
                                        <button
                                          style={{
                                            backgroundColor: "#0077B6",
                                          }}
                                          className="w-100 btn text-white"
                                          onClick={() => purchaseItem(item)}
                                        >
                                          شراء
                                        </button>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
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
                      )
                      //  (
                      //   <Row className="justify-content-center">
                      //     <Spinner className="m-5" color="primary">
                      //       Loading...
                      //     </Spinner>
                      //   </Row>
                      // )
                    }
                  </TabPane>
                  <TabPane tabId="3">
                    {
                      prizesEmpty.length > 0 ? (
                        <Row>
                          {prizesEmpty?.map(
                            (item: prizeType, index: number) => {
                              return (
                                <Col lg={3} key={index} className="mb-3">
                                  <Card className="rounded-4">
                                    <CardBody className="position-relative">
                                      <div className="position-relative text-center rounded-4 border  w-100">
                                        <img
                                          className="  rounded-4  w-100 "
                                          style={{ height: "209px" }}
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
                                        className="d-flex py-2 my-2 flex-wrap gap-2 justify-content-lg-between justify-content-md-between"
                                        style={{
                                          borderBottom: "1px solid #6F6F6F26",
                                        }}
                                      >
                                        <p
                                          className="  fw-bold  fs-4 m-0"
                                          style={{
                                            color: "#171740",
                                          }}
                                        >
                                          {item?.title}
                                        </p>
                                        <p
                                          className=" fw-bold fs-4 m-0"
                                          style={{
                                            direction: "ltr",
                                            color: "#171740",
                                          }}
                                        >
                                          {item?.price}
                                        </p>
                                      </div>
                                      {/* <Row>
                                        <Col lg={12} className="mb-2">
                                          <button
                                            style={{
                                              backgroundColor: "#0077B6",
                                            }}
                                            className="w-100 btn text-white"
                                            onClick={() => purchaseItem(item)}
                                          >
                                            شراء
                                          </button>
                                        </Col>
                                      </Row> */}
                                    </CardBody>
                                  </Card>
                                </Col>
                              );
                            }
                          )}
                        </Row>
                      ) : (
                        <Row className="justify-content-center">
                          <div className=" d-flex flex-column align-items-center justify-content-center">
                            <i
                              className="bi bi-exclamation-circle-fill"
                              style={{ fontSize: "50px" }}
                            ></i>
                            {prizes?.status == "error" ? (
                              <p>{prizes?.message}</p>
                            ) : (
                              <p className="fs-3">لايوجد بيانات</p>
                            )}
                          </div>
                        </Row>
                      )
                      //  (
                      //   <Row className="justify-content-center">
                      //     <Spinner className="m-5" color="primary">
                      //       Loading...
                      //     </Spinner>
                      //   </Row>
                      // )
                    }
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className=" col-12  mt-2 text-center  ">
        <a className="link-color me-0   me-lg-3 fw-400 text-decoration-none">
          <GenericInfoModal
            open={openPurchaseModal}
            className={""}
            setOpen={setOpenPurchaseModal}
            hideCloseButton={true}
            modalTitle={""}
            hideAcceptButton={true}
            content={
              <>
                <Row>
                  <Col lg={12} className="text-center fs-4">
                    عزيزي الطالب سيتم خصم {selectedPrize?.price} نقطة من رصيدك
                    لكي تحصل على هذه الجائزة
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col lg={6}>
                    <button
                      style={{
                        color: "#272727",
                        backgroundColor: "#fff",
                        border: "1px solid #368AAF",
                      }}
                      className="w-100 btn rounded-pill"
                      onClick={() => {
                        setSelectedPrize(null);
                        setOpenPurchaseModal(false);
                      }}
                    >
                      إلغاء
                    </button>
                  </Col>
                  <Col lg={6}>
                    <button
                      style={{
                        backgroundColor: "#0077B6",
                        color: "#fff",
                      }}
                      className="w-100 btn text-white rounded-pill"
                      onClick={() => confirmPurchaseItem()}
                    >
                      موافق
                    </button>
                  </Col>
                </Row>
              </>
            }
          />
        </a>
      </div>
      <div className=" col-12  mt-2 text-center  ">
        <a className="link-color me-0   me-lg-3 fw-400 text-decoration-none">
          <GenericInfoModal
            open={openInfoModal}
            className={""}
            setOpen={setOpenInfoModal}
            modalTitle={""}
            hideCloseButton={true}
            content={
              <>
                <Row>
                  <Col lg={12} className="text-center">
                    <img src={purchaseSuccess ? giftSucess : giftFail} />
                  </Col>
                  <Col lg={12} className="text-center fs-4">
                    {purchaseSuccess
                      ? StoreData?.result?.data?.store_message ? StoreData?.result?.data?.store_message :"تم طلب الجائزة وفي انتظار رد المدير"
                      : `عذراً قيمة الجائزة اكبر من رصيدك! 
نحن في انتظارك في المرة القادمة شكراً لك`}
                  </Col>
                </Row>
              </>
            }
          />
        </a>
      </div>
    </React.Fragment>
  );
}
