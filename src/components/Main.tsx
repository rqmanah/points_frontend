import LayoutIcon from "./icons/LayoutIcon";
import "./main.css";
import { Outlet } from "react-router";

function Main({ active }: any) {
  return (
    <>
      {active && (
        <div id="main" className="main position-relative ">
          <Outlet />
          {/* <div className="position-absolute" style={{ left: "5px"  , bottom:"-8rem" }}>
            <div >
              <LayoutIcon />
            </div>
          </div> */}
        </div>
      )}
      {!active && (
        <div id="main2" className="main ">
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Main;
