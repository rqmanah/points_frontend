import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import PieChartComponent from "./CustomPie";
import { useState } from "react";

function AnalysisChart({ data, showClick, show }: any) {
  const [state, setState] = useState({
    state1: true,
    state2: false,
    state3: false,
    state4: false,
    state5: false,
  });

  return (
    <div className="row mb-2 bg-white rounded-3 ">
      <div className="col-lg-12  ">
        <div className="d-flex justify-content-between py-3  ">
          <div className="d-flex gap-4 align-items-end  ">
            <span className="fs-5 ffcairo text-muted   "> عدد</span>
          </div>
          <div>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                style={{ backgroundColor: "#717ff5", border: "none" }}
                className="fw-bold ffcairo"
              >
                <span className="ffcairo">
                  {state.state1
                    ? "انواع المدارس"
                    : state.state2
                    ? "السلوكيات"
                    : state.state3
                    ? "المعلمين والطلاب"
                    : state.state4
                    ? "المدارس حسب المرحلة"
                    : "انواع النقاط"}{" "}
                </span>
              </DropdownToggle>
              <DropdownMenu light>
                {/* <DropdownItem header>Header</DropdownItem> */}
                <DropdownItem
                  className="text-end"
                  onClick={() => {
                    setState({
                      state1: true,
                      state2: false,
                      state3: false,
                      state4: false,
                      state5: false,
                    });
                  }}
                >
                  انواع المدارس
                </DropdownItem>
                <DropdownItem
                  className="text-end"
                  onClick={() => {
                    setState({
                      state1: false,
                      state2: false,
                      state3: false,
                      state4: false,
                      state5: true,
                    });
                  }}
                >
                  {" "}
                  انواع النقاط
                </DropdownItem>

                <DropdownItem
                  className="text-end"
                  onClick={() => {
                    setState({
                      state1: false,
                      state2: true,
                      state3: false,
                      state4: false,
                      state5: false,
                    });
                  }}
                >
                  السلوكيات
                </DropdownItem>
                <DropdownItem
                  className="text-end"
                  onClick={() => {
                    setState({
                      state1: false,
                      state2: false,
                      state3: true,
                      state4: false,
                      state5: false,
                    });
                  }}
                >
                  المعلمين والطلاب
                </DropdownItem>
                <DropdownItem
                  className="text-end"
                  onClick={() => {
                    setState({
                      state1: false,
                      state2: false,
                      state3: false,
                      state4: true,
                      state5: false,
                    });
                  }}
                >
                  المدارس حسب المرحلة
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        {state.state1 && (
          <div className=" row">
            <div className="col-lg-12 d-flex">
              <PieChartComponent
                colors={["#615EFC", "#FF0080", "#C3FF93"]}
                data={[
                  { name: "بنين", value: data?.boys_students_schools },
                  { name: "بنات ", value: data?.girls_students_schools },
                  { name: "مختلط", value: data?.mixed_students },
                ]}
              />
            </div>
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#615EFC" }}></i>
              <p>بنين</p>
            </div>
            <div className="col-lg-6 ffcairo text-start ">
              <p className="text-muted">{data?.boys_students_schools}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#FF0080" }}></i>
              <p>بنات</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.girls_students_schools}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#C3FF93" }}></i>
              <p>المختلط</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.mixed_students}</p>
            </div>
          </div>
        )}
        {state.state2 && (
          <div className=" row  ">
            <div className="col-lg-12">
              <PieChartComponent
                colors={["#dc3545", "#198754", "#C3FF93"]}
                data={[
                  { name: "سلبي", value: data?.bad_behaviors },
                  { name: "ايجابي ", value: data?.good_behaviors },
                ]}
              />
            </div>
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#dc3545" }}></i>
              <p>سلبي</p>
            </div>
            <div className="col-lg-6 ffcairo text-start ">
              <p className="text-muted">{data?.bad_behaviors}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#198754" }}></i>
              <p>ايجابي</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.good_behaviors}</p>
            </div>
            <hr />
          </div>
        )}
        {state.state3 && (
          <div className=" row  ">
            <div className="col-lg-12">
              <PieChartComponent
                colors={["#050C9C", "#3572EF", "#C3FF93"]}
                data={[
                  { name: "طلاب", value: data?.students },
                  { name: "المعلمين ", value: data?.teachers },
                ]}
              />
            </div>
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#050C9C" }}></i>
              <p>الطلاب</p>
            </div>
            <div className="col-lg-6 ffcairo text-start ">
              <p className="text-muted">{data?.students}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#3572EF" }}></i>
              <p>المعلمين</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.teachers}</p>
            </div>
            <hr />
          </div>
        )}
        {state.state4 && (
          <div className=" row  ">
            <div className="col-lg-12">
              <PieChartComponent
                colors={["#FFDB00", "#FF8F00", "#AF47D2", "#26355D"]}
                data={[
                  { name: "رياض الأطفال", value: data?.kindergarten_stage },
                  { name: "الأبتدائية", value: data?.primary_schools },
                  { name: "الأعدادية ", value: data?.intermediate_schools },
                  { name: "الثانوية ", value: data?.secondary_schools },
                ]}
              />
            </div>
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#FFDB00" }}></i>
              <p>رياض الأطفال</p>
            </div>
            <div className="col-lg-6 ffcairo text-start ">
              <p className="text-muted">{data?.kindergarten_stage}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#FF8F00" }}></i>
              <p>الأبتدائية</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.primary_schools}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#AF47D2" }}></i>
              <p>الأعدادية</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.intermediate_schools}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#26355D" }}></i>
              <p>الثانوية</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.secondary_schools}</p>
            </div>
            <hr />
          </div>
        )}
        {state.state5 && (
          <div className=" row  ">
            <div className="col-lg-12">
              <PieChartComponent
                colors={["#FFDB00", "#FF8F00", "#AF47D2", "#26355D"]}
                data={[
                  {
                    name: "عدد النقاط المكتسبة",
                    value: data?.total_winning_points,
                  },
                  {
                    name: "العدد الفعلي للنقاط المكتسبة",
                    value:
                      data?.total_actual_points != 0
                        ? data.total_actual_points
                        : 1,
                  },
                  {
                    name: "عدد النقاط المدفوعه ",
                    value: data?.total_spent_points,
                  },
                ]}
              />
            </div>
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#FFDB00" }}></i>
              <p>عدد النقاط المكتسبة</p>
            </div>
            <div className="col-lg-6 ffcairo text-start ">
              <p className="text-muted">{data?.total_winning_points}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#FF8F00" }}></i>
              <p>العدد الفعلي للنقاط المكتسبة</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.total_actual_points}</p>
            </div>
            <hr />
            <div className="col-lg-6 ffcairo d-flex gap-1 ">
              <i className="bi bi-circle-fill" style={{ color: "#AF47D2" }}></i>
              <p>عدد النقاط المدفوعه</p>
            </div>
            <div className="col-lg-6 ffcairo text-start  ">
              <p className="text-muted">{data?.total_spent_points}</p>
            </div>
            <hr />
          </div>
        )}
        {show == false && (
          <p
            className="justify-content-center fs-4 ffcairo text-muted d-flex gap-2"
            onClick={showClick}
            style={{ cursor: "pointer" }}
          >
            عرض الكل
            <i className="bi bi-arrow-left"></i>
          </p>
        )}
      </div>
    </div>
  );
}

export default AnalysisChart;
