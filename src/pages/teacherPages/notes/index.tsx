/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import notesIcon from "../../../assets/sidebar/notes_logo.png"
//@ts-ignore
import errorWarnIcon from "../../../assets/error_warn.png"
//@ts-ignore
import { Card, CardBody, Table } from "reactstrap"
//@ts-ignore
import { SetStateAction, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//@ts-ignore
import filterIcon from "../../../assets/filterIcon.png"
import { GenericInfoModal } from "../../../components/genericInfoModal"
import SearchInput from "../../../components/SearchInput"
import {
  behaviorType,
  classOrRowType,
  filterDataType,
  notesUserType,
  userNoteType,
} from "../../../types"
import Select from "react-select"

import {
  addStudentsBehaviors,
  getBehaviors,
  getNoteUsers,
  getSchoolClasses,
  getSchoolRows,
} from "../../../utils/api.functions"
import { useMutate } from "../../../hooks/useMutate"
import useFetch from "../../../hooks/useFetch"
import { toast } from "react-toastify"
export default function Notes() {
  document.title = "الملاحظات"

  const [behaviors, setBehaviors] = useState<behaviorType[]>([])
  const [behaviorsFav, setBehaviorsFav] = useState<behaviorType[]>([])

  const [originalBehaviors, setOriginalBehaviors] = useState<behaviorType[]>([])

  const [rows, setRows] = useState<notesUserType[]>([])
  const [selectedStudentRows, setSelectedStudentRows] = useState<number[]>([])
  const [selectedBehavior, setSelectedBehavior] = useState<behaviorType | null>(
    null
  )
  const [ selectId, setSelectId ] = useState("")
  const [selectBehaveId, setSelectBehavId] = useState("")
  

  const [noteComment, setNoteComment] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [schoolClasses, setSchoolClasses] = useState<classOrRowType[]>([])
  const [schoolRows, setSchoolRows] = useState<classOrRowType[]>([])
  const navigate = useNavigate()
  const [statusAddiction, setStatusAddiction] = useState("positive")

  const [filterData, setFilterData] = useState<filterDataType>({
    search: "",
    row: -1,
    class: -1,
  })
  const [openNotesModal, setOpenNotesModal] = useState(false)
  const [currentUserNotes, setCurrentUserNotes] = useState<userNoteType[]>([])
  const onSubmit = () => {
    addStudentsBehaviors(
      selectedStudentRows,
      selectId ?? null,
      noteComment
    ).then(() => {
      setRows((prev) =>
        prev.map((user) => {
          if (selectedStudentRows.includes(user.id)) {
            return {
              ...user,
              bad_behavior_count:
                (selectedBehavior?.points ?? 0) < 0
                  ? user.bad_behavior_count + 1
                  : user.bad_behavior_count,
              good_behavior_count:
                (selectedBehavior?.points ?? 0) > 0
                  ? user.good_behavior_count + 1
                  : user.good_behavior_count,
            }
          }
          return user
        })
      )
      setOpenModal(true)
      setSelectedBehavior(null)
      setSelectedStudentRows([])
      setNoteComment("")
    })
  }
  // تعريف useMutate
  // const { mutate: toggleFavoriteMutation } = useMutate({
  //   mutationKey: [`school/teacher/behaviors/favorite/toggle/${selectId}`],
  //   endpoint: `school/teacher/behaviors/favorite/toggle/${selectId}`,
  //   onSuccess: () => {
  //     console.log("Favorite status updated successfully!")
  //   },
  //   formData: true, // إذا كان الطلب يستخدم FormData
  // })
  const behaviorEndpoint = `school/teacher/behaviors/get-favourite-behaviors`
  const { data: behaviorFavorite } = useFetch({
    queryKey: [behaviorEndpoint],
    endpoint: behaviorEndpoint,
  })
  const endpoint = `school/teacher/behaviors/favorite/toggle/${selectBehaveId}`
  const { data: toggleFavorite } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
    enabled: !!selectBehaveId,
  })

  useEffect(() => {
    getNoteUsers(filterData).then((users: notesUserType[]) => setRows(users))
    getBehaviors().then((behaviorsArray) => {
      setBehaviors([...behaviorsArray])
      setOriginalBehaviors([...behaviorsArray])
    })
    getSchoolClasses().then((data) => setSchoolClasses(data))
    getSchoolRows().then((data) => setSchoolRows(data))
  }, [selectId])
  useEffect(() => {
    setBehaviorsFav(behaviorFavorite?.response?.data)
  }, [behaviorFavorite])

  useEffect(() => {
    getNoteUsers(filterData).then((users: notesUserType[]) => setRows(users))
  }, [filterData])
  useEffect(() => {
    let filteredBehaviors: SetStateAction<behaviorType[]> = []

    if (statusAddiction === "positive") {
      filteredBehaviors = originalBehaviors.filter((item) => item?.points > 0)
    } else if (statusAddiction === "negative") {
      filteredBehaviors = originalBehaviors.filter((item) => item?.points < 0)
    }
    setBehaviors(filteredBehaviors)
  }, [originalBehaviors, statusAddiction])
  // const toggleFavorite = (behaviorId: number) => {
  //   // تحديث الواجهة لتغيير حالة السلوك محليًا
  //   setBehaviors((prevBehaviors) =>
  //     prevBehaviors.map((behavior) =>
  //       behavior.id === behaviorId
  //         ? { ...behavior, isFavorite: !behavior.isFavorite }
  //         : behavior
  //     )
  //   )

  //   // إرسال الطلب مع السلوك المحدد
  //   toggleFavoriteMutation(
  //     {}, // البيانات المطلوبة إن وجدت
  //     {
  //       endpoint: `school/teacher/behaviors/favorite/toggle/${behaviorId}`, // استبدال {id} بالقيمة مباشرة
  //     }
  //   )
  // }
  useEffect(() => {
    toggleFavorite
  }, [selectBehaveId])
  useEffect(() => {
    if (behaviorFavorite?.result?.data) {
      // فلترة السلوكيات المفضلة فقط
      let filteredFavorites = behaviorFavorite.result.data

      // تطبيق الفلتر الإيجابي/السلبي
      if (statusAddiction === "positive") {
        filteredFavorites = filteredFavorites.filter(
          (behavior) => behavior.points > 0
        )
      } else if (statusAddiction === "negative") {
        filteredFavorites = filteredFavorites.filter(
          (behavior) => behavior.points < 0
        )
      }

      // تحديث السلوكيات المفضلة المعروضة
      setBehaviorsFav(filteredFavorites)
    }
  }, [behaviorFavorite, statusAddiction])

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
          <img width={35} className="p-1" src={notesIcon} alt="" />
        </div>
        <div className="flex-grow-1 text-center">الملاحظات</div>
      </h3>
      <div
        style={{
          border: "6px solid #ECF2F8",
          borderRadius: "8px 8px 0 0 ",
        }}
      >
        <div
          style={{
            backgroundColor: "#0077B6",
            color: "white",
            padding: "4px",
            borderRadius: "8px 8px 0 0 ",
          }}
        >
          <h5 className="text-center p-2">إضافة ملاحظة</h5>
        </div>
        <Card
          className="my-4"
          style={{
            border: "1px  solid #368AAFB2",
            padding: "14px",
            margin: "14px",
          }}
        >
          <CardBody>
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
            <div className="row">
              <div className="md-100 col-12 col-md-6 d-flex justify-content-around align-items-center my-4">
                <p className="m-0 fw-bold mx-2">السلوك</p>
                <div className="form-group m-0 flex-grow-1 ">
                  {/* <select
                  value={selectedBehavior?.id ?? 0}
                  onChange={(ev) => {
                    setSelectedBehavior(
                      behaviors.find(
                        (behavior) => behavior.id === parseInt(ev.target.value)
                      ) ?? null
                    )
                  }}
                  className="form-control"
                >
                  <option value={0} disabled>
                    {" "}
                    اخترالسلوك
                  </option>
                  {behaviors.map((behavior) => (
                    <option key={behavior.id} value={behavior.id}>
                      {behavior.title}
                    </option>
                  ))}
                </select> */}
                  <div className="form-group m-0 flex-grow-1">
                    <Select
                      // menuIsOpen={true}
                      placeholder="اختر السلوك"
                      options={behaviors.map((behavior) => ({
                        value: behavior.id,
                        label: (
                          <div className="d-flex justify-content-between align-items-center">
                            {behavior.title}
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={(ev) => {
                                setSelectedBehavior(
                                  behaviors.find(
                                    (behavior) =>
                                      behavior.id === parseInt(ev.value)
                                  ) ?? null
                                )
                                setSelectBehavId(behavior?.id)
                                toast.success(
                                  behavior?.is_favorite
                                    ? "تم الحذف من السلوكيات المفضلة"
                                    : "تم الاضافة الى السلوكيات المفضلة"
                                )
                              }}
                              style={{
                                color: behavior.is_favorite ? "gold" : "gray",
                                fontSize: "18px",
                              }}
                            >
                              ★
                            </button>
                          </div>
                        ),
                      }))}
                      onChange={(e) => {
                        setSelectedBehavior(
                          behaviors.find(
                            (behavior) => behavior.value === parseInt(e.value)
                          ) ?? null
                        )
                        setSelectId(e?.value)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md-100 col-12 col-md-6 d-flex justify-content-around align-items-center my-4">
                <p className="m-0 fw-bold mx-2">السلوكيات المفضلة</p>
                <div className="form-group m-0 flex-grow-1 ">
                  <div className="form-group m-0 flex-grow-1">
                    <Select
                      onChange={(e) => {
                        setSelectedBehavior(
                          behaviors.find(
                            (behavior) => behavior.value === parseInt(e.value)
                          ) ?? null
                        )
                        setSelectId(e?.value)
                      }}
                      // menuIsOpen={true}
                      placeholder="اختر السلوك المفضل"
                      options={behaviorsFav?.map((behavior) => ({
                        value: behavior.id,
                        label: (
                          <div className="d-flex justify-content-between align-items-center">
                            {behavior.title}
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={(ev) => {
                                // setSelectedBehavior(
                                //   behaviors.find(
                                //     (behavior) =>
                                //       behavior.id === parseInt(ev.value)
                                //   ) ?? null
                                // )
                                setSelectBehavId(behavior?.id)
                                // toast.success(
                                //   behavior?.is_favorite
                                //     ? "تم الحذف من السلوكيات المفضلة"
                                //     : "تم الاضافة الى السلوكيات المفضلة"
                                // )
                              }}
                              style={{
                                color: behavior.is_favorite ? "gold" : "gray",
                                fontSize: "18px",
                              }}
                            >
                              ★
                            </button>
                          </div>
                        ),
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p style={{ color: "#6F6F6F" }}>ملاحظة (إختياري):</p>
            <textarea
              value={noteComment}
              onChange={(ev) => {
                setNoteComment(ev.target.value)
              }}
              className="form-control custom-textarea"
              id="customTextarea"
              style={{ resize: "none" }}
              rows={5}
            ></textarea>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <p className="error my-3">
                <img className="mx-1" src={errorWarnIcon} />
                يجب تحديد طالب/طلاب لتتمكن من إسناد الملاحظة.
              </p>
              <button
                style={{ backgroundColor: "#0077B6" }}
                type="button"
                className="w-25 btn text-white p-0 py-2"
                onClick={() => onSubmit()}
                disabled={!selectedStudentRows.length || !selectId}
              >
                إضافة
              </button>
            </div>
          </CardBody>
        </Card>
        <div className="row align-items-center">
          <div className="d-flex col-12 col-lg-4 col-md-4 col-sm-6">
            {/* <div className="d-flex align-items-center w-100 rounded">
              <input
                className="form-control top-0 start-0"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="بـــــحــــــث"
                style={{ border: 0, outline: 0 }}
                value={filterData?.search}
                onChange={(ev) => {
                  setFilterData((prev) => ({
                    ...prev,
                    search: ev.target.value,
                  }));
                }}
              />
              <img
                src={searchIcon}
                className="p-2"
                style={{ backgroundColor: "#fff" }}
              />
            </div> */}
            <div className="mx-3">
              <SearchInput
                placeholder={"بـــــحــــــث"}
                action={(ev) => {
                  setFilterData((prev) => ({
                    ...prev,
                    search: ev.target.value,
                  }))
                }}
              />
            </div>
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
                  }))
                }}
                className="form-control"
              >
                <option value={-1} disabled>
                  اختر الصف
                </option>
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
                  }))
                }}
                className="form-control"
              >
                <option value={-1} disabled>
                  اختر الفصل
                </option>
                {schoolClasses.map((schoolClass, index) => (
                  <option value={schoolClass.id} key={index}>
                    {schoolClass.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Table className="no-wrap mt-3 align-middle px-2" responsive borderless>
          <tr
            style={{ borderBottom: "1px solid #49494933", height: "60px" }}
            className="p-2"
          >
            <th className="ffcairo text-center">
              <input
                type="checkbox"
                className="form-check-input"
                checked={
                  rows.length === selectedStudentRows.length &&
                  selectedStudentRows.length != 0
                }
                onChange={(ev) => {
                  if (ev.target.checked)
                    setSelectedStudentRows([...rows.map((row) => row.id)])
                  else setSelectedStudentRows([])
                }}
              />
              {/* select All */}
            </th>
            <th className="ffcairo text-center">اسم الطالب</th>
            <th className="ffcairo text-center">الصف</th>
            <th className="ffcairo text-center">الفصل</th>
            <th className="ffcairo text-center">الملاحظات الإيجابية</th>
            <th className="ffcairo text-center">الملاحظات السلبية</th>
            <th className="ffcairo text-center">سجل الملاحظات</th>
          </tr>
          {rows.length === 0 ? (
            <tr className=" mt-4 ">
              <td
                colSpan={7}
                className=" text-center"
                style={{ height: "150px" }}
              >
                <i className="ri-inbox-fill text-warning fs-2"></i>
                <p className="fs-4 text-warning ">لايوجد بيانات حتي الأن</p>
              </td>
            </tr>
          ) : (
            <>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-center py-2">
                    <input
                      type="checkbox"
                      checked={
                        selectedStudentRows.findIndex(
                          (sRow) => sRow === row.id
                        ) !== -1
                      }
                      onChange={(ev) => {
                        if (ev.target.checked)
                          setSelectedStudentRows([
                            ...selectedStudentRows,
                            row.id,
                          ])
                        else
                          setSelectedStudentRows([
                            ...selectedStudentRows.filter(
                              (sRow) => sRow !== row.id
                            ),
                          ])
                      }}
                      className="form-check-input"
                    />
                  </td>
                  <td className="text-center py-2">{row?.name ?? ""}</td>
                  <td className="text-center py-2">{row?.row?.title ?? ""}</td>
                  <td className="text-center py-2">
                    {row?.class?.title ?? ""}
                  </td>
                  <td className="text-center py-2">
                    {row.good_behavior_count}
                  </td>
                  <td className="text-center py-2">{row.bad_behavior_count}</td>
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
        <div className=" col-12  mt-2 text-center  ">
          <a className="link-color me-0   me-lg-3 fw-400 text-decoration-none">
            <GenericInfoModal
              open={openModal}
              className={""}
              setOpen={setOpenModal}
              modalTitle={"إضافة سلوك الطلاب"}
              content={"تم إضافة السلوك إلي الطلاب بنجاح"}
            />
          </a>
        </div>

        <div className=" col-12  mt-2 text-center  ">
          <a className="link-color me-0   me-lg-3 fw-400 text-decoration-none">
            <GenericInfoModal
              open={openNotesModal}
              setOpen={setOpenNotesModal}
              modalTitle={"عرض الملاحظات"}
              className={"custom-modal-width"}
              content={
                <Card className="shadow rounded">
                  <CardBody>
                    <div className="row d-flex flex-column align-items-start ">
                      <div
                        className="col-8 col-lg-2 col-md-3 col-sm-4 d-flex rounded-pill py-2  justify-content-evenly"
                        style={{ border: "2px solid #707070" }}
                      >
                        <p
                          className="rounded-circle my-auto"
                          style={{
                            backgroundColor: "#707070",
                            color: "#fff",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          0
                        </p>
                        فلتر
                        <img src={filterIcon} />
                      </div>
                    </div>
                    <Table
                      className="no-wrap mt-3 align-middle px-2"
                      responsive
                      borderless
                    >
                      <thead>
                        <tr>
                          <th>السلوك</th>
                          <th>التعليق</th>
                          <th> نوع الملاحظة</th>
                          <th>تاريخ الملاحظة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUserNotes?.map(
                          (userNote: userNoteType, index: number) => (
                            <tr key={index}>
                              <td>{userNote?.behavior?.title ?? ""}</td>
                              <td>{userNote?.note ?? "لا تعليق"}</td>
                              <td
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
                              <td>
                                {new Date(
                                  userNote?.created_at
                                ).toLocaleDateString("en-SA", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              }
            />
          </a>
        </div>
      </div>
    </>
  )
}
