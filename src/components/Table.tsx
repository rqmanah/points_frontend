import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
//@ts-ignore

const ProjectTables = ({
  tableTitle,
  buttonTitle,
  uploadTitle,
  uploadLink,
  tableDescription,
  textAlign,
  th1,
  th2,
  th3,
  th4,
  th5,
  th6,
  th7,
  th8,
  th9,
  th10,
  th11,
  tableLink,
  term,
  setSearchTerm,
  fetchData,
  notFound,
  children,
  buttonTitleClass,
  buttonTitleContainerClass,
  data
}: any) => {
  console.log("🚀 ~ data:", data)
  return (
    <div className="ffcairo">
      {buttonTitle && (
        <Col
          lg={12}
          sm={12}
          xs={12}
          className={`d-flex ${
            buttonTitleContainerClass
              ? buttonTitleContainerClass
              : "justify-content-center"
          } gap-2 my-3`}
        >
          {uploadTitle && (
            <div>
              {uploadLink && (
                <Link
                  to={uploadLink}
                  className=" ffcairo btn btn-outline-primary fw-bold rounded-3"
                >
                  <i className="bi bi-upload ms-1 "></i>
                  <span className="ffcairo">{uploadTitle}</span>
                </Link>
              )}

              {!uploadLink && (
                <Button>
                  <i className="bi bi-upload ms-1"></i>

                  <span className="ffcairo">{uploadTitle}</span>
                </Button>
              )}
            </div>
          )}
          {tableLink && (
            <Link
              to={tableLink}
              className={`ffcairo  btn ${
                buttonTitleClass ? buttonTitleClass : "btn-outline-primary"
              }  fw-bold rounded-3`}
            >
              <AddIcon />
              <span className="ffcairo">{buttonTitle}</span>
            </Link>
          )}

          {!tableLink && (
            <Button className=" ffcairo  btn  border-0 btn-outline-primary  fw-bold rounded-3">
              <AddIcon />
              <span className="ffcairo">{buttonTitle}</span>
            </Button>
          )}
        </Col>
      )}
      <Card>
        <CardBody>
          <CardTitle tag="h5">
            <Row>
              <Col lg={8} sm={6} xs={6} className="fw-bold ffcairo ">
                <span className="ffcairo">{tableTitle}</span>
              </Col>

              <Col xl={9} className=" mt-2 align-self-center">
                <CardSubtitle className="mb-2 text-muted ffcairo" tag="h6">
                  {tableDescription}
                </CardSubtitle>
              </Col>
              <Col
                xl={3}
                className="position-relative d-flex   align-self-start mt-2 "
              >
                <label htmlFor="exampleDataList" className="form-label"></label>
                <input
                  className="form-control top-0 start-0"
                  style={{ width: "70%" }}
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="ابحث هنا..."
                  value={term}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                ></input>
                <i
                  onClick={fetchData}
                  className="bi bi-search position-relative"
                  style={{ top: "10px", left: "30px" }}
                ></i>
                <Button className="" onClick={fetchData}>
                  بحث
                </Button>
              </Col>
              {term != ""  && notFound && (
                <div className="d-flex gap-2">
                  <i className="bi bi-exclamation-circle-fill text-danger"></i>
                  <p className="text-danger">{notFound}</p>
                </div>
              )}
            </Row>
          </CardTitle>

          <Table
            className="no-wrap mt-3 align-middle table-bordered"
            responsive
            borderless
          >
            <thead>
              <tr>
                {
                  <th
                    className="ffcairo"
                    style={
                      textAlign
                        ? {
                            textAlign: textAlign,
                            backgroundColor: "#0077B6",
                            color: "#fff",
                          }
                        : { backgroundColor: "#0077B6", color: "#fff" }
                    }
                  >
                    {th1}
                  </th>
                }
                {th2 && (
                  <th
                    className="ffcairo"
                    style={
                      textAlign
                        ? {
                            textAlign: textAlign,
                            backgroundColor: "#0077B6",
                            color: "#fff",
                          }
                        : { backgroundColor: "#0077B6", color: "#fff" }
                    }
                  >
                    {th2}
                  </th>
                )}

                {th3 && (
                  <th
                    className="ffcairo "
                    style={
                      textAlign
                        ? {
                            textAlign: textAlign,
                            backgroundColor: "#0077B6",
                            color: "#fff",
                          }
                        : { backgroundColor: "#0077B6", color: "#fff" }
                    }
                  >
                    {th3}
                  </th>
                )}
                {th4 && (
                  <th
                    className="ffcairo "
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th4}
                  </th>
                )}
                {th5 && (
                  <th
                    className="ffcairo  "
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th5}
                  </th>
                )}
                {th6 && (
                  <th
                    className="ffcairo "
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th6}
                  </th>
                )}
                {th7 && (
                  <th
                    className="ffcairo  "
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th7}
                  </th>
                )}
                {th8 && (
                  <th
                    className="ffcairo text-end"
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th8}
                  </th>
                )}
                {th9 && (
                  <th
                    className="ffcairo text-end"
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th9}
                  </th>
                )}

                {th10 && (
                  <th
                    className="ffcairo text-end"
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th10}
                  </th>
                )}

                {th11 && (
                  <th
                    className="ffcairo text-end"
                    style={{
                      textAlign: textAlign,
                      backgroundColor: "#0077B6",
                      color: "#fff",
                    }}
                  >
                    {th11}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
