import { t } from "i18next";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSchool,
  FaMedal,
} from "react-icons/fa";

const Services = () => {
  return (
    <section className="">
      <div className="text-center ">
        {/* <p className="m-0 p-0 text-info fw-bolder">{t("services")}</p> */}
        <h2 className=" m-0 fw-bolder text-dark">{t("point services")}</h2>
      </div>
      <div className="row m-0 mt-4">
        <div className="col-md-3 p-5 d-flex flex-column justify-content-center align-items-center primary-bgColor ">
          <p>
            <FaChalkboardTeacher className="fs-1 text-white" />{" "}
          </p>
          <h4 className="text-white text-center">{t("teacher control grades")}</h4>
          <p className="text-center text-white">
            {t("teachers can manage student levels, control grades, and provide guidance effectively.")}
          </p>
        </div>
        <div
          className="col-md-3 p-5 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "#0d1128 ",
          }}
        >
          <p>
            <FaUserGraduate className="fs-1 text-white" />
          </p>
          <h4 className="text-white text-center">{t("student grades behavior")}</h4>
          <p className="text-center text-white">
            {t("students can monitor their results, track positive and negative behaviors, and know their ranking among the top students.")}
          </p>
        </div>
        <div className="col-md-3 p-5 d-flex flex-column justify-content-center align-items-center primary-bgColor ">
          <p>
            <FaSchool className="fs-1 text-white" />
          </p>
          <h4 className="text-white text-center">{t("communication between students and teachers")}</h4>
          <p className="text-center text-white">
            {t("a platform that facilitates effective communication between students and teachers to monitor performance and academic progress.")}
          </p>
        </div>
        <div
          className="col-md-3 p-5 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "#0d1128 ",
          }}
        >
          <p>
            <FaMedal className="fs-1 text-white" />
          </p>
          <h4 className="text-white text-center">{t("student ranking")}</h4>
          <p className="text-center text-white">
            {t("students can track their academic ranking among the top students and compete to achieve the best results.")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
