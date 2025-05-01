import { useEffect, useState } from "react";
import { Card, CardBody, Row, Table } from "reactstrap";
import { orderStatus, orderType } from "../../../types";
import { cancelOrder, getMyOrders } from "../../../utils/api.functions";

export function StudentRequests() {
  document.title = "الطلبات";
  const [rows, setRows] = useState<orderType[]>([]);
  useEffect(() => {
    getMyOrders().then((data) => setRows([...data]));
  }, []);
  const cancelRequest = (orderId: number, prizeId: number) => {
    cancelOrder(orderId, prizeId).then(() =>
      setRows([
        ...rows.map((row) =>
          row.id !== orderId ? row : { ...row, status: "canceled" }
        ),
      ])
    );
  };
  return (
    <Row>
      <h3
        className=" col-12 col-lg-4 col-md-4 p-2 col-sm-6 mx-auto py-2 fw-bold rounded-pill d-flex ffcairo mb-5"
        style={{ border: "2px solid #A7C957" }}
      >
        <div className="flex-grow-1 text-center">الطلبات</div>
      </h3>
      <div
        className=" p-2 rounded-4 col-11 m-auto"
        style={{ border: "6px solid #ECF2F8", backgroundColor: "#FAFCFF" }}
      >
        <Table className="no-wrap  align-middle  mb-0 " responsive borderless>
          <tr
            className=""
            style={{ borderBottom: "1px  solid #49494933" }}
          >
            <th className="ffcairo text-center">اسم الجائزة</th>
            <th className="ffcairo text-center">قيمة الجائزة</th>
            <th className="ffcairo text-center">تاريخ الطلب</th>
            <th className="ffcairo text-center">حالة الجائزة</th>
            <th className="ffcairo text-center">إلغاء</th>
          </tr>
          {rows.length === 0 ? (
            <tr className=" mt-5 " style={{ height: "150px" }}>
              <td colSpan={5} className=" text-center">
                <i className="ri-inbox-fill text-warning fs-1"></i>
                <p className=" text-warning fs-4 ">لايوجد بيانات حتي الأن</p>
              </td>
            </tr>
          ) : (
            <>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-center py-2">
                    {row?.prize?.title ?? ""}
                  </td>
                  <td className="text-center py-2">{row?.price ?? ""}</td>
                  <td className="text-center py-2">{row?.created_at ?? ""}</td>
                  <td className="text-center py-2">
                    {orderStatus?.[row.status] ?? ""}
                  </td>
                  <td className="text-center py-2">
                    {row.status === "pending" ? (
                      <button
                        className="rounded-pill border-0 text-danger btn btn-outline-danger danger-hover"
                        onClick={() => cancelRequest(row.id, row.prize.id)}
                      >
                        إلغاء الطلب
                      </button>
                    ) : (
                      <>---</>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </Table>
      </div>
    </Row>
  );
}
