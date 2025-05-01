// import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Row } from "reactstrap";
import studentsImage from "../../../assets/sidebar/boy-2.png";
import PlusIcon from "../../../components/icons/PlusIcon";
import { useMutate } from "../../../hooks/useMutate";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../components/SuccessModal";
import { UserContext } from "../../../utils/userContext";
import useFetch from "../../../hooks/useFetch";

function UploadFile() {
  document.title = "رفع ملف طالب";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalRowsError, setModalRowsError] = useState(false);
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setFileName(file.name); // Save the file name to display it
  };
  const {
    mutate: submitFile,
    isPending: loadingSubmit,
    data: rowError,
  } = useMutate({
    mutationKey: ["school/manager/students/storeExcel"],
    endpoint: `school/manager/students/storeExcel`,
    onSuccess: (data) => {
      const rows = data?.data?.result?.data?.error_rows;
      if (rows?.length) {
        setModalRowsError(true);
      } else {
        setModal(true);
      }

      // setTimeout(() => navigate("/teachers"), 2000);
      setSelectedFile(null);
      setFileName("");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    formData: true,
  });
  const { mutate: handelSubmit } = useMutate({
    mutationKey: ["school/store"],
    endpoint: `school/store`,
    onSuccess: (data) =>
      submitFile({
        file: data?.data?.result?.data,
      }),
    formData: true,
  });
  const ErrorRows = rowError?.data?.result?.data?.error_rows;

  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      handelSubmit(formData);
    } else {
      toast.error("يرجى اختيار ملف أولاً", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const endpoint = `school/manager/rows`;
  const { data: AllRows } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  return (
    <div className="container-fluid">
      {/* <PageTitle title={"إضافة معلمين"} /> */}
      <h3
        className="col-12 col-lg-2 col-md-4  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
        style={{ border: "2px solid #A7C957", fontSize: "20px" }}
      >
        <div
          className="rounded-circle"
          style={{
            border: "2px solid #A7C957",
            width: "45px",
            scale: "1.6",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={35} className="p-1" src={studentsImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">الطلاب</div>
      </h3>
      <div
        style={{
          border: "1px solid #368AAFB2",
          borderRadius: "8px",
          padding: "15px",
          margin: "30px  auto ",
          width: "95%",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "22.83px",
            fontWeight: "700",
            color: "#0077B6",
          }}
        >
          إضافة طلاب
        </p>
        <Row className="d-flex justify-content-center p-2 ">
          <Col lg={12} className="border p-2 " style={{ borderRadius: "6px" }}>
            <Card className=" m-2">
              <div className="mt-4 text-center">
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#8A8A8A",
                  }}
                >
                  رفع ملف إكسل خاص بالطلاب
                </p>

                <div className="upload-container">
                  <input
                    type="file"
                    className="form-control d-none"
                    id="teacherFile"
                    aria-describedby="teacherFileAddon"
                    aria-label="Upload"
                    name="teacherFile"
                    accept=".xlsx"
                    onChange={(event) => {
                      if (event.target.files) {
                        handleFileChange(event.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="teacherFile"
                    style={{
                      backgroundColor: "#0077B6",
                      borderRadius: "4px",
                      padding: "10px 30px",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "auto",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <span>اختيار ملف من الجهاز</span>
                    <PlusIcon />
                  </label>
                </div>
                {fileName && (
                  <p className="mt-3">
                    <strong>الملف المختار:</strong> {fileName}
                  </p>
                )}
                <Button
                  style={{
                    backgroundColor: "#A7C957",
                    borderRadius: "4px",
                    padding: "8px 30px",
                    border: "0px solid",
                    margin: "10px",
                  }}
                  onClick={handleSubmit}
                  disabled={loadingSubmit} // Disable the button while loading
                >
                  {loadingSubmit ? "جارٍ الرفع..." : "رفع الملف"}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        style={{
          padding: "15px",
          margin: "30px  auto ",
          width: "95%",
        }}
      >
        <h4>ملاحظة :</h4>
        <p className="p-0 m-0">
          لإنشاء الملف، يرجى تحميل النسخة المرفقة للاطلاع على مثال يوضح كيفية
          إنشاء الملف.
        </p>
        <p className="p-0 m-0">
          يُرجى استخدام المعلومات التالية عند إعداد الملف:
        </p>
        <ul>
          <li
            style={{
              listStyle: "outside",
            }}
            className="fw-bolder"
          >
            المراحل الدراسية :{" "}
            {user?.schools?.grades?.map((item) => (
              <span className="fw-200">- {item?.title}</span>
            ))}
          </li>
          <li
            style={{
              listStyle: "outside",
            }}
            className="fw-bolder"
          >
            الصفوف التعليمية :{" "}
            {AllRows?.result?.data?.map((item) => (
              <span className="fw-200"> , {item?.title}</span>
            ))}
          </li>
          <li
            style={{
              listStyle: "outside",
            }}
            className="fw-bolder"
          >
            الفصول الدراسية :{" "}
            {user?.schools?.classes?.map((item) => (
              <span className="fw-200"> , {item?.title}</span>
            ))}
          </li>
        </ul>
        <p className="p-0 m-0 fw-bolder">
          ملاحظة: كلمة المرور الافتراضية للطالب ستكون رقم الهوية الخاص به، ويمكن
          للطالب أو المدير تغييرها لاحقًا"
        </p>
      </div>
      <SuccessModal
        isOpen={modal}
        setOpen={setModal}
        text={rowError?.data?.message || "تم رفع الملف بنجاح"}
        toggle={() => {
          setModal(!modal);
          navigate("/students");
        }}
        actionClose={() => {
          setModal(!modal);
          navigate("/students");
        }}
      />
      <SuccessModal
        isOpen={modalRowsError}
        setOpen={setModalRowsError}
        text={`  هناك بعض المشاكل في   الصف رقم `}
        updatePackage
        children={
          <div className="" style={{
            width: "450px",
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            {ErrorRows?.map((item) => (
              <span className="px-1">{item}</span>
            ))}
          </div>
        }
        toggle={() => {
          setModalRowsError(!modal);
          navigate("/students");
        }}
        actionClose={() => {
          setModalRowsError(!modal);
          navigate("/students");
        }}
      />

      <ToastContainer />
    </div>
  );
}

export default UploadFile;
