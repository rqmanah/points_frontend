import { Badge, Button, Spinner } from "reactstrap";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupportIcon from "../../components/icons/SupportIcon";
import SearchInput from "../../components/SearchInput";
import client from "../../utils/client";

interface Ticket {
  id: number;
  subject: string;
  created_at: string;
  closed_at?: string;
  status: string;
}

interface PageMeta {
  last_page: number;
}

function Support() {
  document.title = "الدعم الفني";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [pages, setPages] = useState<PageMeta | null>(null);
  const [term, setSearchTerm] = useState<string>("");
  const [notFound, setNotFound] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await client.get(`school/manager/tickets`);
      setTickets(response.data.result.data);
      setPages(response.data.result.meta);
      setNoData(response.data.result.data.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = async (data: { selected: number }) => {
    try {
      const response = await client.get(
        `school/manager/tickets?page=${data.selected + 1}`
      );
      setTickets(response.data.result.data);
      setPages(response.data.result.meta);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchFetch = async () => {
    try {
      const response = await client.get(
        term !== ""
          ? `school/manager/tickets?term=${term}`
          : `school/manager/tickets`
      );
      setTickets(response.data.result.data);
      setPages(response.data.result.meta);
      setNotFound(response.data.result.data.length === 0 ? "غير موجود" : "");
      setNoData(response.data.result.data.length == 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchFetch();
  }, [term]);

  return (
    <div className="mx-md-4">
      <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-0 flex-md-nowrap ">
        <h3
          className="col-10 col-lg-2 col-md-3 col-sm-4 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
          style={{
            border: "2px solid #A7C957",
            fontSize: "24px",
            borderRight: "transparent",
            width: "204px",
          }}
        >
          <div
            className="rounded-circle"
            style={{
              border: "2px solid #A7C957",
              width: "45px",
              height: "45px",
              padding: "6px",
              scale: "1.6",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SupportIcon />
          </div>
          <div className="flex-grow-1 text-center mx-3">الدعم الفني</div>
        </h3>
        <button
          type="button"
          className="btn-blue"
          onClick={() => navigate("/support/add")}
          style={{
            width: "215px",
            fontSize: "18px",
            // lineHeight: "33.73px",
            borderRadius: "200px",
            color: "white",
            padding: "5px 16px",
            border: "0px solid transparent",
            fontWeight: "700",
            height: "47px",
          }}
        >
          إنشاء تذكرة دعم جديدة
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
          <div className="mx-3 mx-md-0">
            <div className="my-4 text-center">
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "20px",
                  color: "hsla(0, 0%, 23%, 1)",
                }}
              >
                التفاصيل
              </p>
            </div>
            <div className="mb-3  mx-md-2 d-flex">
              <div className="main_search">
                <SearchInput
                  action={(e) => setSearchTerm(e.target.value)}
                  placeholder={"بحث برقم الطلب"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              overflow: "scroll",
            }}
          >
            <table className="table" style={{ borderColor: "transparent" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #49494933" }}>
                  <th scope="col"> رقم الطلب</th>
                  <th scope="col"> المشكلة</th>

                  <th scope="col">تاريخ الطلب</th>
                  <th scope="col">تاريخ الاقفال</th>
                  <th scope="col">حالة التذكرة</th>
                  <th scope="col">العمليات</th>
                </tr>
              </thead>
              <tbody>
                {!loading && !noData ? (
                  tickets.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>{item.subject}</td>
                      <td>{item.created_at}</td>
                      <td>{item.closed_at?.slice(0, 10) || "------------"}</td>
                      <td>
                        {item.status === "opened" ? (
                          <Badge className="bg-success fs-6">مفتوحة</Badge>
                        ) : (
                          <Badge className="bg-secondary fs-6">مغلقة</Badge>
                        )}
                      </td>
                      <td>
                        {item.status === "opened" && (
                          <Link to={`/support/edit/${item.id}`}>
                            <Button outline color="success">
                              <i className="bi bi-chat-left-fill"></i>
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : !loading && noData ? (
                  <tr className="justify-content-center">
                    <td colSpan={5} className="text-center">
                      <i
                        className="bi bi-exclamation-circle-fill"
                        style={{ fontSize: "50px" }}
                      ></i>
                      <p className="fs-3">لايوجد بيانات</p>
                    </td>
                  </tr>
                ) : (
                  <tr className="justify-content-center">
                    <td colSpan={5} className="text-center">
                      <Spinner className="m-5" color="primary">
                        Loading...
                      </Spinner>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {pages && pages.last_page > 1 && (
            <ReactPaginate
              previousLabel={"السابق"}
              nextLabel={"التالي"}
              breakLabel={"..."}
              pageCount={pages.last_page}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination d-flex flex-row-reverse col-12 justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Support;
