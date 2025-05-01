import React from "react";
import { useIsRTL } from "../../hooks/useIsRTL";
import { t } from "i18next";
import {
  BsCheckCircle,
  BsBarChart,
  BsLightbulb,
  BsTrophy,
  BsExclamationCircle,
} from "react-icons/bs"; // Importing icons

function WhatAddedYou() {
  const isRTL = useIsRTL();

  return (
    <div>
      <div className="text-center">
        {/* <p className="m-0 p-0 text-info fw-bolder">{t("Point")}</p> */}
        <h2 className="m-0 fw-bolder text-dark">{t("What added you")}</h2>
      </div>
      <div className="row row-cols-1 row-cols-md-5 mt-4">
        {/* First Card */}
        <div className="mb-3 card-animation ">
          <div
            className="card p-3 shadow-sm d-flex flex-column align-items-center gap-2 text-center"
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <BsBarChart className="me-2 fs-1 text-primary" />
            <p className="m-0">
              {isRTL
                ? "رفع التحصيل الدراسي لدى الطلاب"
                : "Improve student academic performance"}
            </p>
          </div>
        </div>

        {/* Second Card */}
        <div className="mb-3 card-animation ">
          <div
            className="card p-3 shadow-sm d-flex flex-column align-items-center gap-2 text-center"
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <BsLightbulb className="me-2 fs-1 text-warning" />
            <p className="m-0">
              {isRTL
                ? "تحفيز الطلاب على تعديل السلوكيات"
                : "Encourage students to modify behaviors"}
            </p>
          </div>
        </div>

        {/* Third Card */}
        <div className="mb-3 card-animation ">
          <div
            className="card p-3 shadow-sm d-flex flex-column align-items-center gap-2 text-center"
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <BsExclamationCircle className="me-2 fs-1 text-danger" />
            <p className="m-0">
              {isRTL
                ? "الكشف عن الظواهر السلوكية وسرعة معالجتها"
                : "Identify and quickly address behavioral phenomena"}
            </p>
          </div>
        </div>

        {/* Fourth Card */}
        <div className="mb-3 card-animation ">
          <div
            className="card p-3 shadow-sm d-flex flex-column align-items-center gap-2 text-center"
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <BsTrophy className="me-2 fs-1 text-success" />
            <p className="m-0">
              {isRTL
                ? "خلق بيئة تنافسية بين الطلاب على المستويين التربوي و التعليمي"
                : "Create a competitive environment among students on both educational and pedagogical levels"}
            </p>
          </div>
        </div>

        {/* Fifth Card */}
        <div className="card-animation ">
          <div
            className="card p-3 shadow-sm d-flex flex-column align-items-center gap-2 text-center"
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <BsCheckCircle className="me-2 fs-1 text-info" />
            <p className="m-0">
              {isRTL
                ? "زيادة الانضباط المدرسي"
                : "Increase school discipline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatAddedYou;
