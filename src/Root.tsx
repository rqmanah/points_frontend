import { QueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";
import { useIsRTL } from "./hooks/useIsRTL";
import Footer from "./pages/landing/Footer";
import { UserContext } from "./utils/userContext";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});
function Root() {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const { user, logoutContext } = useContext(UserContext);
  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);
  const [isActive, setIsActive] = useState(true);
  const initialTime = 1500000;

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      setIsActive(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
        navigate("/login");
        logoutContext();
      }, initialTime);
    };
    const handleUserActivity = () => {
      resetTimer();
    };
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, [initialTime]);


  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="flex-grow-1">
        <App />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
