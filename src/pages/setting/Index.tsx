import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { useMutate } from "../../hooks/useMutate";
import SupportIcon from "../../components/icons/SupportIcon";
import noteIcon from "../../assets/sidebar/image 4.png";
import SuccessMan from "../../components/icons/SucessMan";
import SuccessModal from "../../components/SuccessModal";

function Setting() {
  type Inputs = {
    store_name: string;
    store_activation: 1 | 0;
    store_description: string;
    store_rules: string;
    store_message: string;
  };

  const endpoint = `school/manager/store/edit`;
  const {
    data: settingData,
    isPending,
    refetch,
  } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  });

  const { mutate: handelSubmit, isPending: loadingSubmit } = useMutate({
    mutationKey: ["school/manager/store/update"],
    endpoint: `school/manager/store/update`,
    onSuccess: () => {
      setModal(true)
      refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
    formData: true,
  });
  const [modal, setModal] = useState(false);
  const toggle = ()=> setModal(!modal);

  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  // Populate form fields with fetched data when available
  useEffect(() => {
    if (settingData) {
      setValue("store_name", settingData?.result?.data?.store_name || "");
      setValue(
        "store_activation",
        settingData?.result?.data?.store_activation || 0
      );
      // setValue(
      //   "store_description",
      //   settingData?.result?.data?.store_description || ""
      // );
      // setValue("store_rules", settingData?.result?.data?.store_rules || "");
      setValue("store_message", settingData?.result?.data?.store_message || "");
    }
  }, [settingData, setValue]);

  const onSubmit = (data: Inputs) => {
    // Send the data to the backend
    handelSubmit({ ...data, _method: "PUT" });
  };

  return isPending ? (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner />
    </div>
  ) : (
    <div className="row">
      <div>
        <h3
          className="col-10 col-lg-2 col-md-3 col-sm-4 mx-auto fw-bold rounded-pill d-flex ffcairo mt-2 d-flex align-items-center"
          style={{
            border: "2px solid #A7C957",
            fontSize: "24px",
            borderRight: "transparent",
            width: "204px",
          }}
        >
          <div
            className="rounded-circle"
            style={{
              border: "2px solid #A7C957",
              width: "45px",
              height: "45px",
              padding: "6px",
              scale: "1.6",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img width={40} className="p-1" src={noteIcon} alt="" />
          </div>
          <div className="flex-grow-1 text-center mx-3"> إعداد المتجر</div>
        </h3>
      </div>
      <div className="col-12 col-lg-8 col-md-12 p-3 p-lg-0 m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="mb-3 col-12">
            <label
              htmlFor="store_activation"
              className="text-end d-block font-size-16 mb-2"
            >
              تفعيل المتجر
            </label>
            <select
              id="store_activation"
              className="form-control"
              {...registerForm("store_activation", { required: true })}
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
            >
              <option disabled value="">
                تفعيل المتجر
              </option>
              <option value="1">مفعل</option>
              <option value="0">معطل</option>
            </select>
            {errors.store_activation && (
              <p className="text-right text-danger">برجاء تفعيل المتجر</p>
            )}
          </div>

          <div className="mb-3 col-12">
            <label
              htmlFor="store_name"
              className="text-end d-block font-size-16 mb-2"
            >
              اسم المتجر
            </label>
            <input
              id="store_name"
              type="text"
              style={{ backgroundColor: "#EEF1F5", borderRadius: "20px" }}
              className="form-control text-end p-3"
              placeholder="اسم المتجر"
              {...registerForm("store_name", { required: true })}
            />
            {errors.store_name && (
              <p className="text-right text-danger">برجاء إدخال اسم المتجر</p>
            )}
          </div>
          {/* 
          <div className="mb-3 col-12">
            <label
              htmlFor="store_description"
              className="text-end d-block font-size-16 mb-2"
            >
              وصف المتجر
            </label>
            <div className="">
              <textarea
                className="form-control text-end p-3"
                placeholder="وصف المتجر"
                id="store_description"
                style={{
                  height: "100px",
                  backgroundColor: "#EEF1F5",
                  borderRadius: "20px",
                }}
                {...registerForm("store_description", { required: true })}
              ></textarea>
            </div>
          </div> */}

          {/* <div className="mb-3 col-12">
            <label
              htmlFor="store_rules"
              className="text-end d-block font-size-16 mb-2"
            >
              نظام المتجر
            </label>
            <div className="">
              <textarea
                className="form-control text-end p-3"
                placeholder="نظام المتجر"
                id="store_rules"
                style={{
                  height: "100px",
                  backgroundColor: "#EEF1F5",
                  borderRadius: "20px",
                }}
                {...registerForm("store_rules", { required: true })}
              ></textarea>
            </div>
          </div> */}

          <div className="mb-3 col-12">
            <label
              htmlFor="store_message"
              className="text-end d-block font-size-16 mb-2"
            >
              الرسالة التي تظهر للطالب بعد عملية إستبدال النقاط
            </label>
            <div className="">
              <textarea
                className="form-control text-end p-3"
                placeholder="الرسالة التي تظهر للطالب بعد عملية إستبدال النقاط"
                id="store_message"
                style={{
                  height: "100px",
                  backgroundColor: "#EEF1F5",
                  borderRadius: "20px",
                }}
                {...registerForm("store_message", { required: true })}
              ></textarea>
            </div>
          </div>

          {!loadingSubmit && (
            <button
              type="submit"
              style={{ backgroundColor: "#A7C957" }}
              className={`btn text-white w-100 fw-700 font-size-24 p-3 mt-3`}
            >
              حفظ
            </button>
          )}
          {loadingSubmit && (
            <button
              type="submit"
              disabled
              style={{ backgroundColor: "#0077b6" }}
              className={`btn text-white w-100 fw-700 font-size-24 btn-blue p-3 mt-4`}
            >
              <Spinner className="" color="white">
                Loading...
              </Spinner>
            </button>
          )}
        </form>
      </div>

      <SuccessModal
        isOpen={modal}
        text={"تم تحديث البيانات بنجاح"}
        toggle={toggle}
        setOpen={setModal}
      />
    </div>
  );
}

export default Setting;
