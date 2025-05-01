import { useParams } from "react-router-dom";
import currentIcon from "../../../assets/current.png";
import minusIcon from "../../../assets/minus.png";
import image1 from "../../../assets/reward 1.png";
import useFetch from "../../../hooks/useFetch";
import studentsImage from "../../../assets/sidebar/boy-2.png";

function StudentProfile() {
  const { id } = useParams();
  const endpoint = `school/manager/students/behaviors/details/${id}`;
  const { data: detailsData } = useFetch({ queryKey: [endpoint], endpoint });
  const StudentEndpoint = `school/manager/students/${id}`;
  const { data: StudentDetails } = useFetch({
    queryKey: [StudentEndpoint],
    endpoint: StudentEndpoint,
  });


  return (
    <div>
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
        className="reports mt-5"
        style={{
          padding: "0 100px",
        }}
      >
        <div
          className="report  "
          style={{
            color: "#FFB703",
            fontSize: "20px",
            borderRadius: "32.57px",
            boxShadow: "black 0px 0px 46px -34px",
            border: "1px solid #0000000D",
          }}
        >
          <div className="report-image">
            <img
              src={image1}
              style={{
                border: "1px solid #0000000D",
                borderBottom: "0px solid #0000000D",
                boxShadow: "black 0px 0px 46px -34px",
                borderRadius: "32.57px",
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <div className="report-number my-1">
            {detailsData?.result?.data?.current_points}
          </div>
          <div className="report-name">الرصيد الحالي </div>
        </div>
        <div
          className="report "
          style={{
            color: "#638D00",
            fontSize: "20px",
            borderRadius: "32.57px",
            boxShadow: "black 0px 0px 46px -34px",
            border: "1px solid #0000000D",
          }}
        >
          <div className="report-image">
            <img
              src={currentIcon}
              style={{
                border: "1px solid #0000000D",
                borderBottom: "0px solid #0000000D",
                boxShadow: "black 0px 0px 46px -34px",
                borderRadius: "32.57px",
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <div className="report-number">
            {detailsData?.result?.data?.good_points}
          </div>
          <div className="report-name">مجموع البوينت المكتسبة</div>
        </div>
        <div
          className="report "
          style={{
            color: "#990101",
            fontSize: "20px",
            borderRadius: "32.57px",
            boxShadow: "black 0px 0px 46px -34px",
            border: "1px solid #0000000D",
          }}
        >
          <div className="report-image">
            <img
              className="p-4 minus-class"
              src={minusIcon}
              style={{
                border: "1px solid #0000000D",
                borderBottom: "0px solid #0000000D",
                boxShadow: "black 0px 0px 46px -34px",
                borderRadius: "32.57px",
              }}
            />
          </div>
          <div className="report-number">
            {detailsData?.result?.data?.bad_points}
          </div>
          <div className="report-name my-1">مجموع حسميات البوينت</div>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            border: "2px solid #A7C957",
            borderRadius: "23px",
          }}
        >
          <p style={{ ...infoStyle, borderLeft: "2px solid #A7C957" }}>
            اسم الطالب : {StudentDetails?.result?.data?.name}
          </p>
          <p
            style={{
              ...infoStyle,
              borderLeft: "2px solid #A7C957",
              padding: "10px 10px",
            }}
          >
            الصف : {StudentDetails?.result?.data?.row_id?.title}
          </p>
          <p style={infoStyle}>
            الفصل: {StudentDetails?.result?.data?.class_id?.title}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#ECF2F8",
          border: "5px solid #ECF2F8 ",
          borderRadius: "7px",
          margin: "20px 0",
        }}
      >
        {detailsData?.result?.data?.behaviors?.length ? (
          detailsData?.result?.data?.behaviors?.map((item, index) => (
            <div className="accordion mb-3" id="accordionExample" key={index}>
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button justify-content-between collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    <h5 style={headerStyle}>
                      {item?.user?.gender === "male" ? "المعلم: " : "المعلمة: "}
                      {item?.user?.name}
                    </h5>
                    <h5
                      style={{
                        ...headerStyle,
                        color: item?.points > 0 ? "#3A5300" : "#7C0000",
                        flex: "1",
                      }}
                    >
                      {item?.points > 0 ? " ملاحظة إيجابية" : "ملاحظة سلبية"}
                    </h5>
                    <h5 style={{ ...headerStyle, flex: "1", margin: "0 10px" }}>
                      {item?.created_at?.slice(0, 10)}
                    </h5>
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-center my-2">
                    <h4>{item?.behavior?.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center p-2 fw-700">لايوجد بيانات</h2>
        )}
      </div>
    </div>
  );
}

const infoStyle = {
  margin: "0",
  fontSize: "20px",
  fontWeight: "700",
  padding: "10px 5px",
};

const headerStyle = {
  fontSize: "17.51px",
  fontWeight: "400",
};

export default StudentProfile;
