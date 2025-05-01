import { Button } from "reactstrap";
import DeleteIcon from "./icons/DeleteIcon";
import AlertMan from "./icons/AlertMan";
function DeleteModal({
  deleteStudent,
  targetId,
  setSelectedId,
}: {
  deleteStudent: any;
  targetId: number;
  setSelectedId: any;
}) {
  return (
    <div>
      <Button
        color="danger"
        outline
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setSelectedId(targetId)}
        style={{
          border: "0px solid",
          padding: "0",
        }}
      >
        <DeleteIcon />
      </Button>
      <div className="modal fade" id="exampleModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content  rounded-5 ">
            <div className="modal-body d-flex flex-column justify-content-center align-items-center position-relative ">
              <div
                className="modal-header border-0 position-absolute"
                style={{
                  top: "0",
                  left: "0",
                }}
              >
                <h1 className="modal-title fs-5 " id="exampleModalLabel"></h1>
                <button
                  type="button"
                  className="btn-close "
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <AlertMan />
              <p className="fs-3 text-center m-0 mt-3 fw-700">
                هل أنت متاكد من حذف البيانات{" "}
              </p>
            </div>
            <div className="modal-footer border-0 justify-content-center pt-1">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => deleteStudent({ids:[targetId]})}
                style={{
                  backgroundColor: "#71A000",
                  border: "0px solid",
                  width: "108px",
                  height: "50px",
                  fontSize: "18px",
                }}
              >
                نعم
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => onClick()}
                style={{
                  backgroundColor: "#FF4F4F",
                  border: "0px solid",
                  width: "108px",
                  height: "50px",
                  fontSize: "18px",
                }}
              >
                لا
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
