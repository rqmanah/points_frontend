import CountUp from "react-countup";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

function Analysisnumber({ title, number }: any) {
  return (
    <div className="row mb-2 bg-white border rounded-3 h-100 ">
      <div className="col-lg-12  bg-white h-100">
        <div className="d-flex justify-content-between py-3  ">
          <div className="d-flex gap-4 align-items-end   ">
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
        <div className="">
          <p
            className=" text-center  ffcario  "
            style={{ color: "#717ff5", fontSize: "50px" }}
          >
            <CountUp end={number} />
          </p>
          <a className=" pb-2 fs-4 ffcairo d-flex justify-content-center gap-2 text-muted d-block text-decoration-none">
            المزيد
            <i className="bi bi-arrow-left"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Analysisnumber;
