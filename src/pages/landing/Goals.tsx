import React from "react";
import { useIsRTL } from "../../hooks/useIsRTL";
import { t } from "i18next";

function Goals() {
  const isRTL = useIsRTL();

  return (
    <div>
      <div className="text-center ">
        {/* <p className="m-0 p-0 text-info fw-bolder">{t("Point")}</p> */}
        <h2 className=" m-0 fw-bolder text-dark">{t("Goals")}</h2>
      </div>
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          {/* <h1 className=" fw-bolder">{t("Goals")}</h1> */}
          {isRTL ? (
            <p>
              تحويل البيئات التعليميه الى بيئات تنافسيه محفزه لا تعتمد على قياس
              المستوى التعليمي فقط بل حتى المستوى السلوكي
            </p>
          ) : (
            <p>
              Transforming educational environments into competitive and
              motivating environments that do not depend on measuring only the
              educational level, but even the behavioral level.
            </p>
          )}
        </div>
        <div className="col-md-6">
          <img src="/goals.png" className="img-fluid rounded-3" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Goals;
