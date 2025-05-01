import { useState } from "react";
import { useNavigate } from "react-router-dom";
import teachersImage from "../../assets/sidebar/image 6.png";
import useFetch from "../../hooks/useFetch";
import { downloadFile } from "../../utils/api.functions";
import DownloadIcon from "../icons/DownloadIcon";
import UploadIcon from "../icons/UploadIcon";
import SearchInput from "../SearchInput";
import FilterTeacher from "./FilterTeacher";
import TableData from "./TableData";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import SuccessMan from "../icons/SucessMan";
import SuccessModal from "../SuccessModal";
import { useMutate } from "../../hooks/useMutate";

function Main() {
  const navigate = useNavigate();
  const [sort, setSort] = useState({
    asc: "",
    des: "",
    sort_by: "",
  });
  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [term, setSearchTerm] = useState("");
  const [chosen, setChosen] = useState<number[]>([]);
  const [page, setPage] = useState(0);

  const queryParams = {
    term: term,
    page: page,
    sort_direction: sort?.sort_by,
    sort_by: sort?.sort_by,
  };

  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `school/manager/teachers?${searchParams.toString()}`;
  const {
    data: teachersData,
    isPending,
    refetch,
  } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });
  const {
    mutate: DeleteTeachers,
    isPending: loadingDelete,
  } = useMutate({
    mutationKey: ["school/manager/teachers/destroy"],
    endpoint: `school/manager/teachers/destroy`,
    onSuccess: () => {
      refetch();
      setModalSuccess(true);
      setModal(false);
      setChosen([]);
    },
    formData: true,
  });
  const [pages, setPages] = useState(teachersData?.result?.meta?.current_page);

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
          <img width={35} className="p-1" src={teachersImage} alt="" />
        </div>
        <div className="flex-grow-1 text-center">المعلمين</div>
      </h3>

      <div className="row row-cols-md-6 row-cols-2 gap-3 mt-4 justify-content-center">
        <button
          className="btn"
          onClick={() => navigate("/teachers/add")}
          style={{
            border: "0px solid transparent",
            backgroundColor: "#0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "white",
            fontWeight: "700",
            maxWidth: "220px",
            width: "100%",
          }}
        >
          إضافة معلم
        </button>
        <button
          className="btn"
          onClick={() => navigate("/teachers/upload")}
          style={{
            border: "1px solid #0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "#0077B6",
            fontWeight: "400",
            display: "flex",
            gap: "2px",
            alignItems: "center",
            maxWidth: "220px",
            width: "100%",
          }}
        >
          رفع ملف المعلمين
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
            maxWidth: "220px",
            width: "100%",
          }}
          onClick={() =>
            downloadFile("school/manager/teachers/export", "teachers_data.xlsx")
          }
        >
          تحميل ملف المعلمين <DownloadIcon />
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
              <div className="my-4  d-flex justify-content-between">
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "hsla(0, 0%, 23%, 1)",
                  }}
                >
                  المعلمين
                  <span
                    style={{
                      color: "#8A8A8A",
                      fontSize: "18px",
                      fontWeight: "400",
                      margin: "0 5px",
                    }}
                  >
                    ({teachersData?.result?.data?.length})
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
                <div className="main_search">
                  <FilterTeacher setSort={setSort} />
                </div>
              </div>
            </div>
          </div>
          <TableData
            isPending={isPending}
            teachersData={teachersData}
            setPages={setPages}
            pages={pages}
            refetch={refetch}
            chosen={chosen}
            setChosen={setChosen}
            setPage={setPage}
            page={page}
            setModalSetModalDelete
          />
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(true)} centered>
        <ModalHeader className="border-bottom-0 justify-content-center">
          <SuccessMan />
        </ModalHeader>
        <ModalBody className="d-flex flex-column  align-items-center">
          <p style={{ fontSize: "24px", color: "#0077B6", fontWeight: "bold" }}>
            هل انت متاكد من حذف المعلمين المحددين
          </p>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() =>
                DeleteTeachers({
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
                setModal(false);
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
        text="تم حذف المعلمين المحددين بنجاح"
        toggle={() => setModalSuccess(!modalSuccess)}
      />
    </div>
  );
}

export default Main;
