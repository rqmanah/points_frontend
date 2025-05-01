import QRCode from "qrcode.react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import subIcon from "../../../assets/sidebar/subscription 1.png";
import useFetch from "../../../hooks/useFetch";
import { UserContext } from "../../../utils/userContext";

function DetailsInvoice() {
  const pageUrl = window.location.href;
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const endpoint = `school/manager/subscriptions/${id}`;
  const { data: detailsData } = useFetch({
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
      <div
        className="details_invoice"
        style={{
          border: "1px solid #767474",
          borderRadius: "21px",
          backgroundColor: "#F0F2F7",
          padding: "10px",
        
          margin: "30px auto",
        }}
      >
        <div className="text-center">
          <p style={{ fontSize: "20px", margin: "0", fontWeight: "700" }}>
            الفاتورة
          </p>
          <p className="" style={{ fontSize: "20px", fontWeight: "700" }}>
            منصة بوينت
          </p>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              اسم المدرسة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              {user?.school?.title}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              رقم الفاتورة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              {detailsData?.result?.data?.id}
            </p>
          </div>
          {/* <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              السجل الضريبي
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              سجل 1
            </p>
          </div> */}
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              نوع الباقة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              {detailsData?.result?.data?.package}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              القيمة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              {detailsData?.result?.data?.package_plan_price} درهم 
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              الضريبة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
              %15
            </p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p
              style={{
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              اجمالي الفاتورة
            </p>
            <p style={{ margin: "0", color: "#A7C957", fontWeight: "700" }}>
            {detailsData?.result?.data?.package_plan_price} درهم             </p>
          </div>
          <hr />
          <div
            className="text-center mt-3"
            style={{
              border: "3px solid #A7C957 ",
              borderRadius: "15px",
              width: "32%",
              padding: "5px",
              margin: "auto",
            }}
          >
            <QRCode value={pageUrl} size={128} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsInvoice;
