import { Badge, Button, Spinner } from "reactstrap";
import ProjectTables from "../../components/Table";
import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import schoolImage from "../../assets/school.jpg";
import client from "../../utils/client";

function Schools() {
  document.title = "المدرسة";
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [schools, setSchools] = useState<any>({});
  const [term, setSearchTerm] = useState<any>("");
  const [notFound, setNotFound] = useState<any>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await client.get(`school/manager/school`);
      isEmpty(response.data.result.data) ? setNoData(true) : setNoData(false);
      setSchools(response.data.result.data);
    } catch (error: any) {
      // const errors = error.response.data.data;
      const message = error?.response?.data.message;
      // console.log(error?.response.data.message);
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  function isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }
  const searchfetch = async () => {
    try {
      const response = await client.get(
        term != ""
          ? `school/manager/school?term=${term}`
          : `school/manager/school`
      );
      setSchools(response.data.result.data);
      if (response.data.result.data.length === 0) setNotFound("غير موجود");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <PageTitle title={"المدرسة"} />
      {!loading && !noData ? (
        <div className="rtl  p-3  mt-5">
          <ProjectTables
            tableTitle={"المدرسة"}
            tableDescription={"نبذة عن المدرسة"}
            // buttonTitle={"اضافة مدرسة"}
            // tableLink={"/schools/add"}
            th1={"اسم المدرسة"}
            th2={"جنس المدرسة"}
            th3={"عنوان المدرسة"}
            th4={"المراحل الدراسية"}
            th5={"النوع"}
            th6={"الباقات"}
            th7={"الحالة"}
            th8={"العمليات"}
            term={term}
            setSearchTerm={setSearchTerm}
            fetchData={searchfetch}
            notFound={notFound}
          >
            {!loading && !noData ? (
              <tr className="border-top">
                <td className="ffcairo">
                  <div className="d-flex align-items-center gap-2 p-2">
                    <div className="ms-3">
                      <h6 className="mb-0 ffcairo">{schools?.title}</h6>
                      {/* <span className="text-muted">{item.}</span> */}
                    </div>
                  </div>
                </td>
                <td className="ffcairo">
                  {schools?.gender == "boys" ? (
                    <Badge
                      color="primary"
                      className="p-2 fw-bold   col-lg-6 col-12"
                    >
                      صبيان
                    </Badge>
                  ) : schools?.gender == "mixed" ? (
                    <Badge
                      color="success"
                      className="p-2 col-lg-6 fw-bold col-12"
                    >
                      مختلط
                    </Badge>
                  ) : (
                    <Badge
                      color="danger"
                      className="p-2 col-lg-6 fw-bold col-md-12 col-sm-12 col-xl-6   col-12 border text-white rounded-2  text-center"
                    >
                      بنات
                    </Badge>
                  )}
                </td>
                {/* <td className="ffcairo">{schools?.user?.email}</td> */}
                {/* <td className="ffcairo">{item?.user?.phone}</td> */}
                <td className="text-muted ffcairo">{schools?.address}</td>

                <td className="gap-2 text-muted ffcairo">
                  {schools?.grades?.map((item: any, index: any) => {
                    return (
                      <Badge
                        key={index}
                        className="bg-success d-block fs-6 ffcairo mb-2"
                      >
                        {item.title}
                      </Badge>
                    );
                  })}
                </td>
                <td className="text-muted ffcairo">
                  {schools?.type == "governmental" ? "حكومي" : "خاص"}
                </td>
                <td className="   gap-2">
                  <Badge className="bg-success fs-6 ffcairo">
                    {schools.packages.title ?? "الباقة المجانية"}
                  </Badge>
                  {/* {schools?.packages?.map((item: any, index: any) => {
                  
                  })} */}
                </td>
                <td>
                  {schools?.is_active == 1 ? (
                    <Badge className="bg-success fs-6 ffcairo">{"فعال"}</Badge>
                  ) : (
                    <Badge className="bg-secondary fs-6 ffcairo">
                      {"غير فعال"}
                    </Badge>
                  )}
                </td>
                <td>
                  <Link to={`/schools/show`}>
                    <Button color="primary" outline>
                      <EditIcon />
                    </Button>
                  </Link>
                </td>
              </tr>
            ) : noData ? (
              <tr className=" mt-4 ">
                <td colSpan={6} className=" text-center">
                  <i
                    className="bi bi-exclamation-circle-fill text-warning"
                    style={{ fontSize: "50px" }}
                  ></i>
                  <p className="fs-2">لايوجد بيانات للعرض الأن</p>
                </td>
              </tr>
            ) : (
              <tr className=" mt-4 ">
                <td colSpan={6} className=" text-center">
                  <Spinner className="m-5" color="primary">
                    Loading...
                  </Spinner>
                </td>
              </tr>
            )}
          </ProjectTables>
          <ToastContainer />
        </div>
      ) : noData ? (
        <div className="container  d-flex flex-column align-items-center justify-content-center">
          <i
            className="bi bi-exclamation-circle-fill text-warning"
            style={{ fontSize: "50px" }}
          ></i>
          <p className="fs-2">لايوجد بيانات للعرض الأن</p>
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

export default Schools;
