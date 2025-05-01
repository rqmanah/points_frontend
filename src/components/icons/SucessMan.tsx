import React from "react";
import modalImage from "../../assets/modaluser.png";

export default function SuccessMan({ text }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={modalImage} alt="" />
      <p className="fs-3 text-center">{text}</p>
    </div>
  );
}
