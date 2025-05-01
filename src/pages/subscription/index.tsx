import { useNavigate } from "react-router-dom";
import subIcon from "../../assets/sidebar/subscription 1.png";
import Alert from "../../components/icons/Alert";
import Uil_bill from "../../components/icons/Uil_bill";
import useFetch from "../../hooks/useFetch";

function Subscription() {
  const navigate = useNavigate();
  const endpoint = `school/manager/subscriptions`;
  const { data: subscriptionsData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });

  const endpointTow = `school/manager/subscriptions/permissions`;
  const { data: subscriptions } = useFetch({
    queryKey: [endpointTow],
    endpoint: endpointTow,
  });
  // Function to calculate the difference in days between two dates
  const calculateFreePeriod = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to calculate remaining days from today until endDate
  const calculateRemainingDays = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div
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
          <img width={40} className="p-1" src={subIcon} alt="" />
        </div>
        <div className="flex-grow-1 text-center mx-3">الاشتراكات</div>
      </div>
      {subscriptionsData?.result?.data?.map((item) => {
        return (
          <div
            key={item.id}
            className=" flex-column gap-4 gap-md-0 flex-md-row"
            style={{
              border: "1px solid #368AAF26",
              borderRadius: "7.26px",
              padding: "10px 10px 10px 10px",
              backgroundColor: "white",
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="d-flex align-items-center gap-1">
                <Uil_bill />
                <p
                  style={{ color: "#A7C957", fontSize: "16.34px", margin: "0" }}
                >
                  {item?.expired ? "الباقة السابقة" : "الباقة الحالية"}
                </p>
              </div>
              <p
                style={{
                  fontSize: "21px",
                  lineHeight: "40.84px",
                  margin: "4px 0 0 0",
                }}
              >
                {item?.package}
              </p>
              {item?.expired ? (
                <div className="d-flex gap-4 flex-wrap flex-md-nowrap">
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#D42736",
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    تاريخ بداية الباقة {item?.package_started_at?.slice(0, 10)}
                  </p>

                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#D42736",
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    تاريخ انتهاء الباقة {item?.package_ended_at?.slice(0, 10)}
                  </p>
                </div>
              ) : (
                <div className="d-flex gap-4 flex-wrap flex-md-nowrap">
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#D42736",
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    تاريخ بداية الباقة {item?.package_started_at?.slice(0, 10)}
                  </p>

                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#D42736",
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    تاريخ انتهاء الباقة {item?.package_ended_at?.slice(0, 10)}
                  </p>
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "#D42736",
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    مدة الفترة المجانية {item?.permissions?.ended_at_by_days}{" "}
                    أيام.
                  </p>
                  {item?.free == 0 && (
                    <>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "#D42736",
                          fontWeight: "400",
                          margin: "0",
                        }}
                      >
                        عدد الطلاب المتبقي {item?.permissions?.students}
                      </p>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "#D42736",
                          fontWeight: "400",
                          margin: "0",
                        }}
                      >
                        عدد المعلمين المتبقي {item?.permissions?.teachers}
                      </p>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "#D42736",
                          fontWeight: "400",
                          margin: "0",
                        }}
                      >
                        عدد الجوائز المتبقي {item?.permissions?.prizes}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            {!item?.expired && (
              <div className="d-flex flex-column justify-content-between align-items-center gap-3 gap-md-0">
                <div className="d-flex align-items-center gap-1 "
                
                >
                  <Alert />
                  <p
                    style={{
                      margin: "0",
                      color: "#FF901D",
                      fontSize: "14.53px",
                      fontWeight: "400",
                    }}
                  >
                    متبقي {item?.permissions?.ended_at_by_days} ايام
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-blue"
                  style={{
                    fontSize: "16.34px",
                    lineHeight: "30.63px",
                    borderRadius: "5.45px",
                    color: "white",
                    padding: "8px 16px",
                    border: "0px solid transparent",
                    fontWeight: "400",
                  }}
                  onClick={() => navigate("/packages")}
                >
                  ترقية الباقة
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Subscription;
