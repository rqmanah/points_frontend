import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import studentsImage from "../../assets/sidebar/boy-2.png"
import useFetch from "../../hooks/useFetch"
import { downloadFile } from "../../utils/api.functions"
import DownloadIcon from "../icons/DownloadIcon"
import UploadIcon from "../icons/UploadIcon"
import SearchInput from "../SearchInput"
import FilterStudent from "./FilterStudent"
import TableData from "./TableData"
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap"
import client from "../../utils/client"
import { useMutate } from "../../hooks/useMutate"
import SuccessMan from "../icons/SucessMan"
import SuccessModal from "../SuccessModal"

function Main() {
  const navigate = useNavigate()
  const [term, setSearchTerm] = useState("")
  const [grades, setGrades] = useState([])
  const [classes, setClasses] = useState([])
  const [rows, setRows] = useState([])
  const [chosen, setChosen] = useState<number[]>([])
  const [modal, setModal] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false) // حالة تتبع التحميل
  console.log("🚀 ~ Main ~ loading:", loading)

  const [filterData, setFilterData] = useState({
    class_id: "",
    grade_id: "",
    row_id: "",
  })

  const [sort, setSort] = useState({
    asc: "",
    des: "",
    sort_by: "",
  })
  const queryParams = {
    term: term,
    page: page,
    sort_direction: sort?.sort_by,
    sort_by: sort?.sort_by,
    class_id: "",
    grade_id: filterData?.grade_id || "",
    row_id: "",
  }

  const searchParams = new URLSearchParams(queryParams)
  const endpoint = `school/manager/students?${searchParams.toString()}`
  const {
    data: StudentData,
    isPending,
    refetch,
    isSuccess,
  } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  })
    console.log("🚀 ~ Main ~ isPending:", isPending)
  const {
    mutate: DeleteStudents,
    isSuccess: successDelete,
    isPending: loadingDelete,
  } = useMutate({
    mutationKey: ["school/manager/students/destroy"],
    endpoint: `school/manager/students/destroy`,
    onSuccess: () => {
      refetch()
      setModalSuccess(true)
      setModal(false)
      setChosen([])
    },
    formData: true,
  })

  const [students, setStudents] = useState(StudentData || [])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedRow, setSelectedRow] = useState("")

  const fetchGrades = async () => {
    try {
      setLoading(true)
      const response = await client.get(`school/manager/grades`)
      setGrades(response.data.result.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const filterByGrades = async (id: number) => {
    try {
      setLoading(true)
      const response = await client.get(
        `school/manager/students/studentsIndex?grade_id=${id}`
      )
      setStudents(response?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
const fetchFilteredStudents = async ({
  classId = "",
  rowId = "",
  gradeId = "",
}) => {
  try {
    setLoading(true) // تفعيل التحميل
    const response = await client.get(
      `school/manager/students/studentsIndex?class_id=${classId}&row_id=${rowId}&grade_id=${gradeId}`
    )
    setStudents(response.data || []) // تحديث قائمة الطلاب
  } catch (error) {
    console.error("Error fetching filtered students:", error)
  } finally {
    setLoading(false) // إيقاف التحميل دائمًا
  }
}

const handleClassFilter = (classId) => {
  setSelectedClass(classId) // تحديث الفصل
  fetchFilteredStudents({
    classId,
    rowId: selectedRow,
    gradeId: filterData?.grade_id,
  })
}

const handleRowFilter = (rowId) => {
  setSelectedRow(rowId) // تحديث الصف
  fetchFilteredStudents({
    classId: selectedClass,
    rowId,
    gradeId: filterData?.grade_id,
  })
}

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const response = await client.get(`school/manager/classes`)
      setClasses(response.data.result.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const fetchRows = async () => {
    try {
      setLoading(true)
      const response = await client.get(`school/manager/rows`)
      setRows(response.data.result.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchClasses()
    fetchRows()
    fetchGrades()
  }, [successDelete])
  useEffect(() => {
    setStudents(StudentData)
  }, [StudentData, isSuccess, successDelete])

  return (
    <div className="">
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

      <div className="row row-cols-md-6 row-cols-2 gap-3 mt-4 justify-content-center">
        <button
          className="  btn "
          onClick={() => navigate("/students/add")}
          style={{
            border: "0px solid transparent",
            backgroundColor: "#0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "white",
            fontWeight: "700",
            maxWidth: "200px",
            textAlign: "center",

            width: "100%",
          }}
        >
          إضافة طالب
        </button>
        <button
          className="  btn "
          onClick={() => navigate("/students/upload")}
          style={{
            border: "1px solid #0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "#0077B6",
            fontWeight: "400",
            display: "flex",
            gap: "2px",
            alignItems: "center",
            maxWidth: "200px",
            textAlign: "center",
            width: "100%",
          }}
        >
          رفع ملف الطالب
          <UploadIcon />
        </button>
        <button
          className="btn"
          style={{
            border: "1px solid #0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "#0077B6",
            fontWeight: "400",
            display: "flex",
            gap: "2px",
            alignItems: "center",
            maxWidth: "200px",
            textAlign: "center",
            width: "100%",
          }}
          onClick={() =>
            downloadFile("school/manager/students/export", "students_data.xlsx")
          }
        >
          تحميل ملف الطلاب <DownloadIcon />
        </button>
      </div>

      <div>
        <div
          className="mb-5 mt-4"
          style={{
            border: "6px solid #ECF2F8",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <div className="mx-3">
            <div>
              <div className="my-4 d-flex  justify-content-between">
                <p
                  className="m-0 p-0"
                  style={{
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "hsla(0, 0%, 23%, 1)",
                  }}
                >
                  الطلاب
                  <span
                    style={{
                      color: "#8A8A8A",
                      fontSize: "18px",
                      fontWeight: "400",
                      margin: "0 5px",
                    }}
                  >
                    ({StudentData?.result?.data?.length})
                  </span>
                </p>
                {!!chosen?.length && (
                  <button
                    className="border-0 bg-danger text-white px-2 rounded-2 py-1"
                    onClick={() => setModal(true)}
                  >
                    مسح المحدد
                    <span
                      style={{
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "400",
                        margin: "0 5px",
                      }}
                    >
                      {chosen?.length}
                    </span>
                  </button>
                )}
              </div>

              <div className="mb-3  d-flex justify-content-between flex-wrap  flex-md-nowrap gap-3 gap-md-0 ">
                <div className="main_search">
                  <SearchInput
                    action={(e) => setSearchTerm(e.target.value)}
                    placeholder={"بحث"}
                  />
                </div>
                <Row className="bg-white p-1 gap-2 gap-md-0  ">
                  <Col lg={4} className="d-flex align-items-center gap-2  ">
                    <label>المرحلة</label>
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
                  <Col lg={4} className="d-flex align-items-center gap-2 ">
                    <label>الصف</label>
                    <Input
                      className="bg-light"
                      type="select"
                      onChange={(e) => handleRowFilter(e.target.value)}
                    >
                      <option value={""}>{"الكل"}</option>
                      {rows?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.title}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col lg={4} className="d-flex align-items-center gap-2 ">
                    <label>الفصل</label>
                    <Input
                      className="bg-light"
                      type="select"
                      onChange={(e) => handleClassFilter(e.target.value)}
                    >
                      <option value={""}>{"الكل"}</option>
                      {classes?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item?.title}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
                <div className="main_search">
                  <FilterStudent setSort={setSort} />
                </div>
              </div>
            </div>
          </div>
          <TableData
          
            isPending={loading || isPending} // الجمع بين حالة التحميل اليدوية وuseFetch
            StudentData={students}
            refetch={refetch}
            chosen={chosen}
            setChosen={setChosen}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(true)} centered>
        <ModalHeader className="border-bottom-0 justify-content-center">
          <SuccessMan />
        </ModalHeader>
        <ModalBody className="d-flex flex-column  align-items-center">
          <p style={{ fontSize: "24px", color: "#0077B6", fontWeight: "bold" }}>
            هل انت متاكد من حذف الطلاب المحددين
          </p>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() =>
                DeleteStudents({
                  ids: chosen,
                })
              }
              style={{
                backgroundColor: "#3fc537",
                border: "0px solid",
                width: "108px",
                height: "50px",
                fontSize: "18px",
              }}
            >
              {loadingDelete ? <Spinner /> : "نعم"}
            </button>

            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => {
                setModal(false)
              }}
              style={{
                backgroundColor: "#FF4F4F",
                border: "0px solid",
                width: "108px",
                height: "50px",
                fontSize: "18px",
              }}
            >
              الغاء
            </button>
          </div>
        </ModalBody>
      </Modal>
      <SuccessModal
        isOpen={modalSuccess}
        setOpen={setModalSuccess}
        text="تم حذف الطلاب المحددين بنجاح"
        toggle={() => setModalSuccess(!modalSuccess)}
      />
    </div>
  )
}

export default Main
