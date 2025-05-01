import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  UncontrolledDropdown,
} from "reactstrap";

function Analysiscomp() {
  return (
    <div className="row mb-2 bg-white rounded-3 h-100 ">
      <div className="col-lg-12 ">
        <div className="d-flex justify-content-between flex-wrap py-3 border border-top-0 border-end-0 border-start-0">
          <div className="d-flex flex-wrap gap-4 align-items-end  ">
            <span className="fs-5 ffcairo text-muted   ">النقاط الاكثر </span>
            <span className="ffcairo rounded p-1 bg-primary text-white">
              التحاق
            </span>
          </div>
          <hr />
          <div>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                style={{ backgroundColor: "#717ff5", border: "none" }}
                className="fw-bold ffcairo"
              >
                <span className="ffcairo">طوال الوقت</span>
              </DropdownToggle>
              <DropdownMenu light>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center ">
          <div className="row mt-3 d justify-content-center  ">
            <div className="col-lg-4 ffcairo  text-center text-muted fs-5 align-self-center ">
              طرق التدريس الحديثة
            </div>
            <div className="col-lg-8 mt-2">
              <Progress value={50} />
              <br></br>
              <Progress color="danger" value={80} />
            </div>
          </div>
          <hr />
          <div className="row mt-3 d justify-content-center  ">
            <div className="col-lg-4 ffcairo  text-center text-muted fs-5 align-self-center ">
              عدد النقاط المكتسبة
            </div>
            <div className="col-lg-8 mt-2">
              <Progress value={50} />
              <br></br>
              <Progress color="danger" value={80} />
            </div>
          </div>
          <hr />
          <div className="row mt-3 d justify-content-center  ">
            <div className="col-lg-4 ffcairo  text-center text-muted fs-5 align-self-center ">
              العدد الكلي للنقاط المكتسبة
            </div>
            <div className="col-lg-8 mt-2">
              <Progress value={50} />
              <br></br>
              <Progress color="danger" value={80} />
            </div>
          </div>
          <hr />
          <div className="row mt-3 d justify-content-center  ">
            <div className="col-lg-4 ffcairo  text-center text-muted fs-5 align-self-center ">
              العدد الفعلي للنقاط المكتسبة
            </div>
            <div className="col-lg-8 mt-2">
              <Progress value={50} />
              <br></br>
              <Progress color="danger" value={80} />
            </div>
          </div>
          <hr />
          <div className="row mt-3 d justify-content-center  ">
            <div className="col-lg-4 ffcairo  text-center text-muted fs-5 align-self-center ">
              عدد النقاط المدفوعه
            </div>
            <div className="col-lg-8 mt-2">
              <Progress value={50} />
              <br></br>
              <Progress color="danger" value={80} />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Analysiscomp;
