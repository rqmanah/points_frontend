import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import PieChartComponent2 from "./pieChart2";

function AnalysisChart2({ title }: any) {
  return (
    <div className="row mb-2 bg-white rounded-3 ">
      <div className="col-lg-12 bg-white ">
        <div className="d-flex justify-content-between py-3  ">
          <div className="d-flex gap-4 align-items-end  ">
            <span className="fs-5 ffcairo text-muted   ">{title} </span>
          </div>
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
        <div className=" row  ">
          <div className="col-lg-12">
            <PieChartComponent2 />
          </div>
          <div className="col-lg-6 ffcairo d-flex gap-1 ">
            <i className="bi bi-circle-fill" style={{ color: "#717ff5" }}></i>
            <p> المبيعات</p>
          </div>
          <div className="col-lg-6 ffcairo text-start ">
            <p className="text-muted">35000</p>
          </div>
          <hr />
          <div className="col-lg-6 ffcairo d-flex gap-1 ">
            <i className="bi bi-circle-fill" style={{ color: "#7469B6" }}></i>
            <p>الصافي</p>
          </div>
          <div className="col-lg-6 ffcairo text-start  ">
            <p className="text-muted">20000</p>
          </div>
          <hr />
          <div className="col-lg-6 ffcairo d-flex gap-1 ">
            <i className="bi bi-circle-fill" style={{ color: "#AD88C6" }}></i>
            <p>كود الخصم</p>
          </div>
          <div className="col-lg-6 ffcairo text-start  ">
            <p className="text-muted">5000</p>
          </div>
          <hr />
          <div className="col-lg-6 ffcairo d-flex gap-1 ">
            <i className="bi bi-circle-fill" style={{ color: "#E1AFD1" }}></i>
            <p>الضريبة </p>
          </div>
          <div className="col-lg-6 ffcairo text-start  ">
            <p className="text-muted">8000</p>
          </div>
          <hr />
          <div className="col-lg-6 ffcairo d-flex gap-1 ">
            <i className="bi bi-circle-fill" style={{ color: "#FFA62F" }}></i>
            <p>شركة المدفوعات </p>
          </div>
          <div className="col-lg-6 ffcairo text-start  ">
            <p className="text-muted">7000</p>
          </div>
        </div>
        <p className="justify-content-center fs-4 ffcairo text-muted d-flex gap-2">
          المزيد
          <i className="bi bi-arrow-left"></i>
        </p>
      </div>
    </div>
  );
}

export default AnalysisChart2;
