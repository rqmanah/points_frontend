import { toast } from "react-toastify";
import {
  behaviorType,
  createManagerType,
  filterDataType,
  loginDataType,
  loginResponseType,
  notesUserType,
} from "../types";
import client from "./client";
import Cookies from "js-cookie";

export async function login(loginData: loginDataType) {
  const { data }: { data: loginResponseType } = await client.post(
    `school/manager/login`,
    loginData
  );
  if (data.status == "error") return data;
  const user = data?.result?.data;
  return user;
}

export async function logout(userType: string) {
  try {
    await client.post(`school/${userType}/logout`);
    localStorage.removeItem("user");

    toast.success("تم تسجيل الخروج بنجاح", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } catch (error: any) {
    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export async function getBehaviors() {
  const { data } = await client.get("school/teacher/behaviors/behaviorsIndex?limit=100000");
  const behaviors: behaviorType[] = data?.result?.data;
  return behaviors;
}

export async function addStudentsBehaviors(
  studentsIds: number[],
  behaviorId: number | null,
  comment: string
) {
  await client.post("school/teacher/students/addBehavior", {
    behavior_id: behaviorId,
    student_ids: studentsIds,
    note: comment,
  });
}

export async function getNoteUsers(filterData: filterDataType | null) {
  const { data } = await client.get("school/teacher/students/studentsIndex", {
    params: {
      row_id: filterData?.row !== -1 ? filterData?.row : null,
      class_id: filterData?.class !== -1 ? filterData?.class : null,
      term: filterData?.search !== "" ? filterData?.search : null,
    },
  });
  const users: notesUserType[] = data?.result?.data;
  return users;
}

export async function getSchoolRows() {
  const { data } = await client.get("school/teacher/rows");
  return data?.result?.data;
}

export async function getSchoolClasses() {
  const { data } = await client.get("school/teacher/classes");
  return data?.result?.data;
}

export async function getTopStudents() {
  const { data } = await client.get("school/teacher/students/behaviors/top");
  return data?.result?.data;
}

export async function getUserNotes(studentId: number) {
  const { data } = await client.get(
    `school/teacher/students/behaviors/details/${studentId}`
  );
  return data?.result?.data;
}

export async function updateUserInfo(
  userType: String | null = null,
  name: String | null = null,
  image: string | null = null,
  password: string | null = null
) {
  const { data } = await client.post(`school/${userType}/update`, {
    name,
    password,
    image,
  });
  return data.result.data;
}

export async function getStorePrizes() {
  const { data } = await client.get("school/student/prizes");
  return data?.result?.data;
}
export async function getStorePrizesMini() {
  const { data } = await client.get("school/student/prizes?filter[stock]=mini");
  return data?.result?.data;
}
export async function getStorePrizesEmpty() {
  const { data } = await client.get("school/student/prizes?filter[stock]=empty");
  return data?.result?.data;
}

export async function getMyOrders() {
  const { data } = await client.get("school/student/orders");
  return data?.result?.data;
}

export async function purchasePrize(prizeId: number | null = null) {
  const { data } = await client.post("school/student/prize/order", {
    prize_id: prizeId,
  });
  return data;
}

export async function cancelOrder(orderId: number, prizeId: number) {
  await client.post(`school/student/prize/cancel/${orderId}`, {
    prize_id: prizeId,
  });
}

export async function getStudentReports() {
  const { data } = await client.get("school/student/report");
  return data.result.data;
}

export async function getStudentNotes(search: string | null = null) {
  const { data } = await client.get("school/student/behavior", {
    params: { term: search },
  });
  return data.result.data;
}

export async function register(managerData: createManagerType) {
  const { data } = await client.post("school/manager/register", managerData);
  return data.result.data;
}

export async function resendVerficationMessage(otp: string | null) {
  const { data } = await client.post("school/manager/resend/otp", { otp });
  return data;
}

export async function verifyPhone(otp: string | null) {
  const { data } = await client.post("school/manager/verify/otp", { otp });
  return data;
}

export async function getPackages() {
  const { data } = await client.get("school/manager/packages");
  return data.result.data;
}

export async function buyPackage(
  package_id: number | null,
  coupon: string | null
) {
  const { data } = await client.post("school/manager/assign/package", {
    package_id,
    coupon,
  });
  return data?.result?.data;
}

export async function checkCoupon(coupon: string) {
  const { data } = await client.post("school/manager/check/coupon", {
    coupon,
  });
  return data;
}

export async function geSchoolData() {
  const { data } = await client.get("school/manager/school");
  console.log(data);
  return data.result.data;
}

export async function getLandingPackages() {
  const { data } = await client.get("common/packages");
  return data.result.data;
}

export const handleClickRandomPassword = (ev: any, setValue: any) => {
  ev.preventDefault();
  let generatedPassword = "";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  while (generatedPassword.length < 6) {
    generatedPassword +=
      lowerCase[Math.floor(Math.random() * lowerCase.length)];
    generatedPassword +=
      upperCase[Math.floor(Math.random() * upperCase.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
  }
  generatedPassword = generatedPassword
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  setValue("password", generatedPassword);
  setValue("password_confirmation", generatedPassword);
};

export const downloadFile = async (endpoint, fileName) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob(); 

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("There was an error downloading the file:", error);
  }
};
