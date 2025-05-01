function CustomHeadingShow({
  avatar,
  title,
  description,
  descriptionClass,
  titleClass,
}: any) {
  return (
    <div className="custom-heading-show d-flex justify-content-evenly">
      <div className="custom-heading-show-image d-flex flex-column justify-content-center align-items-center">
        <img src={avatar} />
      </div>
      <p className=" d-flex  justify-content-center">
        <p className={descriptionClass} style={{ color: "#0B9F08" }}>
          {description}
        </p>{" "}
        : <p className={titleClass}>{title}</p>
      </p>
    </div>
  );
}

export default CustomHeadingShow;
