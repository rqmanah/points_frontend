import homeTitleIcon from "../../../assets/home_title.png";
import currentIcon from "../../../assets/current.png";
import minusIcon from "../../../assets/minus.png";
import earnIcon from "../../../assets/earn.png";
import { useContext, useEffect, useState } from "react";
import { Row } from "reactstrap";
import SearchInput from "../../../components/SearchInput";
import { studentNoteType, studentReportType } from "../../../types";
import {
  getStudentNotes,
  getStudentReports,
} from "../../../utils/api.functions";
import { UserContext } from "../../../utils/userContext";

export function StudentHome() {
  document.title = "الصفحة الرئيسية";
  const { user } = useContext(UserContext);
  const [staticsData, setStaticsData] = useState<studentReportType | null>();
  const [rows, setRows] = useState<studentNoteType[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getStudentReports().then((data: studentReportType) =>
      setStaticsData({ ...data })
    );
  }, []);
  useEffect(() => {
    getStudentNotes(search ?? null).then((data: studentNoteType[]) =>
      setRows([...data])
    );
  }, [search]);
  return (
    <Row>
      <h3
        className="col-12 col-lg-4 col-md-10 p-2 col-sm-12 mx-auto fw-bold rounded-pill d-flex ffcairo text-center"
        style={{
          border: "2px solid #A7C957",
          // maxWidth: "50%",
          wordWrap: "break-word",
        }}
      >
        <div
          className="rounded-circle"
          style={{
            width: "45px",
            height: "45px",
            background: "#fff",
            scale: "1.5",
          }}
        >
          <img
            className="bg-success rounded-circle w-100 h-100"
            src={homeTitleIcon}
            style={{
              border: "2px solid #A7C957",
            }}
            alt=""
          />
        </div>
        <div className="flex-grow-1">
          {user?.school?.title ?? "الصفحة الرئيسية"}
        </div>
      </h3>
      {staticsData && (
        <div
          className="reports mt-5 flex-wrap  flex-md-nowrap px-0 px-md-5"
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
                src={earnIcon}
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
              {staticsData?.totalActualPoints}
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
              {staticsData?.totalPointsEarned}
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
            <div className="report-number">{staticsData?.totalDeductedPoints}</div>
            <div className="report-name my-1">مجموع حسميات البوينت</div>
          </div>
        </div>
      )}
      {/* <div className="mt-5 mb-2 d-flex">
        <div
          className="d-flex align-items-center input-group px-2 rounded"
          style={{ width: "30%", backgroundColor: "#fff" }}
        >
          <input
            className="form-control top-0 start-0"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="بـــــحــــــث"
            value={search}
            style={{ border: 0, outline: 0 }}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
          />
          <img src={searchIcon} />
        </div>
      </div> */}
      {/* <Card>
        <CardBody>
          <Table
            className="no-wrap mt-3 align-middle px-2"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th className="ffcairo text-center">اسم المعلم</th>
                <th className="ffcairo text-center">السلوك</th>
                <th className="ffcairo text-center">عدد النقاط</th>
                <th className="ffcairo text-center"> التعليق</th>
                <th className="ffcairo text-center"> تاريخ الملاحظة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.user ? (
                    <>
                      <td className="text-center py-2">
                        {row?.user?.name ?? ""}
                      </td>
                      <td className="text-center py-2">
                        {row?.behavior?.title ?? ""}
                      </td>
                      <td className="text-center py-2">
                        {row?.behavior?.points ?? ""}
                      </td>
                    </>
                  ) : (
                    <td className="text-center" colSpan={3}>
                      {" "}
                      تم شراء جائزة وتم خصم {Math.abs(row.points)} نقاط
                    </td>
                  )}
                  <td className="text-center py-2">
                    {row?.note ?? "لا تعليق"}
                  </td>
                  <td className="text-center py-2">{row?.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card> */}
      <div
        style={{
          backgroundColor: "#ECF2F8",
          border: "5px solid #ECF2F8 ",
          borderRadius: "7px",
          margin: "20px 0",
        }}
      >
        <div className="my-2">
          <SearchInput
            placeholder={"بحث باسم المعلم"}
            action={(ev) => {
              setSearch(ev.target.value);
            }}
          />
        </div>
        {rows?.length ? (
          rows?.map((item, index) => (
            <div className="accordion mb-3" id="accordionExample" key={index}>
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button justify-content-between collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    <h5 style={headerStyle} className="text_small">
                      {item?.user?.guard === "manager" ? "المدير: " : "المعلم: "}
                      {item?.user?.name}
                    </h5>
                    <h5
                      style={{
                        ...headerStyle,
                        color: item?.points > 0 ? "#3A5300" : "#7C0000",
                        flex: "1",
                      }}
                      className="text_small"
                    >
                      {item?.points > 0 ? " ملاحظة إيجابية" : "ملاحظة سلبية"}
                    </h5>
                    <h5 style={{ ...headerStyle, flex: "1", margin: "0 10px" }}
                    className="text_small"
                    >
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
    </Row>
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
