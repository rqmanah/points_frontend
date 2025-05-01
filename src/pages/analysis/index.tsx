import CloudCard from "../../components/cloud-card";
import { Card, CardBody, Row, Spinner } from "reactstrap";
import analyticsImage from "../../assets/sidebar/analytics 1.png";
import { useEffect, useState } from "react";
import client from "../../utils/client";
import FullChart from "../../components/Fullcharts";
function Analysis() {
  document.title = "الأحصائيات";
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [show, setShow] = useState(false);
  const [charts, setCharts] = useState({
    numberOfPoints: false,
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await client.get(`school/manager/report`);
      setData(response.data.result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h3
        className="col-12 col-lg-2 col-md-4  col-sm-6 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
        style={{ border: "2px solid #A7C957", fontSize: "20px" ,}}
      >
        <div
          className="rounded-circle"
          style={{
            border: "2px solid #A7C957",
            width: "45px",
            background: "#A7C957",
            scale: "1.6",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={35} className="p-1" src={analyticsImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">الإحصائيات</div>
      </h3>
      {/* <PageTitle title={"الأحصائيات"} /> */}
      {!loading ? (
        <div className="container">
          <div className="row  d-flex justify-content-evenly">
            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                title={"عدد الطلاب"}
                points={data?.students_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                title={"عدد المعلمين"}
                points={data?.teachers_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>

            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                title={"عدد الجوائز الموزعة"}
                points={data?.winning_prizes_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                className={`${
                  charts.numberOfPoints ? "bg-gray text-white" : ""
                }`}
                onClick={() =>
                  setCharts((prev) => ({
                    ...prev,
                    numberOfPoints: !prev.numberOfPoints,
                  }))
                }
                title={"عدد النقاط الضائعة"}
                points={data?.losing_points_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                className={`${
                  charts.numberOfPoints ? "bg-gray text-white" : ""
                }`}
                onClick={() =>
                  setCharts((prev) => ({
                    ...prev,
                    numberOfPoints: !prev.numberOfPoints,
                  }))
                }
                title={"إجمالي عدد البوينت المكتسب"}
                points={data?.winning_points_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                className={`${
                  charts.numberOfPoints ? "bg-gray text-white" : ""
                }`}
                onClick={() =>
                  setCharts((prev) => ({
                    ...prev,
                    numberOfPoints: !prev.numberOfPoints,
                  }))
                }
                title={" إجمالي عدد البوينت في أرصدة الطلاب "}
                points={data?.points_count ?? 0}
                icon={"ri-star-fill"}
              />
            </div>

            <div className="col-lg-4 col-md-5 col-sm-6 col-12  my-2">
              <CloudCard
                className={`${
                  charts.numberOfPoints ? "bg-gray text-white" : ""
                }`}
                onClick={() =>
                  setCharts((prev) => ({
                    ...prev,
                    numberOfPoints: !prev.numberOfPoints,
                  }))
                }
                title={"عدد البوينت المدفوع"}
                points={data?.points_spent_on_prizes ?? 0}
                icon={"ri-star-fill"}
              />
            </div>
            {charts.numberOfPoints && (
              <div className="col-lg-12 my-2  ">
                <Card className="border-0">
                  <CardBody>
                    <Row className="d-flex justify-content-center bg-transparent">
                      <FullChart data={data} charts={charts} />
                    </Row>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container  d-flex justify-content-center">
          <Spinner className="m-5" color="primary">
            Loading...
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default Analysis;
