import { Badge, Spinner } from "reactstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../../components/deleteModal";
import client from "../../../utils/client";
import behaviorImage from "../../../assets/sidebar/reward 1.png";
import Paginate from "../../../components/Paginate";
import SearchInput from "../../../components/SearchInput";
import useFetch from "../../../hooks/useFetch";
import EditIcon from "../../../components/icons/EditIcon";
function Behaviors() {
  document.title = "السلوكيات";
  const [page, setPage] = useState(1);
  const [term, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryParams = {
    term: term,
    page: page,
  };

  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `school/manager/behaviors?${searchParams.toString()}`;
  const {
    data: behaviorData,
    isPending,
    refetch,
  } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });


  const deleteBehavior = async () => {
    try {
      client.delete(`school/manager/behaviors/${selectedId}`).then(() => {
        toast.success("تم مسح السلوك بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        refetch();
      });
    } catch (error) {
      console.log("error happend", error);
      toast.error("حدث خطأ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <div>
      <h3
        className="col-12 col-lg-4 col-md-6  col-sm-8 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
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
        <div className="flex-grow-1 text-center">
          إعدادات البوينت والسلوكيات
        </div>
      </h3>
      {/* <div className="rtl  p-3  mt-5">
        <ProjectTables
          tableTitle={"السلوكيات"}
          tableDescription={"نبذة عن السلوكيات"}
          buttonTitle={"اضافة سلوك"}
          tableLink={"/settings/pointssettings"}
          textAlign={"center"}
          th1={"اسم السلوك"}
          th2={" النقاط"}
          th3={"نوع السلوك"}
          th4={"العمليات"}
          term={term}
          setSearchTerm={setSearchTerm}
          fetchData={searchfetch}
          data={behaviors?.length}
          notFound={notFound}
        >
          {!loading && !noData ? (
            behaviors.map((item: any, index: any) => (
              <tr key={index} className="border-top">
                <td className="ffcairo">
                  <div className="d-flex align-items-center justify-content-center p-2">
                    <div className="ms-3">
                      <h6 className="mb-0 ffcairo">{item?.title}</h6>
                    </div>
                  </div>
                </td>
                <td className="ffcairo text-center ">
                  {Math.abs(item?.points)}
                </td>
                <td className="ffcairo text-center ">
                  {item?.points > 0 ? (
                    <Badge
                      color="success"
                      className="p-2 rounded-3 col-12 col-lg-3 col"
                    >
                      ايجابي
                    </Badge>
                  ) : (
                    <Badge
                      color="danger"
                      className="p-2 rounded-3 col-12 col-lg-3"
                    >
                      سلبي
                    </Badge>
                  )}
                </td>

                <td className="d-flex gap-2 justify-content-center">
                  <Link to={`/behaviors/edit/${item.id}`}>
                    <Button color="primary" outline>
                      <EditIcon />
                    </Button>
                  </Link>
                  <DeleteModal
                    targetId={item.id}
                    setSelectedId={setSelectedId}
                    onClick={() => {
                      deleteBehavior();
                    }}
                  />
                </td>
              </tr>
            ))
          ) : !loading && noData ? (
            <tr className="justify-content-center">
              <td colSpan={6} className=" text-center">
                <i
                  className="bi bi-exclamation-circle-fill"
                  style={{ fontSize: "50px" }}
                ></i>
                <p className="fs-3">لايوجد بيانات</p>
              </td>
            </tr>
          ) : (
            <tr className="justify-content-center">
              <td colSpan={6} className="text-center">
                <Spinner className="m-5" color="primary">
                  Loading...
                </Spinner>
              </td>
            </tr>
          )}
          {pages?.last_page > 1 && (
            <tr className="w-100 ">
              <td colSpan={8}>
                <ReactPaginate
                  previousLabel={"السابق"}
                  nextLabel={"التالي"}
                  breakLabel={"..."}
                  pageCount={pages?.last_page}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName="pagination d-flex flex-row-reverse  col-12 d-flex justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLinkClassName="page-link"
                  activeClassName="active"
                />
              </td>
            </tr>
          )}
        </ProjectTables>
      </div> */}
      <div className="d-flex justify-content-center gap-4 mt-4">
        <button
          className="btn"
          onClick={() => navigate("/settings/pointssettings")}
          style={{
            border: "0px solid transparent",
            backgroundColor: "#0077B6",
            borderRadius: "200px",
            padding: "8px 16px",
            color: "white",
            fontWeight: "700",
          }}
        >
          إضافة سلوك
        </button>
      </div>
      <div
        className="mb-5 mt-4"
        style={{
          border: "6px solid #ECF2F8",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <div>
          <div className="mx-3">
            <div>
              <div className="my-4 ">
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "hsla(0, 0%, 23%, 1)",
                  }}
                >
                  السلوكيات
                  <span
                    style={{
                      color: "#8A8A8A",
                      fontSize: "18px",
                      fontWeight: "400",
                      margin: "0 5px",
                    }}
                  >
                    ({behaviorData?.result?.data?.length})
                  </span>
                </p>
              </div>
              <div className="mb-3  d-flex justify-content-between ">
                <div>
                  <SearchInput
                    action={(e) => setSearchTerm(e.target.value)}
                    placeholder={"بحث"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{
            overflow:"scroll"
          }}>
          <table className="table" style={{ borderColor: "transparent" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #49494933" }}>
                <th scope="col" className="text-center w-25">
                  اسم السلوك
                </th>
                <th scope="col" className="text-center w-25">
                  النقاط
                </th>
                <th scope="col" className="text-center w-25">
                  نوع السلوك
                </th>
                {/* <th scope="col" className="text-center w-25"></th> */}
              </tr>
            </thead>
            <tbody>
              {!isPending && behaviorData?.result?.data?.length > 0 ? (
                behaviorData?.result?.data.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{item.title}</td>
                    <td className="text-center"> {Math.abs(item?.points)}</td>
                    <td className="ffcairo text-center ">
                      {item?.points > 0 ? (
                        <Badge
                          color="success"
                          className="p-2 rounded-3 col-12 col-lg-3 col"
                        >
                          ايجابي
                        </Badge>
                      ) : (
                        <Badge
                          color="danger"
                          className="p-2 rounded-3 col-12 col-lg-3"
                        >
                          سلبي
                        </Badge>
                      )}
                    </td>
                    {
                      !item?.admin &&
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Link to={`/behaviors/edit/${item.id}`}>
                          <EditIcon />
                        </Link>
                        <DeleteModal
                          targetId={item.id}
                          setSelectedId={setSelectedId}
                          deleteStudent={deleteBehavior}
                        />
                      </div>
                    </td>

                    }
                  </tr>
                ))
              ) : !isPending && behaviorData?.result?.data?.length === 0 ? (
                <tr className="justify-content-center">
                  <td colSpan={4} className="text-center">
                    <i
                      className="bi bi-exclamation-circle-fill"
                      style={{ fontSize: "50px" }}
                    ></i>
                    <p className="fs-3">لايوجد بيانات</p>
                  </td>
                </tr>
              ) : (
                <tr className="justify-content-center">
                  <td colSpan={4} className="text-center">
                    <Spinner className="m-5" color="primary">
                      Loading...
                    </Spinner>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          </div>
          <div className="w-100 d-flex justify-content-center ">
            {behaviorData?.result?.meta?.last_page > 1 && (
              <Paginate
                pagesCount={behaviorData?.result?.meta?.last_page}
                previousLabel={"السابق"}
                nextLabel={"التالي"}
                onPageChange={handlePageChange}
                initialPage={page}
              />
            )}
            {/* {behaviorData?.result?.meta?.last_page > 1 && (
              <ReactPaginate
                  previousLabel={"السابق"}
                  nextLabel={"التالي"}
                  breakLabel={"..."}
                  pageCount={behaviorData?.result?.meta?.last_page}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="d-flex gap-2 align-items-center"
                  pageClassName="fw-bold shadow-sm py-2 px-3 rounded"
                  activeClassName="bg-primary text-white"
                  disabledClassName="text-muted cursor-not-allowed"
                  previousLinkClassName="btn btn-outline-success fw-bold py-2 px-3 rounded"
                  nextLinkClassName="btn btn-outline-success fw-bold py-2 px-3 rounded"
                />
            )} */}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Behaviors;
