import { SetStateAction, useEffect, useState } from "react";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import noteIcon from "../../assets/sidebar/image 4.png";
import useFetch from "../../hooks/useFetch";
import client from "../../utils/client";
import { useMutate } from "../../hooks/useMutate";
import { toast } from "react-toastify";
import IncomingOrder from "../../components/order/IncomingOrder";
import CompleteOrder from "../../components/order/CompleteOrder";
import CanceledOrder from "../../components/order/CanceldOrder";
import SearchInput from "../../components/SearchInput";
import SuccessModal from "../../components/SuccessModal";

function Orders() {
  const [activeTab, setActiveTab] = useState("1");
  const [outStock, setOutStock] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [term, setTerm] = useState("");
  const toggleTab = (tab: SetStateAction<string>) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const endpoint = `school/manager/orders?term=${term}`;
  const {
    data: ordersData,
    isLoading,
    refetch,
  } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });

  // Fetch and filter orders based on their status
  useEffect(() => {
    if (ordersData) {
      const incoming = ordersData.result.data.filter(
        (order: any) => order.status === "pending"
      );
      const canceled = ordersData.result.data.filter(
        (order: any) => order.status === "canceled"
      );
      const Completed = ordersData.result.data.filter(
        (order: any) => order.status === "compeletd"
      );
      setIncomingOrders(incoming);
      setCanceledOrders(canceled);
      setCompleteOrder(Completed);
    }
  }, [ordersData]);

  const endpointAboutToBeOutOfStock = `school/manager/prize/stock?filter[stock]=mini`;
  const { data: AboutToBeOutOfStockData } = useFetch({
    queryKey: [endpointAboutToBeOutOfStock],
    endpoint: endpointAboutToBeOutOfStock,
  });

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



  useEffect(() => {
    outOfStock();
  }, []);

  return (
    <div>
      <Container fluid className="rounded-4">
        <h3
          className="col-12 col-lg-2 col-md-5  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
            <img width={35} className="p-1" src={noteIcon} alt="" />
          </div>
          <div className="flex-grow-1 text-center">الطلبات</div>
        </h3>
        <Row className="rounded-4" style={{ padding: "0" }}>
          <Col lg={12} className="rounded-4   p-0 ">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "calc(100vh - 225px)",
              }}
            >
              <div
                className="p-0 rounded-4 border"
                style={{ backgroundColor: "#0077B6" }}
              >
                <div
                  className="d-flex  p-0 rounded-4 flex-column flex-md-row"
                  style={{ backgroundColor: "#0077B6" }}
                >
                  <Nav pills className=" flex-grow-1 pt-2 justify-content-between justify-content-md-start " role="tablist">
                    <NavItem className="p-0">
                      <NavLink
                        href="#overview-tab"
                        className={
                          activeTab === "1"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3 me-2"
                            : "bg-transparent rounded-0 text-white me-2"
                        }
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        {/* <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "} */}
                        <span className=" d-md-inline-block">
                          <span className="fs-4 ms-2">
                            {incomingOrders.length}
                          </span>
                          واردة
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#activities"
                        className={
                          activeTab === "2"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3 me-2"
                            : "bg-transparent rounded=0 text-white me-2"
                        }
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        {/* <i className="bi bi-bag-dash d-inline-block d-md-none"></i>{" "} */}
                        <span className=" d-md-inline-block">
                          <span className="ms-2 fs-4">
                            {completeOrder?.length}
                          </span>
                          تم تسليمها
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#projects"
                        className={
                          activeTab === "3"
                            ? "bg-white text-black rounded-0 h-100 w-100 rounded-top-3  me-2"
                            : "bg-transparent rounded=0 text-white me-2"
                        }
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        {/* <i className="bi bi-bag-x-fill d-inline-block d-md-none"></i>{" "} */}
                        <span className=" d-md-inline-block">
                          <span className="ms-2 fs-4">
                            {canceledOrders.length}
                          </span>
                          ملغية
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div className=" py-2 px-2 ">
                    <SearchInput
                      placeholder={"بحث باسم الطالب "}
                      action={(e) => setTerm(e.target?.value)}
                    />
                  </div>
                </div>

                <TabContent
                  activeTab={activeTab}
                  className="pt-4 p-3 bg-white rounded-bottom-2 border"
                >
                  <TabPane tabId="1">
                    <IncomingOrder
                      isLoading={isLoading}
                      incomingOrders={incomingOrders}
                      ordersData={ordersData}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                      refetch={refetch}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <CompleteOrder
                      isLoading={isLoading}
                      ordersData={ordersData}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                      completeOrder={completeOrder}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <CanceledOrder
                      isLoading={isLoading}
                      ordersData={ordersData}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                      canceledOrders={canceledOrders}
                    />
                  </TabPane>
                </TabContent>
              </div>
              {/* {!!selectedIds?.length && (
                <div
                  style={{
                    boxShadow: "black 0px 0 49px -47px",
                    padding: "50px 20px",
                    textAlign: "center",
                    border: "1px solid #8484841A",
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15.46px",
                    }}
                  >
                    تم تحديد{" "}
                    <span style={{ color: "#0077B6" }}>
                      {selectedIds?.length}
                    </span>{" "}
                    طلب
                  </div>
                  <div className="d-flex gap-3  justify-content-center">
                    <button
                      style={{
                        backgroundColor: "#00A72E",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #00A72E",
                        width: "141px",
                        height: "44px",
                        color: "white",
                      }}
                      onClick={() => handelComplete({})}
                    >
                      {loadingSubmit ? <Spinner /> : "تسليم"}
                    </button>
                    <button
                      style={{
                        backgroundColor: "#C34646",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #C34646",
                        width: "141px",
                        height: "44px",
                        color: "white",
                      }}
                      onClick={() => handelCancel({})}
                    >
                      {cancelLoading ? <Spinner /> : "إلغاء"}
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </Col>
        </Row>
      </Container>
     
    </div>
  );
}

export default Orders;
