import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

export default function PaymentError() {
  return (
    <div className="container my-5">
      <Card className="text-center rounded p-5">
        <CardBody className="p-5 shadow-75">
          <CardTitle
            style={{ fontSize: "3rem" }}
            className="text-danger"
            tag="h1"
          >
            خطأ في الدفع
          </CardTitle>
          <CardText style={{ fontSize: "1.5rem", color: "#721c24" }}>
            لقد حدث خطأ في عملية الدفع برجاء المحاولة مرة أخري للإشتراك في
            الباقة
          </CardText>
          <Link className="btn btn-outline-primary" to={"/packages"}>
            التوجه إلي صفحة الباقات
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
