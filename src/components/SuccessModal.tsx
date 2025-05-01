import { Modal, ModalBody } from "reactstrap";
import SuccessMan from "./icons/SucessMan";
import { useNavigate } from "react-router-dom";

type SuccessModal_TP = {
  text: string;
  isOpen: boolean;
  toggle: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subText?: string;
  actionClose?: () => void;
  updatePackage?:boolean
};
function SuccessModal({
  text,
  isOpen,
  toggle,
  setOpen,
  subText,
  actionClose,
  children,
  updatePackage
}: SuccessModal_TP) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody>
        <div className="modal-body d-flex flex-column justify-content-center align-items-center">
          <SuccessMan text={text} />
          {subText && (
            <p
              style={{
                color: "#C32026",
                fontSize: "20px",
                fontWeight: "700",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span>{subText}</span>
            </p>
          )}
          <div>{children}</div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={actionClose ? actionClose : () => setOpen(false)}
              style={{
                backgroundColor: "#a7c957",
                border: "0px solid",
                width: "108px",
                height: "50px",
                fontSize: "18px",
              }}
            >
              تم
            </button>
            {
              updatePackage && 
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => navigate("/packages")}
              style={{
                backgroundColor: "#a7c957",
                border: "0px solid",
                width: "108px",
                height: "50px",
                fontSize: "18px",
                margin: "0 10px",
              }}
            >
              ترقية الباقة
            </button>
            }
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default SuccessModal;
