import { ReactNode } from "react";
import { Modal, ModalBody } from "reactstrap";

export function GenericInfoModal({
  open,
  setOpen,
  modalTitle,
  content,
  className,
  hideAcceptButton,
  hideCloseButton,
}: {
  open: boolean;
  setOpen: Function;
  modalTitle: string;
  content: string | ReactNode;
  className: string;
  hideAcceptButton?: boolean;
  hideCloseButton?: boolean;
}) {
  return (
    <Modal className={className} isOpen={open} toggle={() => setOpen(!open)}  centered >
      {hideCloseButton && (
        <div className="d-flex justify-content-between px-3 pt-2  border border-top-0 border-end-0 border-start-0">
          <i
            className="bi bi-x-lg fs-4"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          ></i>

          <p className="fs-4 text-start fw-bold text-muted ">{modalTitle}</p>
        </div>
      )}

      <ModalBody>
        <div className="text-center my-5">{content}</div>
        {!hideAcceptButton && (
          <div className="w-100 text-center">
            <button
              style={{ backgroundColor: "#0077B6" }}
              type="button"
              className="w-25 btn text-white px-2 py-1"
              onClick={() => setOpen(!open)}
            >
              موافق
            </button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}
