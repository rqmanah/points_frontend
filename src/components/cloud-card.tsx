import CountUp from "react-countup";
import { Card } from "reactstrap";
function CloudCard({ title, points, className, onClick }: any) {
  return (
    <Card
      className={`${className ?? "bg-white"} shadow-sm  p-4`}
      onClick={() => onClick && onClick()}
      style={{ borderRadius: "32.57px" }}
    >
      <div
        className="fw-400 ffcairo fs-2 text-end me-3 text-center"
        style={{
          fontSize: "33.69px",
        }}
      >
        {<CountUp end={points} />}
      </div>
      {title && (
        <div
          className="fs-5 fw-bold  ffcairo  me-2 text-center text-muted"
          style={{ fontSize: "20px" }}
        >
          {title}
        </div>
      )}

      {/* {icon && (
        <div className=" d-flex justify-content-end">
          <div
            className="border ms-2  shadow-sm rounded-2 d-flex flex-column justify-content-center align-items-center "
            style={{ width: "60px", height: "60px" }}
          >
            <i
              className={icon}
              style={{ color: "#717ff5", fontSize: "24px" }}
            ></i>
          </div>
        </div>
      )} */}
    </Card>
  );
}

export default CloudCard;
