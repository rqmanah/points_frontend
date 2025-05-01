import React from "react";
import { useIsRTL } from "../hooks/useIsRTL";
import { MdLanguage } from "react-icons/md";
import i18n from "../i18n";

function LngSetting() {
  const isRTL = useIsRTL();

  const toggleLanguage = () => {
    const newLang = isRTL ? "en" : "ar";
    i18n.changeLanguage(newLang);
    const direction = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = newLang;
  };
  return (
    <div>
      <button type="button" onClick={toggleLanguage} className="border-0 bg-transparent">
        <MdLanguage
          className="border-0"
          style={{
            width: "30px",
            height: "30px",
            color: "gray",
          }}
        />
      </button>
    </div>
  );
}

export default LngSetting;
