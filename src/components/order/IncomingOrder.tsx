import React, { useState, useEffect } from "react";
import { Row, Spinner } from "reactstrap";
import { useMutate } from "../../hooks/useMutate";
import { toast } from "react-toastify";
import SuccessModal from "../SuccessModal";

function IncomingOrder({
  isLoading,
  ordersData,
  selectedIds,
  setSelectedIds,
  incomingOrders,
  refetch,
}: any) {
  const [itemData, setItemData] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };
  const [open, setOpen] = useState(false);

  const handleSelectAllChange = () => {
    const allIds = ordersData.result.data.map((item) => item.id);
    setSelectedIds(
      selectedIds.length === ordersData.result.data.length ? [] : allIds
    );
  };

  const {
    mutate: handelComplete,
    isPending: loadingSubmit,
    data,
  } = useMutate({
    mutationKey: [`school/manager/orders/complete/${itemData?.id}`],
    endpoint: `school/manager/orders/complete/${itemData?.id}`,
    onSuccess: () => {
      refetch();
      setOpen(true);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
    formData: true,
  });

  const { mutate: handelCancel, isPending: cancelLoading , data:cancelData } = useMutate({
    mutationKey: [`school/manager/orders/cancel/${itemData?.id}`],
    endpoint: `school/manager/orders/cancel/${itemData?.id}`,
    onSuccess: () => {
      refetch();
      setOpen(true);

    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
    formData: true,
  });

  useEffect(() => {
    if (itemData && actionType) {
      if (actionType === "complete") {
        handelComplete({ item: itemData });
      } else if (actionType === "cancel") {
        handelCancel({});
      }
      setActionType(null);
    }
  }, [itemData, actionType]);

  return (
    <div>
      {!isLoading && incomingOrders?.length > 0 ? (
        <Row>
          <div
          
          style={{
            overflow:"scroll"
          }}>
            <table className="table" style={{ borderColor: "transparent" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #49494933" }}>
                  <th scope="col" className="text-center border border-r">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="selectAll"
                        onChange={handleSelectAllChange}
                        checked={
                          selectedIds.length === ordersData.result.data.length
                        }
                      />
                    </div>
                  </th>
                  <th scope="col" className="text-center border border-r">
                    رقم الطلب
                  </th>
                  <th scope="col" className="text-center border border-r">
                    اسم الطالب
                  </th>
                  <th scope="col" className="text-center border border-r">
                    الصف
                  </th>
                  <th scope="col" className="text-center border border-r">
                    الفصل
                  </th>
                  <th scope="col" className="text-center border border-r">
                    قيمة الجائزة
                  </th>
                  <th scope="col" className="text-center border border-r">
                    اسم الجائزة
                  </th>
                  <th scope="col" className="text-center border">
                    تاريخ الطلب
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && incomingOrders?.length ? (
                  ordersData.result.data.map(
                    (item) =>
                      item?.status === "pending" && (
                        <tr key={item.id}>
                          <td className="text-center border border-r">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flexCheckDefault-${item.id}`}
                                onChange={() => handleCheckboxChange(item.id)}
                                checked={selectedIds.includes(item?.id)}
                              />
                            </div>
                          </td>
                          <td className="text-center border border-r">{item?.id}</td>
                          <td className="text-center border border-r">{item?.student?.name}</td>
                          <td className="text-center border border-r">
                            {item?.student?.row?.title}
                          </td>
                          <td className="text-center border border-r">
                            {item?.student?.class?.title}
                          </td>
                          <td className="text-center border border-r">{item?.price}</td>
                          <td className="text-center border border-r">{item?.prize?.title}</td>
                          <td className="text-center border border-r">{item?.created_at}</td>
                          <td className="text-center border border-r">
                            <div className="d-flex gap-3 justify-content-center">
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
                                onClick={() => {
                                  setItemData(item);
                                  setActionType("complete");
                                }}
                                disabled={loadingSubmit || cancelLoading}
                              >
                                {item?.id == itemData?.id && loadingSubmit ? (
                                  <Spinner />
                                ) : (
                                  "تسليم"
                                )}
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
                                onClick={() => {
                                  setItemData(item);
                                  setActionType("cancel");
                                }}
                                disabled={loadingSubmit || cancelLoading} // تعطيل الأزرار أثناء التحميل
                              >
                                {item?.id == itemData?.id && cancelLoading ? (
                                  <Spinner />
                                ) : (
                                  "إلغاء"
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                  )
                ) : (
                  <tr className="justify-content-center">
                    <td colSpan={8} className="text-center border border-r">
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
            <p className="fs-3">لايوجد طلبات واردة حتى الان</p>
          </div>
        </Row>
      )}
      <SuccessModal
        isOpen={open}
        setOpen={setOpen}
        text={data?.data?.message || cancelData?.data?.message}
        toggle={() => setOpen(!open)}
      />
    </div>
  );
}

export default IncomingOrder;
