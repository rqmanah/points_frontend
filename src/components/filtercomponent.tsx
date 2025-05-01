import CountUp from "react-countup";
function FilterComponent({
  title,
  number,
  bgColor,
  borderColor,
  textColor,
  titleColor,
}: any) {
  return (
    <div
      className="border p-3 d-flex justify-content-center gap-2 "
      style={{
        borderRadius: "15px",

        backgroundColor: bgColor,
      }}
    >
      <div
        className="border fw-bold d-flex justify-content-center align-items-center "
        style={{
          width: "33px",
          height: "33px",
          borderRadius: "50%",
          border: borderColor,
          color: textColor,
        }}
      >
        <CountUp end={number} />
      </div>
      <p className="fw-bold fs-5 ffcairo" style={{ color: titleColor }}>
        {title}
      </p>
    </div>
  );
}

export default FilterComponent;
