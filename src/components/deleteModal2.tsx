function DeleteModal2({ onClick, title }: any) {
  return (
    <div className="w-100">
      <button
        style={{ backgroundColor: "#FF901D" }}
        type="button"
        className="w-100 btn text-white"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {title}
      </button>
      <div className="modal fade" id="exampleModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column justify-content-center align-items-center">
              <i
                className="bi bi-exclamation-circle-fill text-danger"
                style={{ fontSize: "60px" }}
              ></i>
              <p className="fs-3 text-center">
                هل أنت متأكد من مسح هذا العنصر؟
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                اغلاق
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onClick}
              >
                مسح
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal2;
