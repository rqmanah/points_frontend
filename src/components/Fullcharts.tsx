import PieChartComponent from "./CustomPie";

function FullChart({ data, charts }: any) {
  return (
    <div className="row mb-2 bg-white rounded-3 ">
      <div className="col-lg-12  ">
        <div className=" row gap-5 justify-content-center">
          {/* <div className="col-lg-5  rounded-3   border p-5">
            <div className="fs-4 text-lg-end text-center">
              انواع المدارس حسب المراحل الدراسية
            </div>
            <PieChartComponent
              colors={["#FFDB00", "#FF8F00", "#AF47D2", "#26355D"]}
              data={[
                { name: "رياض الأطفال", value: data?.kindergarten_stage },
                { name: "الأبتدائية", value: data?.primary_schools },
                { name: "الأعدادية ", value: data?.intermediate_schools },
                { name: "الثانوية ", value: data?.secondary_schools },
              ]}
            />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#FFDB00" }}
                ></i>
                <p>رياض الأطفال</p>
              </div>
              <div className="col-lg-6 ffcairo text-start ">
                <p className="text-muted">{data?.kindergarten_stage}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#FF8F00" }}
                ></i>
                <p>الأبتدائية</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.primary_schools}</p>
              </div>
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#AF47D2" }}
                ></i>
                <p>الأعدادية</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.intermediate_schools}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#26355D" }}
                ></i>
                <p>الثانوية</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.secondary_schools}</p>
              </div>
            </div>
            <hr />
          </div> */}
          {charts.numberOfPoints && (
            <>
              <div className="col-lg-5 rounded-3  border p-5">
                <div className="fs-4 text-lg-end text-center ">
                  أنواع النقاط
                </div>
                <PieChartComponent
                  colors={["#FFDB00", "#FF8F00", "#AF47D2", "#26355D"]}
                  data={[
                    {
                      name: "عدد النقاط المكتسبة",
                      value: parseInt(data?.winning_points_count),
                    },
                    {
                      name: "عدد النقاط المدفوعه ",
                      value: data?.points_spent_on_prizes,
                    },
                    {
                      name: "عدد النقاط الكلية ",
                      value: parseInt(data?.points_count),
                    },
                    {
                      name: "عدد النقاط الضائعة ",
                      value: data?.losing_points_count,
                    },
                  ]}
                />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1 ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#FFDB00" }}
                    ></i>
                    <p>عدد النقاط المكتسبة</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start ">
                    <p className="text-muted">{data?.winning_points_count}</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1 ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#FF8F00" }}
                    ></i>
                    <p>العدد الفعلي للنقاط الضائعة</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start  ">
                    <p className="text-muted">{data?.losing_points_count}</p>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1 ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#AF47D2" }}
                    ></i>
                    <p>عدد النقاط المدفوعه</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start  ">
                    <p className="text-muted">{data?.points_spent_on_prizes}</p>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1 ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#AF47D2" }}
                    ></i>
                    <p>عدد النقاط الكلي</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start  ">
                    <p className="text-muted">{data?.points_count}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 p-3 rounded-3 border">
                <div className="fs-4 text-lg-end text-center">
                  عدد المعلمين والطلاب
                </div>
                <PieChartComponent
                  colors={["#050C9C", "#3572EF", "#C3FF93"]}
                  data={[
                    { name: "طلاب", value: data?.students_count },
                    { name: "المعلمين ", value: data?.teachers_count },
                  ]}
                />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1  ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#050C9C" }}
                    ></i>
                    <p>الطلاب</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start ">
                    <p className="text-muted">{data?.students_count}</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="col-lg-6 ffcairo d-flex gap-1 ">
                    <i
                      className="bi bi-circle-fill"
                      style={{ color: "#3572EF" }}
                    ></i>
                    <p>المعلمين</p>
                  </div>
                  <div className="col-lg-6 ffcairo text-start  ">
                    <p className="text-muted">{data?.teachers_count}</p>
                  </div>
                </div>

                <hr />
              </div>
            </>
          )}

          {/* <div className="col-lg-5 p-3 rounded-3 border">
            <div className="fs-4 text-lg-end text-center">
              انواع المدارس حسب النوع
            </div>
            <PieChartComponent
              colors={["#615EFC", "#FF0080", "#C3FF93"]}
              data={[
                { name: "بنين", value: data?.boys_students_schools },
                { name: "بنات ", value: data?.girls_students_schools },
                { name: "مختلط", value: data?.mixed_students },
              ]}
            />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1  ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#615EFC" }}
                ></i>
                <p>بنين</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.boys_students_schools}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#FF0080" }}
                ></i>
                <p>بنات</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.girls_students_schools}</p>
              </div>
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#C3FF93" }}
                ></i>
                <p>المختلط</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.mixed_students}</p>
              </div>
            </div>
          </div> */}
          {/* <div className="col-lg-5 p-3 rounded-3 border">
            <div className="fs-4 text-lg-end text-center">انواع السلوكيات</div>
            <PieChartComponent
              colors={["#dc3545", "#198754", "#C3FF93"]}
              data={[
                { name: "سلبي", value: data?.bad_behaviors },
                { name: "ايجابي ", value: data?.good_behaviors },
              ]}
            />
            <div className="d-flex justify-content-between ">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#dc3545" }}
                ></i>
                <p>سلبي</p>
              </div>
              <div className="col-lg-6 ffcairo text-start ">
                <p className="text-muted">{data?.bad_behaviors}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-lg-6 ffcairo d-flex gap-1 ">
                <i
                  className="bi bi-circle-fill"
                  style={{ color: "#198754" }}
                ></i>
                <p>ايجابي</p>
              </div>
              <div className="col-lg-6 ffcairo text-start  ">
                <p className="text-muted">{data?.good_behaviors}</p>
              </div>
            </div>
            <hr />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default FullChart;
