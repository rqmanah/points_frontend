import { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

function ModalDetails({
  children,
  modalTitle,
  buttonTitle,
  buttonColor,
  buttonIcon,
}: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color={buttonColor} outline onClick={toggle}>
        {<i className={buttonIcon}></i>}
        {buttonTitle}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="d-flex justify-content-between px-3 pt-2  border border-top-0 border-end-0 border-start-0">
          <i
            className="bi bi-x-lg fs-4"
            onClick={toggle}
            style={{ cursor: "pointer" }}
          ></i>

          <p className="fs-4 text-start fw-bold text-muted ">{modalTitle}</p>
        </div>

        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
}

export default ModalDetails;
