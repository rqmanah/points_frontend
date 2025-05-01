import React from "react";
import { t } from "i18next"; // تأكد من استيراد دالة الترجمة

function SubsLanding() {
  // دالة للتحقق من حجم الشاشة
  const getFontSize = () => {
    return window.innerWidth <= 768 ? "18px" : "70px";
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between px-5 text-white rounded-5 py-5 text-center"
        style={{
          background: "linear-gradient(90deg, #0C3580, #1BBBCF)",
        }}
      >
        <div className="">
          <h1
            className=""
            style={{
              fontSize: getFontSize(),
            }}
          >
            +12000
          </h1>
          <p className="fs-5">{t("teacher")}</p> {/* ترجمة "معلم" */}
        </div>
        <div>
          <h1
            style={{
              fontSize: getFontSize(),
            }}
          >
            +3000
          </h1>
          <p className="fs-5">{t("student")}</p> {/* ترجمة "طالب" */}
        </div>
        <div>
          <h1
            style={{
              fontSize: getFontSize(),
            }}
          >
            +4000
          </h1>
          <p className="fs-5">{t("female student")}</p> {/* ترجمة "طالبة" */}
        </div>
      </div>
    </div>
  );
}

export default SubsLanding;
