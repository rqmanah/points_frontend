import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
function CustomModal({ clickTitle, title1, title2, avatar }: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="w-100">
      <div className="pointer " onClick={toggle}>
        {clickTitle}
      </div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-bottom-0"></ModalHeader>
        <ModalBody className="d-flex flex-column  align-items-center">
          {avatar && <img src={avatar} />}
          {title1 && <p className="fs-3 ffcairo fw-bold"> {title1}</p>}
          {title2 && (
            <p className="fs-4 text-danger text-center w-100 ffcairo fw-bold">
              {title2}
            </p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CustomModal;
