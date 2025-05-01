import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Badge, Button, Spinner } from "reactstrap";
import { useMutate } from "../../hooks/useMutate";
import client from "../../utils/client";
import DeleteModal from "../deleteModal";
import EditIcon from "../icons/EditIcon";
import ResetPassword from "../ResetPassword";
import SuccessModal from "../SuccessModal";
import Paginate from "../Paginate";

type Teacher = {
  id: number;
  name: string;
  user_name: string;
  is_active: boolean;
};

type PaginationMeta = {
  last_page: number;
};

type StudentDataResponse = {
  result: {
    data: Teacher[];
    meta: PaginationMeta;
  };
};

type TableDataProps = {
  StudentData: StudentDataResponse;
  isPending: boolean;
  refetch: () => void;
};

const TableData: React.FC<TableDataProps> = ({
  StudentData,
  isPending,
  refetch,
  chosen,
  setChosen,
  page,
  setPage,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setChosen([]);
    } else {
      setChosen(StudentData?.result?.data?.map((item) => item.id) || []);
    }
    setSelectAll(!selectAll);
  };

  const toggle = () => setModal(!modal);

  const [modalResetPassword, setModalResetPassword] = useState(false);


  const {
    mutate: DeleteStudent,
    isSuccess: successDelete,
    isPending: loadingDelete,
  } = useMutate({
    mutationKey: ["school/manager/students/destroy"],
    endpoint: `school/manager/students/destroy`,
    onSuccess: () => {
      refetch();
      setModalDelete(true);
    },
    formData: true,
    // method:"delete"
  });

  const { mutate: resetPassword, isPending: loadingSubmit } = useMutate({
    mutationKey: ["school/manager/students/update-password"],
    endpoint: `school/manager/students/update-password`,
    onSuccess: () => {
      setModalResetPassword(false);
      setModal(true);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
    formData: true,
  });
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleCheckboxChange = (id: number) => {
    if (chosen.includes(id)) {
      setChosen(chosen.filter((item) => item !== id));
    } else {
      setChosen([...chosen, id]);
    }
  };

  return (
    <div
      style={{
        overflowX: "scroll",
      }}
    >
      <table className="table" style={{ borderColor: "transparent" }}>
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
            {/* <th scope="col" className="text-center">
              اسم المستخدم
            </th> */}
            <th scope="col" className="text-center">
              رقم الهوية
            </th>
            <th scope="col" className="text-center">
              المرحلة
            </th>
            <th scope="col" className="text-center">
              الصف
            </th>
            <th scope="col" className="text-center">
              الفصل
            </th>
            <th scope="col" className="text-center">
              الحالة
            </th>
            <th scope="col" className="text-center">
              حساب الطالب
            </th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {!isPending && StudentData?.result?.data?.length > 0 ? (
            StudentData.result.data.map((item) => (
              <tr key={item.id}>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                    id={item.id.toString()}
                    value={item.id}
                    checked={chosen.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.name}
                </td>
                {/* <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.user_name}
                </td> */}
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.national_id}
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.grade?.title}
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.row?.title}
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.class?.title}
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  {item.is_active ? (
                    <Badge color="success" className="p-2">
                      فعال
                    </Badge>
                  ) : (
                    <Badge color="secondary" className="p-2">
                      غير فعال
                    </Badge>
                  )}
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <p
                    style={{
                      backgroundColor: "#A7C957",
                      borderRadius: "181px",
                      width: "100px",
                      height: "39px",
                      padding: "8px 15px",
                      margin: "0 auto",
                      color: "white",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => navigate(`/students/profile/${item.id}`)}
                  >
                    تفاصيل
                  </p>
                </td>
                <td
                  className="text-center"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/students/edit/${item.id}`}>
                      <EditIcon />
                    </Link>
                    <DeleteModal
                      targetId={item.id}
                      setSelectedId={setSelectedId}
                      deleteStudent={DeleteStudent}
                    />
                    <Button
                      outline
                      type="button"
                      style={{
                        border: "0px solid",
                        backgroundColor: "#707070",
                        color: "white",
                        borderRadius: "181.43px",
                        width: "162px",
                        height: "41px",
                        padding: "8px 15px",
                      }}
                      onClick={() => {
                        setSelectedId(item?.id);
                        setModalResetPassword(true);
                      }}
                    >
                      <p style={{ margin: "0" }}>تهيئة كلمة المرور</p>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : !isPending && StudentData?.result?.data?.length === 0 ? (
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
      <ResetPassword
        setModalResetPassword={setModalResetPassword}
        resetPassword={resetPassword}
        targetId={selectedId}
        setSelectedId={setSelectedId}
        student_id={selectedId}
        loadingSubmit={loadingSubmit}
        modalResetPassword={modalResetPassword}
      />
      <div className="d-flex justify-content-center mx-1">
        {StudentData?.result?.meta?.last_page > 1 && (
          <Paginate
            pagesCount={StudentData?.result?.meta?.last_page}
            previousLabel={"السابق"}
            nextLabel={"التالي"}
            onPageChange={handlePageChange}
            initialPage={page}
          />
        )}
      </div>
      <SuccessModal
        isOpen={modal}
        text={"تم تغيير كلمة المرور بنجاح"}
        toggle={toggle}
        setOpen={setModal}
      />
      <SuccessModal
        isOpen={modalDelete}
        text={"تم حذف الطالب بنجاح"}
        toggle={toggleDelete}
        setOpen={setModalDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default TableData;
