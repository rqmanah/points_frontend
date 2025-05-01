import { useParams } from "react-router-dom";
import studentsImage from "../../../assets/sidebar/boy-2.png";
import notes_logo from "../../../assets/sidebar/notes_logo.png";

import useFetch from "../../../hooks/useFetch";

function DetailsNotes() {
  const { id } = useParams();
  const endpoint = `school/teacher/students/behaviors/details/${id}`;
  const { data: detailsData } = useFetch({ queryKey: [endpoint], endpoint });
  const StudentEndpoint = `school/teacher/students/${id}`;
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
          <img width={35} className="p-1" src={notes_logo} alt="" />
        </div>
        <div className="flex-grow-1 text-center">الملاحظات</div>
      </h3>


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
                      {item?.user?.guard === 
"teacher" ? "المعلم: " : "المدير: "}
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
                  <div className="accordion-body text-center my-2">
                    <p>{item?.note}</p>
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

export default DetailsNotes;
