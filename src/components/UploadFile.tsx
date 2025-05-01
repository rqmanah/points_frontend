import { Label } from "reactstrap";
import bgImage from "../assets/image_bg.png";

function UploadFile({ action, label }) {
  return (
    <div
      className="d-flex flex-column gap-2 px-1 h-100"
      style={{ minHeight: "134px" }}
    >
      <Label for="title" className="ffcairo mb-0 ">
        {label}
      </Label>

      <div
        className="input-group d-flex flex-row-reverse h-100"
        style={{
          border: "1px dashed #6D6D6D",
          borderRadius: "6px",
          position: "relative",
          minHeight: "134px",
          cursor: "pointer",
          zIndex:"2"
        }}
      >
        <input
          type="file"
          className=" ffcairo text-end "
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          style={{ opacity: "0", width: "100%", cursor: "pointer" }}
          aria-label="Upload"
          name="myImage"
          accept="image/png, image/jpeg, image/jpg"
          onChange={action}
        />
        <div
          className="position-absolute "
          style={{ backgroundColor: "white", left: "45%", top: "35%" ,zIndex:"1" }}
        >
          <img src={bgImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
