function CustomHeading({ avatar, title }: any) {
  return (
    <div className="custom-heading d-flex justify-content-evenly">
      <div className="custom-heading-image d-flex flex-column justify-content-center align-items-center">
        <img src={avatar} style={{ width: "31px", height: "31px" }} />
      </div>
      <p className="fs-5 mt-1">{title}</p>
    </div>
  );
}

export default CustomHeading;
