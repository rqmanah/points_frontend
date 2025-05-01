import { t } from "i18next";
import { userType } from "../types";

function NavMessage() {
  const user:userType = JSON.parse(localStorage.getItem("user") ?? "{}");
  return <div className="">{t("Hello")} {user.name}</div>;
}

export default NavMessage;
