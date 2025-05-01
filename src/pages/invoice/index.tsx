import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import subIcon from "../../assets/sidebar/subscription 1.png";
import DownloadIcon from "../../components/icons/DownloadIcon";
import useFetch from "../../hooks/useFetch";

function Invoice() {
  const endpoint = `school/manager/subscriptions`;
  const { data: subscriptionsData, isLoading } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
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
        <div className="flex-grow-1 text-center mx-3">الفاتورة</div>
      </div>
      <div className=" mt-5" style={{
        //  margin: "20px 150px" ,
         overflow:"scroll"


      }}>
        <table className="table" style={{ borderColor: "transparent" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #49494933" }}>
              <th
                scope="col"
                style={{
                  backgroundColor: "#0077B6",
                  color: "white",
                  borderLeft: "1px solid #E8E8E8 ",
                  textAlign: "center",
                }}
              >
                {" "}
                رقم الفاتورة
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#0077B6",
                  color: "white",
                  borderLeft: "1px solid #E8E8E8 ",
                  textAlign: "center",
                }}
              >
                {" "}
                فترة الاشتراك
              </th>

              <th
                scope="col"
                style={{
                  backgroundColor: "#0077B6",
                  color: "white",
                  borderLeft: "1px solid #E8E8E8 ",
                  textAlign: "center",
                }}
              >
                المبلغ
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#0077B6",
                  color: "white",
                  borderLeft: "1px solid #E8E8E8 ",
                  textAlign: "center",
                }}
              >
                اسم الباقة
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#0077B6",
                  color: "white",
                  borderLeft: "1px solid #E8E8E8 ",
                  textAlign: "center",
                }}
              >
                تحميل الفاتورة
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              subscriptionsData?.result?.data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>

                  <td>
                    <div className="text-center">
                      <span style={{ color: "#438700" }}>
                        {item.package_started_at.slice(0, 10)}
                      </span>
                      <span className="mx-2">-</span>

                      <span style={{ color: "#D80000" }}>
                        {item.package_ended_at?.slice(0, 10)}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">{item.package_plan_price}</td>
                  <td className="text-center">
                    {item.package || "------------"}
                  </td>

                  <td className="text-center">
                    <Link to={`/invoice/${item.id}`}>
                      <DownloadIcon />
                    </Link>
                  </td>
                </tr>
              ))
            ) : !isLoading && subscriptionsData?.result?.data?.length ? (
              <tr className="justify-content-center">
                <td colSpan={5} className="text-center">
                  <i
                    className="bi bi-exclamation-circle-fill"
                    style={{ fontSize: "50px" }}
                  ></i>
                  <p className="fs-3">لايوجد بيانات</p>
                </td>
              </tr>
            ) : (
              <tr className="justify-content-center">
                <td colSpan={5} className="text-center">
                  <Spinner className="m-5" color="primary">
                    Loading...
                  </Spinner>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoice;
