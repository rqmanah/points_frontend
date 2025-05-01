import { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

function Popup({ color, icon, submitFunction, children, onClick, title }: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color={color}
        outline
        onClick={() => {
          toggle();
          onClick();
        }}
      >
        <i className={icon}></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className=" text-muted">
          {title}
        </ModalHeader>
        {children}
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              submitFunction();
            }}
          >
            تحديث
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            الغاء
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Popup;
