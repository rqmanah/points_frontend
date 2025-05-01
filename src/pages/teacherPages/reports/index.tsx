import { useEffect, useState } from "react";
//@ts-ignore
import reportsIcon from "../../../assets/sidebar/reports_logo.png";
import { Card, CardBody, Table } from "reactstrap";
//@ts-ignore
import searchIcon from "../../../assets/search_icon.png";
import {
  classOrRowType,
  filterDataType,
  notesUserType,
  userNoteType,
} from "../../../types";
import {
  getNoteUsers,
  getSchoolClasses,
  getSchoolRows,
  getUserNotes,
} from "../../../utils/api.functions";
import { GenericInfoModal } from "../../../components/genericInfoModal";
import SearchInput from "../../../components/SearchInput";
import { useNavigate } from "react-router-dom";
export default function Reports() {
  document.title = "التقارير";
  const [rows, setRows] = useState<notesUserType[]>([]);
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [schoolClasses, setSchoolClasses] = useState<classOrRowType[]>([]);
  const [schoolRows, setSchoolRows] = useState<classOrRowType[]>([]);
  const navigate = useNavigate()
  const [filterData, setFilterData] = useState<filterDataType>({
    search: "",
    row: -1,
    class: -1,
  });
  const [currentUserNotes, setCurrentUserNotes] = useState<userNoteType[]>([]);

  const viewStudentNotes = (studentId: number) => {
    getUserNotes(studentId).then((notes) => setCurrentUserNotes(notes));
    setOpenNotesModal(true);
  };

  useEffect(() => {
    getNoteUsers(filterData).then((users: notesUserType[]) => setRows(users));
    getSchoolClasses().then((data: classOrRowType[]) => setSchoolClasses(data));
    getSchoolRows().then((data) => setSchoolRows(data));
  }, []);
  useEffect(() => {
    getNoteUsers(filterData).then((users: notesUserType[]) => setRows(users));
  }, [filterData]);
  return (
    <>
      <h3
        className="col-12 col-lg-4 col-md-10 p-2 col-sm-12 mx-auto fw-bold rounded-pill d-flex ffcairo"
        style={{
          border: "2px solid #A7C957",
        }}
      >
        <div
          className="rounded-circle"
          style={{
            border: "2px solid #A7C957",
            width: "45px",
            background: "#fff",
            scale: "1.5",
          }}
        >
          <img width={35} className="p-1" src={reportsIcon} alt="" />
        </div>
        <div className="text-center flex-grow-1">التقارير</div>
      </h3>
      {/* <Card className="my-4">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="w-50 mx-1">
              <label> الصف</label>
              <select
                value={filterData?.row}
                onChange={(ev) => {
                  setFilterData((prev) => ({
                    ...prev,
                    row: parseInt(ev.target.value),
                  }));
                }}
                className="form-control"
              >
                <option value={-1} disabled></option>
              </select>
            </div>
            <div className="w-50 mx-1">
              <label> الفصل</label>
              <select
                value={filterData?.class}
                onChange={(ev) => {
                  setFilterData((prev) => ({
                    ...prev,
                    class: parseInt(ev.target.value),
                  }));
                }}
                className="form-control"
              >
                <option value={-1} disabled></option>
              </select>
            </div>
          </div>
          <div className="d-flex mx-1 justify-content-end">
            <button
              className="rounded my-1 px-2"
              style={{
                backgroundColor: "#5E7B66",
                color: "#fff",
                outline: 0,
                border: 0,
              }}
            >
              بحث
            </button>
          </div>
        </CardBody>
      </Card> */}
      <div
        className="my-4"
        style={{
          backgroundColor: "#FAFCFF",
          border: "6px solid #ECF2F8 ",
          borderRadius: "8px",
        }}
      >
        <div className="p-2">
          <div className="row align-items-center">
            <div className="d-flex col-12 col-lg-4 col-md-4 col-sm-6">
              <SearchInput
                action={(ev) => {
                  setFilterData((prev) => ({
                    ...prev,
                    search: ev.target.value,
                  }));
                }}
                placeholder={"بـــــحــــــث"}
              />
            </div>
            <div className="d-flex justify-content-around align-items-center my-4 col-12 col-lg-4 col-md-4 col-sm-6">
              <p className="m-0 fw-bold mx-2">الصف</p>
              <div className="form-group m-0 flex-grow-1">
                <select
                  value={filterData?.row}
                  onChange={(ev) => {
                    setFilterData((prev) => ({
                      ...prev,
                      row: parseInt(ev.target.value),
                    }));
                  }}
                  className="form-control"
                >
                  <option value={-1}> اختر الصف</option>
                  {schoolRows.map((schoolRow, index) => (
                    <option value={schoolRow.id} key={index}>
                      {schoolRow.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-around align-items-center my-4 col-12 col-lg-4 col-md-4 col-sm-6">
              <p className="m-0 fw-bold mx-2">الفصل</p>
              <div className="form-group m-0 flex-grow-1">
                <select
                  value={filterData?.class}
                  onChange={(ev) => {
                    setFilterData((prev) => ({
                      ...prev,
                      class: parseInt(ev.target.value),
                    }));
                  }}
                  className="form-control"
                >
                  <option value={-1}> اختر الفصل</option>
                  {schoolClasses.map((schoolClass, index) => (
                    <option value={schoolClass.id} key={index}>
                      {schoolClass.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <tr
              style={{
                borderBottom: "1px solid #49494933",
                height: "60px",
              }}
            >
              <th className="ffcairo text-center py-2">اسم الطالب</th>
              <th className="ffcairo text-center py-2">الصف</th>
              <th className="ffcairo text-center py-2">الفصل</th>
              <th className="ffcairo text-center py-2">الملاحظات الإيجابية</th>
              <th className="ffcairo text-center py-2">الملاحظات السلبية</th>
              <th className="ffcairo text-center py-2">سجل الملاحظات</th>
            </tr>
            {rows.length === 0 ? (
              <tr className=" mt-4 ">
                <td colSpan={6} className=" text-center">
                  <i className="ri-inbox-fill text-warning fs-5"></i>
                  <p className="fs-5 text-warning ">لايوجد بيانات حتي الأن</p>
                </td>
              </tr>
            ) : (
              <>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="text-center py-2">{row?.name ?? ""}</td>
                    <td className="text-center py-2">
                      {row?.row?.title ?? ""}
                    </td>
                    <td className="text-center py-2">
                      {row?.class?.title ?? ""}
                    </td>
                    <td className="text-center py-2">
                      {row.good_behavior_count}
                    </td>
                    <td className="text-center py-2">
                      {row.bad_behavior_count}
                    </td>
                    <td className="text-center py-2">
                      <button
                        className="rounded-pill border-0 px-2"
                        style={{ color: "#fff", backgroundColor: "#628C99" }}
                        onClick={() => navigate(`/notes/${row?.id}`)}
                      >
                        عرض الملاحظات
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </Table>
        </div>
      </div>
      <div className=" col-12  mt-2 text-center  ">
        <a className="link-color me-0   me-lg-3 fw-400 text-decoration-none">
          <GenericInfoModal
            open={openNotesModal}
            setOpen={setOpenNotesModal}
            modalTitle={"عرض الملاحظات"}
            className={"custom-modal-width"}
            content={
              <Table
                className="no-wrap mt-3 align-middle px-2"
                responsive
                borderless
                dir="rtl"
              >
                <tr>
                  <th className="py-2 px-2 text-center">السلوك</th>
                  <th className="py-2 px-2 text-center">التعليق</th>
                  <th className="py-2 px-2 text-center"> نوع الملاحظة</th>
                  <th className="py-2 px-2 text-center">تاريخ الملاحظة</th>
                </tr>
                {currentUserNotes?.map(
                  (userNote: userNoteType, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-2 text-center">
                        {userNote?.behavior?.title ?? ""}
                      </td>
                      <td className="py-2 px-2 text-center">
                        {userNote?.note ?? "لا يوجد تعليق"}
                      </td>
                      <td
                        className="py-2 px-2 text-center"
                        style={{
                          color: `${
                            userNote.points > 0 ? "#3A5300" : "#7C0000"
                          }`,
                        }}
                      >
                        {userNote.points > 0
                          ? "ملاحظة إيجابية"
                          : "ملاحظة سلبية"}
                      </td>
                      <td className="py-2 px-2 text-center">
                        {new Date(userNote?.created_at).toLocaleDateString(
                          "en-SA",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  )
                )}
              </Table>
            }
          />
        </a>
      </div>
    </>
  );
}
