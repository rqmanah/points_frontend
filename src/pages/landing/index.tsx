import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFacebook, BsInstagram, BsSnapchat } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import addressImg from "../../assets/address.png";
import image from "../../assets/landing5.png";
import ownerImg from "../../assets/owner.png";
import phoneImg from "../../assets/phone.png";
import logo from "../../assets/sidebar-logo.png";
import LngSetting from "../../components/LngSetting";
import NavAvatar from "../../components/NavAvatar";
import NavMessage from "../../components/NavMessage";
import { LocationContext } from "../../context/LocationContext";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
import { packageType } from "../../types";
import { getLandingPackages } from "../../utils/api.functions";
import { RiWhatsappFill } from "react-icons/ri";

import { UserContext } from "../../utils/userContext";
import About from "./About";
import Goals from "./Goals";
import "./landing.css";
import Services from "./Services";
import SubsLanding from "./SubsLanding";
import WhatAddedYou from "./WhatAddedYou";
import MenuMobile from "./MenuMobile";
import { Swiper, SwiperSlide } from "swiper/react";

export default function LandingPage() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<packageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const isRTL = useIsRTL();
  const locationContext = useContext(LocationContext);
  const navigate = useNavigate();

  const getPackages = async () => {
    setLoading(true);
    try {
      const packages = await getLandingPackages();
      setPackages(packages);
    } catch (error) {
      toast.error(t("Error loading package data"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  const endpoint = `school/manager/get/country`;
  const { data: LocationData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  const endpointLanding = `school/settings`;
  const { data: landingData  , isLoading } = useFetch({
    queryKey: [endpointLanding],
    endpoint: endpointLanding,
  });

  useEffect(() => {
    getPackages();
  }, []);
  // useEffect(() => {
  //   if (locationContext?.location?.country || LocationData?.result?.data) {
  //     const currentUrl = window.location.href; // Get the current URL
  //     if (
  //       (locationContext.location.country === "Egypt" ||
  //         LocationData?.result?.data == "EG") &&
  //       !currentUrl.includes("eg.school-points.com")
  //     ) {
  //       window.location.replace("https://eg.app.school-points.com/")
  //     } else if (
  //       (locationContext.location.country === "United Arab Emirates" ||
  //         LocationData?.result?.data == "AE") &&
  //       !currentUrl.includes("ae.school-points.com")
  //     ) {
  //       window.location.replace("https://ae.app.school-points.com/")
  //     } else if (
  //       (locationContext.location.country === "Saudi Arabia" ||
  //         LocationData?.result?.data == "SA") &&
  //       !currentUrl.includes("sa.school-points.com")
  //     ) {
  //       window.location.replace("https://sa.app.school-points.com/")
  //     }
  //   }
  // }, [LocationData?.result?.data, locationContext.location.country]);

  const navigateLing =
    LocationData?.result?.data == "EG"
      ? "https://eg.school-points.com"
      : LocationData?.result?.data == "AE"
      ? "https://ae.school-points.com"
      : "https://sa.school-points.com"

  return (
    <>
      <div className="overflow-hidden">
        <div
          className=" position-relative  overflow-hidden"
          style={
            {
              // backgroundSize: "cover",
              // backgroundImage: `url('${
              //   landingData?.result?.data?.image || image
              // }')`,
              // backgroundAttachment: "fixed",
              // backgroundColor: "#0077b68a",
            }
          }
        >
          <Row
            style={{
              width: "100%",
              margin: "auto",
            }}
          >
            <Col xs={12} className="p-0">
              <nav
                style={{
                  zIndex: "3",
                  // opacity: "0.6",
                  background: "#fff",
                  // margin: '0 30px 20px',
                  display: "flex",
                  alignItems: "center",
                  width: "100",
                }}
                className="navbar navbar-expand-lg navbar-light  ffcairo "
              >
                <div className="container-fluid  align-items-center  justify-content-md-between ">
                  <Link className="navbar-brand" to={navigateLing}>
                    <img
                      src={logo}
                      width="100"
                      height="50"
                      className="d-inline-block align-top"
                      alt={t("App Logo")}
                    />
                  </Link>
                  <ul
                    style={{
                      fontSize: "14px",
                    }}
                    className=" d-none d-md-flex justify-content-center justify-content-lg-center w-100 m-0 p-0 pb-2 gap-2 gap-md-3 mx-md-5"
                  >
                    <a href="#" className="pointer text-dark">
                      {t("Home")}
                    </a>
                    <a href="#packages" className="pointer text-dark">
                      {t("Packages")}
                    </a>
                    <Link to={"/privacy-policy"} className="pointer text-dark">
                      {t("Privacy Policy")}
                    </Link>
                    <Link to={"/terms"} className="pointer text-dark">
                      {t("Terms of Service")}
                    </Link>
                  </ul>
                  <div
                    className="collapse navbar-collapse d-none d-lg-flex  justify-content-between align-items-center"
                    id="navbarNav"
                    style={{
                      maxWidth: "100%",
                      alignItems: "center",
                      // padding: '0 20px'
                    }}
                  >
                    {user?.token && user?.has_package && user?.has_school ? (
                      <ul className="d-flex align-items-center justify-content-end  gap-3 ">
                        <NavMessage />
                        <NavAvatar />
                        <LngSetting />
                      </ul>
                    ) : (
                      <ul className="navbar-nav  d-flex flex-row gap-3 align-items-center  justify-content-center  justify-content-lg-end  col-md-12 col-sm-12 col-12">
                        <li className="nav-item">
                          <Link
                            className="nav-link "
                            style={{
                              backgroundColor: "#0077B6",
                              color: "white",
                              width: "140px",
                              fontSize: "12px",
                              textAlign: "center",
                              borderRadius: "10px",
                            }}
                            to="/register"
                          >
                            {t("Register")}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#0077B6",
                                width: "100px",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              {t("Login")}
                            </button>
                          </Link>
                        </li>
                        <LngSetting />
                      </ul>
                    )}
                  </div>
                </div>
                <div className="d-md-none menu_mobile">
                  <MenuMobile />
                </div>
              </nav>
            </Col>
          </Row>
          {isLoading ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner />
            </div>
          ) : (
            <div className=" mt-3">
              <Swiper
                className="mySwiper"
                dir="ltr"
                spaceBetween={20}
                slidesPerView={1.1}
                centeredSlides={true}
                // loop
                // freeMode
              >
                {landingData?.result?.data?.images?.map((item) => (
                  <SwiperSlide
                    className="bg-white text-white"
                    // style={{
                    //   maxHeight: "900px",
                    //   height: "100%",
                    // }}
                  >
                    <img
                      src={item}
                      alt=""
                      className=""
                      style={{
                        width: "100%",
                        // maxWidth:"1300px",
                        // objectFit: "contain",
                        borderRadius: "25px",
                        minHeight: "195px",
                        maxHeight: "630px",
                        height: "100%",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className="mt-5 ">
          <Row className="h-100 justify-content-center " dir="rtl">
            <Col lg={6} sm={12} className="col-12  text-start">
              <div
                style={{
                  zIndex: "1",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
                className="d-flex m-3 flex-column h-75 z-10 justify-content-center align-items-center text-center"
              >
                <h1 className="fw-bold ">
                  {t("Subscribe Now, What Are You Waiting For!")}
                </h1>
                <h2 className="">
                  {t("Hurry and subscribe to enjoy the free package")}
                </h2>
                <p className="">
                  {t("You can now choose your package according to your needs")}
                </p>
                <Link className="nav-link d-none d-lg-block" to="/register">
                  <button className="btn btn-info ">
                    {t("Subscribe Now")}
                  </button>
                </Link>
                <div>
                  <ul className="navbar-nav d-block d-lg-none d-flex flex-row gap-3 align-items-center  justify-content-center  justify-content-lg-end  col-md-12 col-sm-12 col-12">
                    <li className="nav-item">
                      <Link
                        className="nav-link btn btn-info bg-light"
                        style={{
                          color: "#0077B6",
                          width: "140px",
                          fontSize: "12px",
                        }}
                        to="/register"
                      >
                        {t("Register")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#0077B6",
                            width: "120px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        >
                          {t("Login")}
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div
          className=""
          style={{
            backgroundColor: "#f8f8f8",
          }}
        >
          <div className="p-3 p-md-5 bg-white  ">
            <About data={landingData} />
          </div>
          <div className="p-3 p-md-5  ">
            <Goals />
          </div>
          <div className="p-3 p-md-5  bg-white ">
            <WhatAddedYou />
          </div>
          <div className="p-3 p-md-5  ">
            <Services />
          </div>
          <div className="p-3 p-md-5 ">
            <SubsLanding />
          </div>
          <div className="p-3 p-md-5 " id="packages">
            <Row>
              <Col lg={12} sm={12} className="col-12 pt-5">
                <div className="text-center">
                  <p className="m-0 p-0 text-info fw-bolder">
                    {t("OUR PRICING")}
                  </p>
                  <h2
                    className=" m-0 fw-bolder text-dark"
                    // style={{ border: "2px solid #0077B6" }}
                  >
                    {t("Pricing & Packages")}
                  </h2>
                </div>
              </Col>
              {loading ? (
                <div className="container  d-flex justify-content-center">
                  <Spinner className="m-5" color="primary">
                    {t("Loading...")}
                  </Spinner>
                </div>
              ) : (
                <>
                  {packages.map((row, index) => (
                    <Col lg={4} xxl={4} md={6} sm={12} key={index} className="">
                      <Card
                        className="bg-white rounded-3 z-1 mt-4 py-3 border-0"
                        // style={{ height: "610px" }}
                      >
                        <p className="fs-6 text-center text-dark ffcairo text-violet ">
                          {row.title ?? "---"}
                        </p>
                        <div className="text-center">
                          <p className="fs-3  m-0 2 text-info ">
                            {`${row.price ? `${row.price} ${t("AED")}` : ""}`}
                          </p>
                        </div>
                        <Row className="">
                          <Col
                            xxl={9}
                            xs={8}
                            lg={7}
                            md={7}
                            sm={7}
                            className=" rounded-top-0 rounded-4 mt-3 flex-grow-1 px-4"
                            // style={{
                            //   backgroundColor: `${
                            //     row?.color ? `#${row.color}` : "#02c6b5"
                            //   }`,
                            // }}
                          >
                            {/* <div className=" d-flex  gap-2 justify-content-between  ">
                              <p className=" " title={row.description ?? ""}>
                                {row?.short_description ?? ""}
                              </p>
                              <FaCheck style={{ color: "#65B741" }} />
                            </div> */}
                            <div className=" d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2">
                              <p className=" fs-6 m-0 ">
                                {t("Number of Students")}: {row.students}
                              </p>
                              <FaCheck style={{ color: "#65B741" }} />
                            </div>
                            <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2">
                              <p className=" fs-6 m-0 ">
                                {t("Number of Teachers")}: {row.teachers}
                              </p>
                              <FaCheck style={{ color: "#65B741" }} />
                            </div>
                            <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2">
                              <p className=" fs-6 m-0  ffcairo f-bold">
                                {t("Number of Prizes in Store")}:{" "}
                                {row.prizes_count}
                              </p>
                              <FaCheck style={{ color: "#65B741" }} />
                            </div>
                            {row.feature_1 && (
                              <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2">
                                <p className=" fs-6 m-0  ffcairo ">
                                  {row.feature_1}
                                </p>
                                <FaCheck style={{ color: "#65B741" }} />
                              </div>
                            )}
                            {row.feature_2 && (
                              <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2">
                                <p className=" fs-6 m-0  ffcairo ">
                                  {row.feature_2}
                                </p>
                                <FaCheck style={{ color: "#65B741" }} />
                              </div>
                            )}
                            {row.feature_3 && (
                              <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2 ">
                                <p className=" fs-6 m-0  ffcairo ">
                                  {row.feature_3}
                                </p>
                                <FaCheck style={{ color: "#65B741" }} />
                              </div>
                            )}
                            {row.feature_4 && (
                              <div className="  d-flex  gap-2 justify-content-between align-content-center  border-1  border-bottom p-2 ">
                                <p className=" fs-6 m-0  ffcairo ">
                                  {row.feature_4}
                                </p>
                                <FaCheck style={{ color: "#65B741" }} />
                              </div>
                            )}
                          </Col>
                        </Row>
                        <div className="m-auto mt-3 ">
                          <Button
                            className="w-100 o  py-2 px-5 main_button"
                            onClick={
                              user
                                ? () => navigate("/packages")
                                : () => navigate("/register")
                            }
                          >
                            اشترك الان
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </div>
          {/* <div className="p-3 p-md-5  bg-white ">
            <Row className="">
              <Col lg={12} sm={12} className="col-12">
                <div className="text-center ">
                  <p className="m-0 p-0 text-info fw-bolder">{t("Package")}</p>
                  <h2 className=" m-0 fw-bolder text-dark">
                    {t("How to Book Your Weekly Package")}
                  </h2>
                </div>
              </Col>
              <Col className="col-12">
                <Row className="d-flex justify-content-between row my-3 px-2">
                  <div className="col-12 col-lg-3 col-md-4 col-sm-6 text-center p-3  rounded-4 bg-white shadow-lg main_card mt-4">
                    <div>
                      <img className="w-25" src={rightIcon} alt={t("Icon")} />
                    </div>
                    <h4 className="my-1 fw-700">{t("Choose Your Package")}</h4>
                    <p style={{ color: "#aaa" }}>
                      {t(
                        "You can choose the package that suits you, based on the number of teachers and students in your school."
                      )}
                    </p>
                  </div>
                  <div className="col-12 col-lg-3 col-md-4 col-sm-6 text-center p-3  rounded-4 bg-white shadow-lg  main_card mt-4">
                    <div>
                      <img className="w-25" src={middleIcon} alt={t("Icon")} />
                    </div>
                    <h4 className="my-1 fw-700">{t("Manage Your School")}</h4>
                    <p style={{ color: "#aaa" }}>
                      {t(
                        "You can create emails for the teachers and students at your school."
                      )}
                    </p>
                  </div>
                  <div className="col-12 col-lg-3 col-md-4 col-sm-6 text-center p-3  rounded-4 bg-white  shadow-lg main_card mt-4">
                    <div>
                      <img className="w-25" src={leftIcon} alt={t("Icon")} />
                    </div>
                    <h4 className="my-1 fw-700">
                      {t("Search for What You Want")}
                    </h4>
                    <p style={{ color: "#aaa" }}>
                      {t(
                        "You can search and find everything easily and quickly."
                      )}
                    </p>
                  </div>
                </Row>
              </Col>
            </Row>
          </div> */}
          <div className="p-3 p-md-5 bg-white  ">
            <Row className="mb-5">
              <Col lg={12} sm={12} className="col-12 mb-4 ">
                <div className="text-center">
                  <p className="m-0 p-0 text-info fw-bolder">{t("Contact")}</p>
                  <h2
                    className=" m-0 fw-bolder text-dark"
                    // style={{ border: "2px solid #0077B6" }}
                  >
                    {t("Contact & social")}
                  </h2>
                </div>
              </Col>
              <Col md={12} lg={12} sm={12}>
                <div>
                  <Row className="d-flex justify-content-between row   px-2 text-center">
                    <div className="col-12 col-lg-4  col-md-6 col-sm-12 my-2   ">
                      <div className="rounded-4 bg-white shadow-lg main_card p-3 h-100">
                        <div className="mb-2">
                          <img width={60} src={ownerImg} />
                        </div>
                        <CardTitle>{t("Owner")}</CardTitle>
                        <CardText>
                          {/* {t(
                            "The platform is owned by RAQAMNA Information Technology LLC."
                          )} */}
                          {isRTL
                            ? landingData?.result?.data?.owner_ar
                            : landingData?.result?.data?.owner_en}
                        </CardText>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4  col-md-6 col-sm-12 my-2">
                      <div className="rounded-4 bg-white shadow-lg main_card p-3 h-100">
                        <div className="mb-2">
                          <img width={60} src={phoneImg} alt="Phone" />
                        </div>
                        <CardTitle>{t("Contact")}</CardTitle>
                        <CardText>
                          {t("Phone Number:")}{" "}
                          {isRTL
                            ? landingData?.result?.data?.phone
                            : landingData?.result?.data?.phone}
                        </CardText>

                        <div className="mt-3 d-flex   m-auto justify-content-evenly">
                          {/* Facebook */}
                          <div className="d-flex align-items-center my-2">
                            <a
                              href="https://www.facebook.com/profile.php?id=61565383687181"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <BsFacebook className="me-2 text-primary fs-3" />
                            </a>
                          </div>

                          {/* Instagram */}
                          <div className="d-flex align-items-center my-2">
                            <a
                              href="https://www.instagram.com/school.points/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <BsInstagram className="me-2 text-danger fs-3" />
                            </a>
                          </div>

                          {/* Snapchat */}
                          <div className="d-flex align-items-center my-2">
                            <a
                              href="https://www.snapchat.com/add/school.points?share_id=8otI-V-xbsw&locale=ar-EG"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <BsSnapchat className="me-2 text-warning fs-3" />
                            </a>
                          </div>
                          <div className="d-flex align-items-center my-2">
                            <a
                              href="https://wa.me/+971568604148?text=تواصل مع خدمة الدعم الفني"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <RiWhatsappFill className="me-2 text-success fs-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4  col-md-12 col-sm-12 my-2 ">
                      <div className="rounded-4 bg-white shadow-lg main_card p-3 h-100">
                        <div className="mb-2">
                          <img width={60} src={addressImg} />
                        </div>
                        <CardTitle>{t("Address")}</CardTitle>
                        {/* <CardText>{t("Address Details")}</CardText> */}
                        <CardText>
                          {" "}
                          {/* {t("United Arab Emirates - Dubai")} */}
                          {isRTL
                            ? landingData?.result?.data?.address_ar
                            : landingData?.result?.data?.address_en}
                        </CardText>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}
