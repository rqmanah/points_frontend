import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Card, Col, Modal, ModalBody, Row, Spinner } from "reactstrap"
import analytics from "../../assets/sidebar/analytics 1.png"
import AlertMan from "../../components/icons/AlertMan"
import { useMutate } from "../../hooks/useMutate"
import { packageType, userRoles } from "../../types"
import { buyPackage, getPackages } from "../../utils/api.functions"
import { UserContext } from "../../utils/userContext"
import SuccessModal from "../../components/SuccessModal"
import useFetch from "../../hooks/useFetch"
import { t } from "i18next"
export default function Packages() {
  document.title = "عرض الباقات"
  const { user } = useContext(UserContext)
  const [rows, setRows] = useState<packageType[]>([])
  const [selectedPackage, setSelectedPackage] = useState<packageType | null>(
    null
  )
  const [open, setOpen] = useState(false)
  const [openPacakge, setOpenPackage] = useState(false)


  const [discountCoupon, setDiscountCoupon] = useState<string>("")
  const [couponValid, setCouponValid] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalCheckPackage, setOpenModalCheckPackage] =
    useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  // const checkDiscountCoupon = () => {
  //   checkCoupon(discountCoupon).then((data) => {
  //     if (data.status !== "error") {
  //       toast.success("هذا الكوبون موجود وساري التطبيق علي الشراء", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       setCouponValid(discountCoupon);
  //     } else {
  //       toast.error("هذا الكوبون غير صالح", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       setCouponValid("");
  //     }
  //   });
  // };
  const {
    mutate: checkDiscountCoupon,
    isPending: checkLoading,
    data: couponValue,
  } = useMutate({
    mutationKey: [`school/manager/check/coupon`],
    endpoint: `school/manager/check/coupon`,
    onSuccess: (data) => {
      if (data?.data?.status !== "error") {
        toast.success("هذا الكوبون موجود وساري التطبيق علي الشراء", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        setCouponValid(discountCoupon)
      } else {
        toast.error("هذا الكوبون غير صالح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        setOpen(true)
        // setCouponValid("");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما")
    },
    formData: true,
  })
  const purchasePackage = () => {
    buyPackage(
      selectedPackage?.id ?? null,
      couponValid && couponValue?.data?.status !== "error"
        ? discountCoupon
        : null
    ).then((data) => {
      console.log("🚀 ~ ).then ~ data.InvoiceURL:", data?.InvoiceURL)
      if (data?.InvoiceURL) {
        window.open(data?.InvoiceURL)
      } else {
        setOpenPackage(true)
      }
    })
    setOpenModal(false)
    setSelectedPackage(null)
  }
  useEffect(() => {
    setLoading(true)
    getPackages()
      .then((data: packageType[]) => {
        setRows([...data])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  const percentageType = couponValue?.data?.result?.data?.type == "percentage"
  const valuePercentage = couponValue?.data?.result?.data?.value / 100
  const fixedValue = couponValue?.data?.result?.data?.value
  // const price = selectedPackage?.price || 0;
  // let priceAfterDiscount = price;
  const price = selectedPackage?.price || 0
  let priceAfterDiscount = price

  // تحقق إذا كانت قيمة الكوبون تساوي 100
  if (couponValue?.data?.result?.data?.value === 100) {
    priceAfterDiscount = 0 // إذا كان الكوبون 100، اجعل السعر النهائي صفر
  } else if (percentageType) {
    priceAfterDiscount -= price * valuePercentage
  } else if (fixedValue) {
    priceAfterDiscount -= fixedValue
  }

  const taxAmount = +priceAfterDiscount * 0.15
  const TotalAmount = +priceAfterDiscount + taxAmount

  const endpoint = `school/manager/get/country`
  const { data: LocationData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  })

  return (
    <>
      <div>
        {/* <PageTitle title={"عرض الباقات"} /> */}
        <h3
          className="col-12 col-lg-2 col-md-4  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
          style={{ border: "2px solid #A7C957", fontSize: "20px" }}
        >
          <div
            className="rounded-circle"
            style={{
              border: "2px solid #A7C957",
              width: "45px",
              scale: "1.5",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img width={35} className="p-1" src={analytics} alt="" />
          </div>
          <div className="flex-grow-1 text-center">الباقات</div>
        </h3>
        {!user?.has_package && (
          <div
            className="p-2   rounded-3 w-50 mt-3 "
            style={{
              backgroundColor: "#ff6969",
            }}
          >
            <p className="m-0 text-white">تم انتهاء الباقه</p>
          </div>
        )}
        <Row className="justify-content-center ">
          {loading ? (
            <div className="container  d-flex justify-content-center">
              <Spinner className="m-5" color="primary">
                Loading...
              </Spinner>
            </div>
          ) : (
            <>
              {rows.map((row, index) => (
                <Col lg={4} xxl={4} md={6} sm={7} key={index}>
                  <Card
                    className="bg-white rounded-5 z-1 mt-4 "
                    style={{ height: "610px" }}
                  >
                    <p className="fs-2 text-center text-dark ffcairo text-violet mt-2">
                      {row.title ?? "---"}
                    </p>
                    <Row className="d-flex  flex-column justify-content-center align-items-center position-relative h-100">
                      <Col
                        xxl={11}
                        md={9}
                        lg={11}
                        sm={10}
                        xs={10}
                        className="me-2 position-absolute top-0 "
                      >
                        <div className="rounded-5 bg-dark d-flex  justify-content-center flex-row-reverse">
                          <p className="fs-5 text-white mt-2 ffcairo">
                            {row.price && (
                              <>
                                <span
                                  style={{
                                    textDecoration: row.after_price
                                      ? "line-through"
                                      : "none",
                                  }}
                                >
                                  {row.price} {t("درهم")}
                                </span>
                                {row.after_price && (
                                  <span className="after-price">
                                    {" "}
                                    {row.after_price}
                                  </span>
                                )}
                              </>
                            )}
                          </p>

                          <p className="fs-5 text-white mt-2 ffcairo">الشهر/</p>
                        </div>
                      </Col>
                      <Col
                        xxl={9}
                        xs={8}
                        lg={9}
                        md={7}
                        sm={7}
                        className=" rounded-top-0 rounded-4 mt-3 flex-grow-1 "
                        style={{
                          backgroundColor: `${
                            row?.color ? `#${row.color}` : "#02c6b5"
                          }`,
                        }}
                      >
                        <div className=" d-flex  gap-2 justify-content-between  ">
                          <p
                            className=" mt-2 text-white"
                            title={row.description ?? ""}
                          >
                            {row?.short_description ?? ""}
                          </p>
                          <i
                            className="ri-check-line  fs-2  ms-2"
                            style={{ color: "#65B741" }}
                          ></i>
                        </div>
                        <div className=" d-flex  gap-2 justify-content-between lh-lg ">
                          <p className=" mt-2 text-white ffcairo">
                            عدد الطلاب {row.students}
                          </p>
                          <i
                            className="ri-check-line  fs-2  ms-2"
                            style={{ color: "#65B741" }}
                          ></i>
                        </div>
                        <div className=" d-flex  gap-2 justify-content-between lh-lg ">
                          <p className=" mt-2 text-white ffcairo">
                            عدد المعلمين {row.teachers}
                          </p>
                          <i
                            className="ri-check-line fs-2  ms-2"
                            style={{ color: "#65B741" }}
                          ></i>
                        </div>
                        <div className=" d-flex  gap-2 justify-content-between lh-lg ">
                          <p className=" mt-2 text-white ffcairo f-bold">
                            عدد الجوائز في المتجر {row.prizes_count}
                          </p>
                          <i
                            className="ri-check-line  fs-2  ms-2"
                            style={{ color: "#65B741" }}
                          ></i>
                        </div>
                        {row.feature_1 && (
                          <div className=" d-flex  gap-2 justify-content-between lh-lg">
                            <p className=" mt-2 text-white ffcairo ">
                              {row.feature_1 ?? ""}
                            </p>
                            <i
                              className="ri-check-line  fs-2  ms-2"
                              style={{ color: "#65B741" }}
                            ></i>
                          </div>
                        )}
                        {row.feature_2 && (
                          <div className=" d-flex  gap-2 justify-content-between lh-lg ">
                            <p className=" mt-2 text-white ffcairo ">
                              {row.feature_2 ?? ""}
                            </p>
                            <i
                              className="ri-check-line  fs-2  ms-2"
                              style={{ color: "#65B741" }}
                            ></i>
                          </div>
                        )}
                        {row.feature_3 && (
                          <div className=" d-flex  gap-2 justify-content-between ">
                            <p className=" mt-2 text-white   ffcairo">
                              {row.feature_3 ?? ""}{" "}
                            </p>
                            <i
                              className="ri-check-line  fs-2  ms-2"
                              style={{ color: "#65B741" }}
                            ></i>
                          </div>
                        )}
                        {row.feature_4 && (
                          <div className=" d-flex  gap-2 justify-content-between ">
                            <p className=" mt-2 text-white   ffcairo">
                              {row.feature_4 ?? ""}{" "}
                            </p>
                            <i
                              className="ri-check-line  fs-2  ms-2"
                              style={{ color: "#65B741" }}
                            ></i>
                          </div>
                        )}
                      </Col>
                      {user?.guard === userRoles?.MANAGER && (
                        <Col lg={8} xs={8}>
                          <Button
                            className="rounded-5 bg-secondary w-100 border-0  me-0 p-3 mb-2 fw-bold mt-2"
                            onClick={() => {
                              setSelectedPackage(row)
                              setOpenModal(true)
                            }}
                          >
                            اشتري الآن
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
      </div>
      <div className="  ">
        <Modal
          isOpen={openModal}
          toggle={() => setOpenModal(!openModal)}
          centered
          dir="ltr"
          style={{ maxWidth: "400px", backgroundColor: "transparent" }}
          contentClassName="rounded-5 bg-transparent border-0"
        >
          <ModalBody className="p-0 ">
            <div
              style={{
                backgroundColor: "#F0F2F7",
                padding: "20px",
                borderRadius: "20px",
                textAlign: "end",
              }}
            >
              <div className="text-center py-4">
                <h4>الخطة الاساسية</h4>
              </div>
              <div className="d-flex flex-row-reverse text-end">
                <input
                  type="text"
                  className="w-100 border-0 px-2 text-end"
                  value={discountCoupon}
                  placeholder="كود الخصم"
                  onChange={(ev) => setDiscountCoupon(ev.target.value)}
                  style={{
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "#A7C957",
                    color: "white",
                    border: "0 solid",
                    width: "100px",
                    fontSize: "20px",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  className="py-3"
                  onClick={() =>
                    checkDiscountCoupon({ coupon: discountCoupon })
                  }
                >
                  {!checkLoading ? "تطبيق" : <Spinner />}
                </button>
              </div>
              <div>
                <h3
                  style={{
                    color: "#141414",
                    fontSize: "20px",
                    fontWeight: "700",
                    padding: "10px 0",
                  }}
                >
                  الفاتورة
                </h3>
              </div>
              <div className="mb-4 row justify-content-between">
                <div
                  className="col-6 text-start"
                  style={{
                    color: "#A7C957",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {selectedPackage?.price}
                </div>
                <div className="col-6 fw-bold  ">مجموع السعر</div>
              </div>
              {couponValue?.data?.result?.data?.value && (
                <div className="mb-4 row justify-content-between">
                  <div
                    className="col-6 text-start"
                    style={{
                      // color: "#A7C957",
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <span>درهم</span>

                    {percentageType
                      ? `%${couponValue?.data?.result?.data?.value}`
                      : ` ${couponValue?.data?.result?.data?.value}`}
                  </div>

                  <div className="col-6 fw-bold  "> كود الخصم</div>
                </div>
              )}
              <div className="mb-4 row justify-content-between">
                <div
                  className="col-6 text-start"
                  style={{
                    // color: "#A7C957",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  %15
                </div>
                <div className="col-6 fw-bold  ">الضريبة المضافة</div>
              </div>
              <hr />
              <div className="mt-4 row justify-content-between">
                <div
                  className="col-6 text-start"
                  style={{
                    // color: "#A7C957",
                    fontSize: "16px",
                    fontWeight: "700",
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                    gap: "5px",
                  }}
                >
                  {/* <span>{` ${TotalAmount || price} `}</span> */}
                  <span>{` ${TotalAmount} `}</span>

                  {/* <span>درهم </span> */}
                  {` ${t("AED")}`}
                </div>
                <div
                  className="col-6 fw-bold  "
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  اجمالي الفاتورة
                </div>
              </div>
            </div>
          </ModalBody>
          <div className=" d-flex justify-content-center my-3">
            <button
              className="btn btn-primary py-3 mx-1"
              // onClick={() => purchasePackage()}
              onClick={() => {
                setOpenModalCheckPackage(true)

                setOpenModal(!open)
              }}
              // disabled={
              //   ((!couponValid && discountCoupon) ||
              //     couponValid != discountCoupon) &&
              //   discountCoupon
              //     ? true
              //     : false
              // }
              style={{
                backgroundColor: "#A7C957",
                color: "white",
                border: "0 solid",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              شراء
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={openModalCheckPackage}
          toggle={() => setOpenModalCheckPackage(!openModalCheckPackage)}
          centered
          dir="ltr"
          // style={{ maxWidth: "400px", backgroundColor: "transparent" }}
          // contentClassName="rounded-5 bg-transparent border-0"
        >
          <ModalBody>
            <div className="modal-body d-flex flex-column justify-content-center align-items-center">
              <AlertMan />

              <p
                style={{
                  // color: "#C32026",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                باشتراكك في هذه الباقه سوف يتم حذف اي طلاب او معلمين او جوائز
                فوق الحد المسموح به
              </p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => setOpenModalCheckPackage(false)}
                  style={{
                    backgroundColor: "#FF4F4F",
                    border: "0px solid",
                    width: "108px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                >
                  الغاء
                </button>
                <button
                  className="btn btn-primary py-3 mx-1"
                  onClick={() => {
                    purchasePackage()

                    setOpenModalCheckPackage(false)
                  }}
                  // disabled={
                  //   ((!couponValid && discountCoupon) ||
                  //     couponValid != discountCoupon) &&
                  //   discountCoupon
                  //     ? true
                  //     : false
                  // }
                  style={{
                    backgroundColor: "#A7C957",
                    color: "white",
                    border: "0 solid",
                    width: "108px",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  شراء
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
      <SuccessModal
        isOpen={open}
        setOpen={setOpen}
        text={couponValue?.data?.message}
        toggle={() => setOpen(!open)}
      />
      <SuccessModal
        isOpen={openPacakge}
        setOpen={setOpenPackage}
        text={"تم الاشتراك في الباقة بنجاح"}
        toggle={() => setOpenPackage(!openPacakge)}
      />
    </>
  )
}
