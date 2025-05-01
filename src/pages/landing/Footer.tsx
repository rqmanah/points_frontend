import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
import footerImage from "../../assets/footerImage.png";

function Footer() {
  const location = useLocation();
  return (
    <div
      className="ffcairo"
      style={{
        backgroundColor: "#0077B6",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        padding: location?.pathname == "/" ? "20px 10px" : "10px",
        position: "relative",
        zIndex: "999",
        flexDirection: "column",
      }}
    >
      <div
        className="img-cont imgFooter"
        style={{
          position: "absolute",
          top: location?.pathname == "/" ? "20%" : "-30%",
          left: "10px",
          width: "100%",
          maxWidth: "7rem",
        }}
      >
        <img src={footerImage} style={{ width: "100%", height: "auto" }} />
      </div>
      <div className="flex-grow-1 text-center mb-3">
        {t("All rights reserved to Point Platform 2025")}
      </div>
      {location?.pathname == "/" && (
        <div className="d-flex justify-content-center">
          <Link
            to="/privacy-policy"
            style={{ color: "#fff", marginRight: "10px" }}
          >
            {t("Privacy Policy")}
          </Link>
          <span style={{ margin: "0 5px" }}>|</span>
          <Link to="/terms" style={{ color: "#fff", marginLeft: "10px" }}>
            {t("Terms of Service")}
          </Link>
        </div>
      )}
      <div className="d-flex gap-2">
        <span className="p-0">{t("Developed by")}</span>
        <Link
          to={"http://soft-lab-tech.com"}
          className="fw-bolder"
          style={{ color: "#fff" }}
          target="_blank"
        >
          Soft Lab
        </Link>
      </div>
    </div>
  )
}

export default Footer;
