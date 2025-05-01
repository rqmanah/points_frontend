import React from "react";
import { Row, Spinner } from "reactstrap";

interface Student {
  id: number;
  name: string;
  row: {
    title: string;
  };
  class: {
    title: string;
  };
}

interface Prize {
  price: number;
  title: string;
}

interface Order {
  id: number;
  student: Student;
  prize: Prize;
  created_at: string;
}

interface CanceledOrderProps {
  isLoading: boolean;
  ordersData: {
    result: {
      data: Order[];
    };
  };
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function CanceledOrder({
  isLoading,
  ordersData,
  selectedIds,
  setSelectedIds,
  canceledOrders,
}: CanceledOrderProps) {
  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAllChange = () => {
    const allIds = ordersData.result.data.map((item) => item.id);
    setSelectedIds(
      selectedIds.length === ordersData.result.data.length ? [] : allIds
    );
  };

  return (
    <div>
      {!isLoading && canceledOrders?.length > 0 ? (
        <Row>
          <div>
            <table className="table" style={{ borderColor: "transparent" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #49494933" }}>
                  <th scope="col" className="text-center">
                  رقم الطلب
                  </th>
                  <th scope="col" className="text-center">
                    اسم الطالب
                  </th>
                  <th scope="col" className="text-center">
                    الصف
                  </th>
                  <th scope="col" className="text-center">
                    الفصل
                  </th>
                  <th scope="col" className="text-center">
                    قيمة الجائزة
                  </th>
                  <th scope="col" className="text-center">
                    اسم الجائزة
                  </th>
                  <th scope="col" className="text-center">
                    تاريخ الطلب
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && canceledOrders?.length ? (
                  ordersData.result.data.map(
                    (item) =>
                      item?.status == "canceled" && (
                        <tr key={item.id}>
                          <td className="text-center">{item?.id}</td>
                          <td className="text-center">{item?.student?.name}</td>
                          <td className="text-center">
                            {item?.student?.row?.title}
                          </td>
                          <td className="text-center">
                            {item?.student?.class?.title}
                          </td>
                          <td className="text-center">{item?.prize?.price}</td>
                          <td className="text-center">{item?.prize?.title}</td>
                          <td className="text-center">{item?.created_at}</td>
                        </tr>
                      )
                  )
                ) : (
                  <tr className="justify-content-center">
                    <td colSpan={8} className="text-center">
                      <Spinner className="m-5" color="primary">
                        Loading...
                      </Spinner>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <i
              className="bi bi-exclamation-circle-fill"
              style={{ fontSize: "50px" }}
            ></i>
            <p className="fs-3">لايوجد بيانات</p>
          </div>
        </Row>
      )}
    </div>
  );
}

export default CanceledOrder;
