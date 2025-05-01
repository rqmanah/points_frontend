import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
//@ts-ignore
import behaviorImage from "../../assets/sidebar/reward 1.png";

// import PageTitle from "../../components/PageTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SubmitHandler, useForm } from "react-hook-form";
import client from "../../utils/client";
import { behaviorType } from "../../types";

const AddAction = () => {
  const [activeTab, setActiveTab] = useState("2");
  const [behavior, setBehavior] = useState<behaviorType | null>();
  const [behaviors, setBehaviors] = useState<behaviorType[]>([]);
  const [originalBehaviors, setOriginalBehaviors] = useState<behaviorType[]>(
    []
  );
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusAddiction, setStatusAddiction] = useState("positive");

  const [students, setStudents] = useState([]);
  const [chosen, setChosen] = useState<any>([]);
  const [ isSubmitting, setIsSubmitting ] = useState(false); 
  const [selectedClass, setSelectedClass] = useState("") // لتخزين الفصل المحدد
  const [selectedRow, setSelectedRow] = useState("") // لتخزين الصف المحدد

  const fetchFilteredStudents = async (classId: string, rowId: string) => {
    try {
      // إرسال القيمتين معًا
      const response = await client.get(
        `school/manager/students/studentsIndex?class_id=${classId}&row_id=${rowId}`
      )
      setStudents(response.data.result.data)
    } catch (error) {
      console.log(error)
    }
  }

  // تحديث الفلتر عند تغيير الفصل
  const handleClassFilter = (classId: string) => {
    setSelectedClass(classId) // تحديث الفصل
    fetchFilteredStudents(classId, selectedRow) // استدعاء الفلتر مع القيم الحالية
  }

  // تحديث الفلتر عند تغيير الصف
  const handleRowFilter = (rowId: string) => {
    setSelectedRow(rowId) // تحديث الصف
    fetchFilteredStudents(selectedClass, rowId) // استدعاء الفلتر مع القيم الحالية
  }

  const toggleSelectAll = () => {
    if (selectAll) {
      setChosen([]);
    } else {
      setChosen(students);
    }
    setSelectAll(!selectAll);
  };

  const [rows, setRows] = useState([]);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const fetchBehaviors = async () => {
    try {
      const response = await client.get(`school/manager/behaviors?limit=100000`);
      setBehaviors(response.data.result.data);
      setOriginalBehaviors(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClasses = async () => {
    try {
      const response = await client.get(`school/manager/classes`);
      setClasses(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStudents = async () => {
    try {
      const response = await client.get(`school/manager/students`);
      setStudents(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRows = async () => {
    try {
      const response = await client.get(`school/manager/rows`);
      setRows(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGrades = async () => {
    try {
      const response = await client.get(`school/manager/grades`);
      setGrades(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const filterByClass = async (id: number) => {
    try {
      const response = await client.get(
        `school/manager/students/studentsIndex?class_id=${id}`
      );
      setStudents(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const filterByRows = async (id: number) => {
    try {
      const response = await client.get(
        `school/manager/students/studentsIndex?row_id=${id}`
      );
      setStudents(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const filterByGrades = async (id: number) => {
    try {
      const response = await client.get(
        `school/manager/students/studentsIndex?grade_id=${id}`
      );
      setStudents(response.data.result.data);

      //  setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemById = (id: number) => {
    // Create a new array excluding the item with the specified id
    const updatedItems = chosen.filter((item: any) => item.id !== id);
    // Update the state with the new array
    setChosen(updatedItems);
  };
  type behavior = {
    behavior_id: any;
    student_ids: number[];
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<behavior>();
  useEffect(() => {
    setValue("student_ids", chosen);
  }, [chosen]);
  const onSubmit: SubmitHandler<behavior> = async (data) => {
    setIsSubmitting(true); // Start loading

    try {
      const studentsIds = chosen.map((item: any) => item.id);
      await client.post(`school/manager/students/addBehavior`, {
        behavior_id: parseInt(data.behavior_id),
        student_ids: studentsIds,
      });
      const behavior = behaviors.find(
        (behavior: behaviorType) => behavior.id === parseInt(data.behavior_id)
      );
      setStudents((prevStudents: any) =>
        prevStudents?.map((student: any) =>
          studentsIds?.includes(student.id)
            ? {
                ...student,
                points: student.points + behavior?.points,
                good_behavior_count:
                  (behavior?.points ?? 0) > 0
                    ? student.good_behavior_count + behavior?.points
                    : student.good_behavior_count,
                bad_behavior_count:
                  (behavior?.points ?? 0) < 0
                    ? student.bad_behavior_count + behavior?.points
                    : student.bad_behavior_count,
              }
            : student
        )
      );
      toast.success("تم اضافة حسم بنجاح", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setChosen([]);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    fetchBehaviors();
    fetchClasses();
    fetchStudents();
    fetchRows();
    fetchGrades();
  }, []);

  useEffect(() => {
    let filteredBehaviors = [];

    if (statusAddiction === "positive") {
      filteredBehaviors = originalBehaviors.filter((item) => item?.points > 0);
    } else if (statusAddiction === "negative") {
      filteredBehaviors = originalBehaviors.filter((item) => item?.points < 0);
    }

    setBehaviors(filteredBehaviors);
  }, [statusAddiction, originalBehaviors]);

  return (
    <React.Fragment>
      <div className="page-content ">
        <h3
          className="col-10 col-lg-2 col-md-3  col-sm-4 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
            <img width={35} className="p-1" src={behaviorImage} alt="" />
          </div>
          <div className="flex-grow-1 text-center">{"اضافة - حسم"}</div>
        </h3>
        {/* <PageTitle title={"اضافة حسم"} /> */}
        <Container fluid className="  p-1 mb-5 ">
          <Row className=" w-100 me-1 rounded-5  p-2">
            <Col
              lg={12}
              className=" p-3 rounded-4 border border-primary"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Row className="w-100 ">
                <Col xs={12}>
                  <p className="fs-3 ffcairp" style={{ color: "#0077B6" }}>
                    اضافة - حسم
                  </p>
                </Col>
                <div className="col-12 d-flex justify-content-center justify-content-md-end mx-2 mx-md-0">
                  <div
                    className="col-12  col-xl-3 col-lg-4 col-md-3 col-sm-7 d-flex justify-content-evenly align-items-center  rounded-pill "
                    style={{
                      height: "40px",
                      backgroundColor: "#ECECEC",
                      border: "1px solid #BCBCBC",
                      width: "270px",
                    }}
                  >
                    <p
                      className={`positive rounded-pill pointer px-3 py-1 
                        ${statusAddiction == "positive" ? "positive-note" : ""}
                      `}
                      onClick={() => setStatusAddiction("positive")}
                    >
                      ملاحظة إيجابية
                    </p>
                    <p
                      className={`negative rounded-pill pointer px-3 py-1 
                        ${statusAddiction == "negative" ? "negative-note" : ""}
                        `}
                      onClick={() => setStatusAddiction("negative")}
                    >
                      ملاحظة سلبية
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-md-4 col-sm-6  d-flex justify-content-around align-items-center my-4">
                  <p className="m-0 fw-bold mx-2">السلوك - المهارة</p>
                  <div className="form-group m-0 flex-grow-1">
                    <select
                      // value={behavior?.id ?? 0}
                      {...register("behavior_id", {
                        required: true,
                        validate: (value: number) => value != 0,
                      })}
                      onChange={(ev) => {
                        setBehavior(
                          behaviors?.find(
                            (behavior: behaviorType) =>
                              behavior?.id === parseInt(ev.target.value)
                          ) ?? null
                        )
                      }}
                      className="form-control"
                    >
                      <option value={""} selected disabled>
                        إختر السلوك - المهارة
                      </option>
                      {behaviors.map((behavior: behaviorType) => (
                        <option key={behavior.id} value={behavior.id}>
                          {behavior.title}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      type="hidden"
                      {...register("behavior_id", { required: true })}
                    /> */}
                  </div>
                </div>
                {errors.behavior_id && (
                  <div className="col-12 text-danger">برجاء إختيار السلوك</div>
                )}
              </Row>
              <form onSubmit={handleSubmit(onSubmit)}>
                {chosen?.length == 0 && (
                  <div
                    className=" mt-5 text-center p-4   "
                    style={{
                      borderStyle: "dotted",
                      border: " 2px  dotted #AAAAAA ",
                    }}
                  >
                    <p>
                      قم بتحديد الطلاب الذين ستتم عليهم عملية الإضافة أو الحسم
                    </p>
                  </div>
                )}
                {chosen?.length > 0 && (
                  <div
                    className=" mt-5 text-center p-4   "
                    style={{
                      borderStyle: "dotted",
                      border: " 2px  dotted #AAAAAA ",
                    }}
                  >
                    <div>
                      <div className="row">
                        <div className="col-3 text-end">اسم الطالب</div>
                        <div className="col-3 text-end">الصف</div>
                        <div className="col-3 text-end">الفصل</div>
                        <div className="col-3 text-end"></div>
                      </div>
                      {chosen.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="border mb-2 mt-2 rounded-3 border-black text-end p-2 row"
                          >
                            <div className="col-3 text-end">{item?.name}</div>
                            <div className="col-3 text-end">
                              {item?.row?.title ?? "---"}
                            </div>
                            <div className="col-3 text-end">
                              {item?.class?.title ?? "---"}
                            </div>
                            <div className="col-3 text-start">
                              <i
                                className="bi bi-x-circle fs-5"
                                onClick={() => removeItemById(item.id)}
                              ></i>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {errors.student_ids && (
                  <div className="col-12 text-center text-danger">
                    برجاء إختيار علي الأقل طالب
                  </div>
                )}
                <div className="justify-content-center row mt-4">
                  <button
                    className="btn col-5 text-white w-25"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#00992A",
                    }}
                  >
                    {isSubmitting ? <Spinner size="sm" /> : "حفظ"}
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
        <Container fluid className="rounded-4  p-3">
          <Row className="p-0 ">
            <Col
              lg={12}
              className="rounded-4 p-3"
              style={{ backgroundColor: "#ECF2F8" }}
            >
              <div className="p-0  overflow-hidden">
                <div className="d-flex  p-0 bg-transparent  ">
                  <Nav pills className=" flex-grow-1 px-0  " role="tablist">
                    <NavItem className="col-12">
                      <NavLink
                        href="#activities"
                        className={
                          activeTab === "2"
                            ? "bg-white p-3 text-primary rounded-top-4 rounded-end-0  rounded-bottom-0 h-100 w-100 rounded-top-1 rounded-end-0 text-center  "
                            : "bg-primary p-3 rounded-top-4 rounded-end-0 rounded-bottom-0 text-white text-center "
                        }
                        onClick={() => {
                          toggleTab("2")
                        }}
                      >
                        <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                        <div className="d-inline-block d-md-inline-block">
                          <span
                            className={
                              activeTab === "2"
                                ? "fw-bold  fs-4 text-black "
                                : "fw-bold  fs-4 text-white "
                            }
                          >
                            الطلاب
                          </span>{" "}
                          <span
                            className={
                              activeTab === "2" ? "text-muted" : "text-white"
                            }
                          >
                            ( {students?.length})
                          </span>
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <Row className="bg-white p-1 justify-content-center  ">
                  <Col lg={2} className="d-flex  gap-2 mb-2  mt-2 ">
                    <Label>المرحلة</Label>
                    <Input
                      className="bg-light"
                      type="select"
                      onChange={(e: any) => filterByGrades(e.target.value)}
                    >
                      <option value={""}>{"الكل"}</option>
                      {grades?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.id}>
                            {item?.title}
                          </option>
                        )
                      })}
                    </Input>
                  </Col>
                  <Col lg={2} className="d-flex gap-2 mb-2 mt-2">
                    <Label>الفصل</Label>
                    <Input
                      className="bg-light"
                      type="select"
                      onChange={(e: any) => handleClassFilter(e.target.value)} // استخدام دالة جديدة
                    >
                      <option value={""}>{"الكل"}</option>
                      {classes?.map((item: any, index: number) => (
                        <option key={index} value={item.id}>
                          {item?.title}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col lg={2} className="d-flex gap-2 mb-2 mt-2">
                    <Label>الصف</Label>
                    <Input
                      className="bg-light"
                      type="select"
                      onChange={(e: any) => handleRowFilter(e.target.value)} // استخدام دالة جديدة
                    >
                      <option value={""}>{"الكل"}</option>
                      {rows?.map((item: any, index: number) => (
                        <option key={index} value={item.id}>
                          {item?.title}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
                <div
                  style={{
                    overflow: "scroll",
                  }}
                >
                  <table
                    className="table"
                    style={{ borderColor: "transparent" }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid #49494933" }}>
                        <th scope="col" className="text-center">
                          <input
                            type="checkbox"
                            className="mx-2"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            style={{
                              width: "18px",
                              height: "18px",
                            }}
                          />
                        </th>
                        <th scope="col" className="text-center">
                          اسم الطالب
                        </th>
                        <th scope="col" className="text-center">
                          المرحلة الدراسية
                        </th>
                        <th scope="col" className="text-center">
                          الصف
                        </th>
                        <th scope="col" className="text-center">
                          الفصل
                        </th>
                        <th scope="col" className="text-center">
                          إجمالي النقاط
                        </th>
                        <th scope="col" className="text-center">
                          النقاط الحالية
                        </th>

                        <th scope="col" className="text-center">
                          العمليات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.length > 0 ? (
                        students.map((item) => (
                          <tr key={item.id}>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              <input
                                type="checkbox"
                                id={item?.id}
                                value={item?.id}
                                checked={chosen.find(
                                  (ele: { id: number }) => ele.id === item.id
                                )}
                                onChange={() => {
                                  //@ts-ignore
                                  document?.getElementById(item.id)?.checked
                                    ? setChosen([...chosen, item])
                                    : removeItemById(item.id)
                                }}
                              />
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.name}
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.grade?.title}
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.row?.title}
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.class?.title}
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.total_points}
                            </td>
                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              {item?.points}
                            </td>

                            <td
                              className="text-center"
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              <Link to={`/students/profile/${item.id}`}>
                                <button
                                  type="button"
                                  style={{ backgroundColor: "#628C99" }}
                                  className="btn  rounded-5 text-white"
                                >
                                  عرض
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : students?.length === 0 ? (
                        <tr className="justify-content-center">
                          <td colSpan={9} className="text-center">
                            <i
                              className="bi bi-exclamation-circle-fill"
                              style={{ fontSize: "50px" }}
                            ></i>
                            <p className="fs-3">لايوجد بيانات</p>
                          </td>
                        </tr>
                      ) : (
                        <tr className="justify-content-center">
                          <td colSpan={9} className="text-center">
                            <Spinner className="m-5" color="primary">
                              Loading...
                            </Spinner>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
};

export default AddAction;
