import { useContext, useState } from "react";
import { UserContext } from "../../utils/userContext";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { roleImages } from "../../types";
import { updateUserInfo } from "../../utils/api.functions";
import { toast } from "react-toastify";
import { useMutate } from "../../hooks/useMutate";
import SuccessModal from "../../components/SuccessModal";

export default function Profile() {
  document.title = "الإعدادات";
  const { user, loginContext } = useContext(UserContext);
    const [open, setOpen] = useState(false)

  const [resetPasswordData, setResetPasswordData] = useState<{
    password: string;
    repassword: string;
    old_password: string;
  }>({ password: "", repassword: "", old_password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const updateUserPassword = async () => {
    setLoading(true);
    await updateUserInfo(
      user?.guard,
      user?.name,
      user?.image,
      resetPasswordData.password
    ).then(() => {
      toast.success("تم تغيير كلمة السر بنجاح", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setResetPasswordData({ password: "", repassword: "" });
    });
    setLoading(false);
  };

  const is_student = user?.guard == "student";
  const { mutate: updatePassword, isPending: loadingSubmit } = useMutate({
    mutationKey: [
      `school/${is_student ? "student" : "teacher"}/update-password`,
    ],
    endpoint:`school/${is_student ? "student" : "teacher"}/update-password`,
    onSuccess: () => {
      // toast.success("تم تغيير كلمة السر بنجاح", {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      setOpen(true)
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    formData: true,
  });
  const changeUserAvatar = async () => {
    setLoading(true);
    await updateUserInfo(user?.guard, user?.name, selectedAvatar)
      .then((data) => {
        loginContext({
          ...user,
          image: data.image,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, image: data.image })
        );
        // toast.success("تم تغيير الصورة الخاصة بك", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      setOpen(true)

      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);
  };
  return (
    <>
      <Card className="profile_setting w-50 mx-auto ">
        <CardTitle
          className=" fw-bold fs-2 pt-5 text-center"
          style={{ color: "#0077B6" }}
        >
          هل تريد تغيير كلمة المرور
        </CardTitle>
        <div className="mb-2 col-12 px-3">
          <label
            htmlFor="password"
            className=" text-end d-block  font-size-16 mb-2"
          >
            كلمة المرور القديمة
          </label>
          <input
            id="password"
            type={"password"}
            value={resetPasswordData.old_password}
            onChange={(ev) =>
              setResetPasswordData((prev) => ({
                ...prev,
                old_password: ev.target.value,
              }))
            }
            className="form-control text-end p-3"
            placeholder={"كلمة المرور القديمة"}
          />
        </div>
        <div className="mb-2 col-12 px-3">
          <label
            htmlFor="password"
            className=" text-end d-block  font-size-16 mb-2"
          >
            كلمة المرور الجديدة
          </label>
          <input
            id="password"
            type={"password"}
            value={resetPasswordData.password}
            onChange={(ev) =>
              setResetPasswordData((prev) => ({
                ...prev,
                password: ev.target.value,
              }))
            }
            className="form-control text-end p-3"
            placeholder={"كلمة المرور الجديدة"}
          />
        </div>
        <div className="mb-2 col-12 px-3">
          <label
            htmlFor="repassword"
            className=" text-end d-block font-size-16 mb-2"
          >
            تأكيد كلمة المرور
          </label>
          <input
            id="repassword"
            type={"password"}
            value={resetPasswordData.repassword}
            className="form-control text-end p-3"
            placeholder={"تأكيد كلمة المرور"}
            onChange={(ev) =>
              setResetPasswordData((prev) => ({
                ...prev,
                repassword: ev.target.value,
              }))
            }
          />
        </div>
        <Row className="px-3 mb-2">
          <Col lg={8}>
            <button
              type="submit"
              style={{ backgroundColor: "#0077b6" }}
              className="btn text-white w-100 rounded py-2"
              disabled={
                !resetPasswordData?.password ||
                !resetPasswordData?.repassword ||
                resetPasswordData?.password !== resetPasswordData?.repassword ||
                loading
              }
              onClick={() =>
                updatePassword({
                  password: resetPasswordData.password,
                  password_confirmation: resetPasswordData.repassword,
                  old_password: resetPasswordData.old_password,
                })
              }
            >
              تأكيد
            </button>
          </Col>
          <Col lg={4}>
            <button className="rounded btn w-100 btn-secondary py-2">
              لاحقاً
            </button>
          </Col>
        </Row>
      </Card>
      <hr />
      <Card className="w-50 mx-auto mt-1">
        <Row className="p-3">
          {user?.guard &&
            roleImages[user.guard] &&
            roleImages?.[user?.guard]?.map((image: any) => (
              <Col
                lg={user?.guard ? 12 / roleImages?.[user?.guard].length : 12}
                md={6}
                sm={12}
              >
                <img
                  className={`rounded-circle p-3 avatar ${
                    image?.includes(selectedAvatar) ? "selected-avatar" : ""
                  }`}
                  style={{ maxWidth: "9rem", maxHeight: "9rem", width: "100%" }}
                  onClick={() =>
                    setSelectedAvatar(
                      image.split("/")[image.split("/")?.length - 1]
                    )
                  }
                  src={image}
                />
              </Col>
            ))}
          <Col lg={12} className="mt-1">
            <button
              type="submit"
              style={{ backgroundColor: "#0077b6" }}
              className="btn text-white w-100 rounded py-2"
              disabled={!selectedAvatar || loading}
              onClick={() => changeUserAvatar()}
            >
              حفظ
            </button>
          </Col>
        </Row>
      </Card>
      <SuccessModal
        isOpen={open}
        setOpen={setOpen}
        text={'تم التحديث بنجاح'}
        toggle={() => setOpen(!open)}
      />
    </>
  )
}
