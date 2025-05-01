import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../utils/userContext";

export default function PaymentSuccess() {
  const {user , setUser} = useContext(UserContext)

  const endpoint = `school/manager/check/payment`;
  const { data, isSuccess } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });

  useEffect(() => {
    if (isSuccess) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const updatedUser = { ...storedUser, has_package: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser)
      }
    }
  }, [isSuccess]);

  return (
    <div className="container my-5">
      <Card className="text-center rounded p-5">
        <CardBody className="p-5 shadow-75">
          <CardTitle
            style={{ fontSize: "3rem" }}
            className="text-success"
            tag="h1"
          >
            لقد تمت عملية الدفع بنجاح
          </CardTitle>
          <CardText style={{ fontSize: "1.5rem" }} className="text-info">
            تهانيا لقد تم الإشتراك في الباقة بنجاح
          </CardText>
          <Link className="btn btn-outline-primary" to={"/schools/show"}>
            التوجه إلي صفحة المدرسة
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
