import { Link } from "react-router-dom";
import ProjectTables from "../../components/Table";

import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../../components/PageTitle";
import { Badge, Button, Col, Label, ModalBody, Row, Spinner } from "reactstrap";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/deleteModal";
import Popup from "../../components/popup";
import { SubmitHandler, useForm } from "react-hook-form";
import client from "../../utils/client";

function Prizes() {
  document.title = "الجوائز";
  const [prizes, setPrizes] = useState<any>([]);
  const [noData, setNoData] = useState<any>(false);
  // const [stockId, setStockId] = useState<any>("");
  const [pages, setPages] = useState<any>([]);
  const [term, setSearchTerm] = useState<any>("");
  const [notFound, setNotFound] = useState<any>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  type prize = {
    id: number;
    title: string;
    quantity: string;
    price: number;
    image: string;
    min_stock: number; // male or female
  };
  const { register } = useForm<prize>();

  const stockadd: SubmitHandler<prize> = async (data) => {
    try {
      // @ts-ignore
      await client.post(`school/manager/prize/stock/add`, data);
      toast.success("تم الاضافة  بنجاح", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error: any) {
      console.log(error);
      // const errors = error.response.data.data;
      // // Iterate through each error type
      // for (const errorType in errors) {
      //   // Iterate through each error message in the array
      //   errors[errorType].forEach((errorMessage: any) => {
      //     // Display each error message using toast notification
      //     toast.error(errorMessage, {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //   });
      // }
    }
  };
  // const minStock: SubmitHandler<prize> = async (data) => {
  //   try {
  //     // @ts-ignore
  //     await axios.post(`${apiUrl}school/manager/prize/stock/min`, data);
  //     toast.success("تم الاضافة  بنجاح", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } catch (error: any) {
  //     const errors = error.response.data.data;
  //     // Iterate through each error type
  //     for (const errorType in errors) {
  //       // Iterate through each error message in the array
  //       errors[errorType].forEach((errorMessage: any) => {
  //         // Display each error message using toast notification
  //         toast.error(errorMessage, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       });
  //     }
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await client.get(
        `school/manager/prizes`
      );
      response.data.result.data.length == 0
        ? setNoData(true)
        : setNoData(false);
      setPrizes(response.data.result.data);
      setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  const searchfetch = async () => {
    try {
      const response = await client.get(
        term != ""
          ? `school/manager/students?term=${term}`
          : `school/manager/students`
      );
      response.data.result.data.length != 0
        ? setPrizes(response.data.result.data)
        : setNotFound("غير موجود");
      setPages(response.data.result.meta);

      prizes.length == 0 ? fetchData() : prizes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteManager = async () => {
    try {
      client.delete(`school/manager/prizes/${selectedId}`).then(() => {
        toast.success("تم مسح المدير بنجاح", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        fetchData();
      });
    } catch (error) {
      console.log("error happend", error);
    }
  };
  const handlePageClick = async (data: any) => {
    try {
      const response = await client.get(
        `mcp/moderators?page=${data.selected + 1}`
      );
      setPrizes(response.data.result.data);
      setPages(response.data.result.meta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <PageTitle title={"الجوائز"} />

      <div>
        <ProjectTables
          tableTitle={"الجوائز"}
          tableDescription={"نبذة عن الجوائز"}
          buttonTitle={"اضف جائزة"}
          th1={"الأسم"}
          th2={"السعر"}
          th3={"الكمية"}
          th4={"أقل كمية"}
          th5={"العمليات"}
          textAlign="center"
          tableLink={"/prizes/add"}
          term={term}
          setSearchTerm={setSearchTerm}
          fetchData={searchfetch}
          notFound={notFound}
        >
          {prizes.length > 0 ? (
            prizes?.map((item: any, index: any) => (
              <tr key={index} className="border-top">
                <td className="text-center">{item?.title}</td>
                <td className="text-center">{item?.price}</td>
                <td className="text-center">
                  <Badge color="success" className=" col-lg-4 p-2">
                    {item?.stock}
                  </Badge>
                </td>
                <td className=" justify-content-center text-center">
                  <Badge color="danger" className=" col-lg-3 p-2">
                    {item?.min_stock}
                  </Badge>
                </td>

                <td className="  gap-2 justify-content-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/prizes/edit/${item.id}`}>
                      <Button color="primary" outline>
                        <EditIcon />
                      </Button>
                    </Link>

                    <DeleteModal
                      targetId={item.id}
                      setSelectedId={setSelectedId}
                      onClick={() => {
                        deleteManager();
                      }}
                    />
                    <Popup
                      color="success"
                      icon={"ri-add-line"}
                      title={"زيادة الكمية"}
                      // onClick={() => {
                      //   setStockId(item.id);
                      // }}
                      submitFunction={stockadd}
                    >
                      <ModalBody>
                        <Row className="p-3 rtl">
                          <Col lg={12} className="d-flex flex-column ">
                            <Label
                              for="quantity"
                              className="ffcairo text-muted fw-bold"
                            >
                              الكمية
                            </Label>
                            <input
                              type="number"
                              id="quantity"
                              placeholder=""
                              className="form-control ffcairo "
                              {...register("quantity", { required: true })}
                            />
                          </Col>
                        </Row>
                      </ModalBody>
                    </Popup>
                  </div>
                </td>
              </tr>
            ))
          ) : prizes.length == 0 && !noData ? (
            <tr className=" mt-4 ">
              <td colSpan={6} className=" text-center">
                <Spinner className="m-5" color="primary">
                  Loading...
                </Spinner>
              </td>
            </tr>
          ) : (
            <tr className=" mt-4 ">
              <td colSpan={6} className=" text-center">
                <i
                  className="ri-inbox-fill text-warning "
                  style={{ fontSize: "50px" }}
                ></i>
                <p className="fs-5 text-warning ">لايوجد بيانات حتي الأن</p>
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default Prizes;
