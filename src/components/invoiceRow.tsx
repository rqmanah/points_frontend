function InvoiceRow({ title, detail }: any) {
  return (
    <div className="d-flex justify-content-between px-4">
      <p className="fs-lg-5 fs-6 fw-bold ffcairo" style={{ color: "#A7C957" }}>
        {detail}
      </p>
      <p className="fs-lg-5 fs-6 fw-bold ffcairo">{title}</p>
    </div>
  );
}

export default InvoiceRow;
