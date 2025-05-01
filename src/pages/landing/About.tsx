import { t } from "i18next";
import React from "react";
import { useIsRTL } from "../../hooks/useIsRTL";

function About({ data }) {
  const isRTL = useIsRTL();
  return (
    <div>
      <div className="text-center ">
        {/* <p className="m-0 p-0 text-info fw-bolder">{t("Point")}</p> */}
        <h2 className=" m-0 fw-bolder text-dark">{t("About us")}</h2>
      </div>
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          {/* <h1 className=" fw-bolder">{t("About us")}</h1> */}
          <p>
            {isRTL
              ? data?.result?.data?.about_ar
              : data?.result?.data?.about_en}
          </p>
        </div>
        <div className="col-md-6">
          <img src="/about.png" className="img-fluid rounded-3" alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
