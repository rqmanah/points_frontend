import { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
//@ts-ignore
import searchIcon from "../../../assets/search_icon.png";
//@ts-ignore
import firstStudentsIcon from "../../../assets/sidebar/firstStudents.png";
import { classOrRowType, filterDataType, topStudentType } from "../../../types";
import {
  getSchoolClasses,
  getSchoolRows,
  getTopStudents,
} from "../../../utils/api.functions";
import SearchInput from "../../../components/SearchInput";
export default function FirstStudents() {
  document.title = "الأوائل";
  const [rows, setRows] = useState<topStudentType[]>([]);
  const [tempRows, setTempRows] = useState<topStudentType[]>([]);

  const [schoolClasses, setSchoolClasses] = useState<classOrRowType[]>([]);
  const [schoolRows, setSchoolRows] = useState<classOrRowType[]>([]);
  const [filterData, setFilterData] = useState<filterDataType>({
    search: "",
    row: -1,
    class: -1,
  });

  useEffect(() => {
    getSchoolClasses().then((data) => setSchoolClasses(data));
    getSchoolRows().then((data) => setSchoolRows(data));
    getTopStudents().then((topStudents: topStudentType[]) => {
      setRows([...topStudents]);
      setTempRows([...topStudents]);
    });
  }, []);
  useEffect(() => {
    let newFilteredData = [...(tempRows ?? [])];
    if (filterData.search) {
      newFilteredData = [
        ...newFilteredData.filter(
          (data) =>
            data?.name?.includes(filterData.search) ||
            data?.grade?.includes(filterData.search) ||
            data?.class?.includes(filterData.search) ||
            data?.row?.includes(filterData.search)
        ),
      ];
    }
    if (filterData.row != -1) {
      newFilteredData = [
        ...newFilteredData.filter(
          (data) =>
            data.row ===
            schoolRows.find((row) => row.id === filterData.row)?.title
        ),
      ];
    }
    if (filterData.class != -1) {
      newFilteredData = [
        ...newFilteredData.filter(
          (data) =>
            data.class ===
            schoolClasses.find((c) => c.id === filterData.class)?.title
        ),
      ];
    }
    setRows([...newFilteredData]);
  }, [filterData]);
  return (
    <>
      <h3
        className="col-12 col-lg-4 col-md-4 p-2 col-sm-6 mx-auto fw-bold rounded-pill d-flex ffcairo"
        style={{ border: "2px solid #A7C957" }}
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
          <img width={35} className="p-1" src={firstStudentsIcon} alt="" />
        </div>
        <div className="text-center flex-grow-1">الأوائل</div>
      </h3>
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
          <Table className="no-wrap  align-middle" responsive borderless>
            <tr
              style={{
                borderBottom: "1px solid #49494933",
                height: "60px",
              }}
            >
              <th className="ffcairo text-center py-2">الترتيب</th>
              <th className="ffcairo text-center py-2">اسم الطالب</th>
              <th className="ffcairo text-center py-2">الصف</th>
              <th className="ffcairo text-center py-2">الفصل</th>
              <th className="ffcairo text-center py-2"> الملاحظات الإيجابية</th>
              <th className="ffcairo text-center py-2"> الملاحظات السلبية</th>
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
                    <td className="text-center py-2">{index + 1}</td>
                    <td className="text-center py-2">{row.name ?? ""}</td>
                    <td className="text-center py-2">{row.row ?? ""}</td>
                    <td className="text-center py-2">{row.class ?? ""}</td>
                    <td className="text-center py-2">{row.good_behaviors_count}</td>
                    <td className="text-center py-2">{row.bad_behaviors_count}</td>
                  </tr>
                ))}
              </>
            )}
          </Table>
        </div>
      </div>
    </>
  );
}
