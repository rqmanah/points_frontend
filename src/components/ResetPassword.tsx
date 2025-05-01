import React, { useState } from "react";
import { Button, Modal, ModalBody, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ResetPasswordProps {
  resetPassword: (data: {
    password: string;
    password_confirmation: string;
  }) => void;
  targetId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  student_id: number;
  loadingSubmit: boolean;
  teacher_id?: string;
  modalResetPassword: boolean;
  setModalResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResetPassword({
  resetPassword,
  targetId,
  setSelectedId,
  student_id,
  loadingSubmit,
  teacher_id,
  modalResetPassword,
  setModalResetPassword,
}: ResetPasswordProps) {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; password_confirmation: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const toggle = () => setModalResetPassword(!modalResetPassword);

  const onSubmit = (data: {
    password: string;
    password_confirmation: string;
    student_id: number;
  }) => {
    resetPassword({
      ...data,
      teacher_id: student_id ? null : teacher_id,
      student_id: teacher_id ? null : student_id,
    });
  };

  return (
    <div>
      {/* <Button
        outline
        type="button"
        style={{
          border: "0px solid",
          backgroundColor: "#707070",
          color: "white",
          borderRadius: "181.43px",
          width: "162px",
          height: "41px",
          padding: "8px 15px",
        }}
        onClick={() => {
          setSelectedId(targetId);
          setModalResetPassword(true);
        }}
      >
        <p style={{ margin: "0" }}>تهيئة كلمة المرور</p>
      </Button> */}

      <Modal isOpen={modalResetPassword} toggle={toggle} centered>
        <ModalBody>
          <div className="modal-body d-flex flex-column justify-content-center align-items-center position-relative">
            <p
              className="modal-title fs-2 mb-3  fw-700 text-center"
              style={{ color: "#0077B6" }}
            >
              تهيئة كلمة المرور
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column justify-content-center align-items-center w-100 "
            >
              <div className="mb-3 w-100 position-relative">
                <label
                  htmlFor="password"
                  className="text-end d-block font-size-16 mb-2 fw-700 fs-5"
                >
                  كلمة المرور الجديدة
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  style={{ backgroundColor: "#EEF1F5", borderRadius: "12px" }}
                  className="form-control text-end p-3"
                  placeholder="كلمة المرور الجديدة"
                  {...registerForm("password", { required: true })}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "58%",
                    left: "15px",
                    // transform: "translate(-50% )",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && (
                  <p className="text-end text-danger">
                    برجاء إدخال كلمة المرور الجديدة
                  </p>
                )}
              </div>

              <div className="mb-3 w-100 position-relative">
                <label
                  htmlFor="password_confirmation"
                  className="text-end d-block font-size-16 mb-2 fw-700 fs-5"
                >
                  تاكيد كلمة المرور
                </label>
                <input
                  id="password_confirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  style={{ backgroundColor: "#EEF1F5", borderRadius: "12px" }}
                  className="form-control text-end p-3"
                  placeholder="تاكيد كلمة المرور"
                  {...registerForm("password_confirmation", {
                    required: true,
                  })}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "58%",
                    left: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password_confirmation && (
                  <p className="text-end text-danger">
                    برجاء إدخال تاكيد كلمة المرور
                  </p>
                )}
              </div>

              <div className="modal-footer border-0 justify-content-center pt-1">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{
                    backgroundColor: "#71A000",
                    border: "0px solid",
                    width: "108px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                >
                  {loadingSubmit ? <Spinner /> : "حفظ"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => setModalResetPassword(false)}
                  style={{
                    backgroundColor: "#FF4F4F",
                    border: "0px solid",
                    width: "108px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                >
                  الغاء
                </button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ResetPassword;
