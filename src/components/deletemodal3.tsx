import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
} from "reactstrap";
//@ts-ignore
import modalImage from "../assets/modaluser.png";
import AlertMan from "./icons/AlertMan";

function DeleteModal3({ onClick, title ,text }: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="w-100 mb-2">
      <button
        style={{ backgroundColor: "#FF901D" }}
        type="button"
        className="w-100 btn text-white"
        onClick={toggle}
      >
        {title}
      </button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody>
          <div className="modal-body d-flex flex-column justify-content-center align-items-center">
            {/* <img src={modalImage} /> */}
            <AlertMan />
            <p className="fs-3 text-center">
              {text ? text :"هل أنت متأكد من مسح هذا العنصر؟"}
              </p>
          </div>
          <Row className=" w-100 justify-content-center ">
            <Col lg={4}>
              <button
                style={{ backgroundColor: "#FF4F4F" }}
                className="btn  w-100 p-3 text-white fw-bold "
                onClick={toggle}
              >
                لا
              </button>
            </Col>
            <Col lg={4}>
              <button
                style={{ backgroundColor: "#71A000" }}
                className="btn  w-100 p-3 text-white fw-bold"
                onClick={() => {
                  toggle();
                  onClick();
                }}
              >
                نعم
              </button>
            </Col>
          </Row>
        </ModalBody>
     
      </Modal>
    </div>
  );
}

export default DeleteModal3;
