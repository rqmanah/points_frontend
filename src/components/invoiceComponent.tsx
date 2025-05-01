import InvoiceRow from "./invoiceRow";
//@ts-ignore
import code from "../assets/code.png";
import invoices from "../data/invoices";
function InvoiceComponent({ id }: any) {
  const currentInvoice = invoices.filter((invoice) => invoice.id == id);

  return (
    <div className="invoice w-100">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <p className="fs-3 fw-bold ffcairo">الفاتورة</p>
        <p className="fs-3 fw-bold ffcairo">منصة بوينت</p>
      </div>

      <InvoiceRow title={"اسم المدرسة"} detail={currentInvoice[0]?.name} />
      <InvoiceRow
        title={"رقم الفاتورة"}
        detail={currentInvoice[0]?.invoice_id}
      />
      <InvoiceRow
        title={"السجل الضريبي"}
        detail={currentInvoice[0]?.commercialFile}
      />
      <InvoiceRow
        title={"نوع الباقة"}
        detail={currentInvoice[0]?.packageType}
      />
      <InvoiceRow title={"القيمة"} detail={currentInvoice[0]?.price} />
      <InvoiceRow title={"الضريبة"} detail={currentInvoice[0]?.tax} />
      <div
        className="w-100  p-4 d-flex justify-content-between"
        style={{ border: "1px solid black", borderRadius: "0px 0px 10px 10px" }}
      >
        <p className="fw-bold ffcairo fs-lg-4 fs-5">ع.ر 552</p>
        <p className="fw-bold ffcairo fs-lg-4 fs-5">إجمالي الفاتورة</p>
      </div>
      <div className="d-flex justify-content-center">
        <div className="my-4">
          <img src={code} />
        </div>
      </div>
    </div>
  );
}

export default InvoiceComponent;
