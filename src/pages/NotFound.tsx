import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const NotFound = () => {
  const navigate = useNavigate();
  const endpoint = `school/manager/get/country`
  const { data: LocationData } = useFetch({
    queryKey: [endpoint],
    endpoint: endpoint,
  })
  const navigateLing =
    LocationData?.result?.data == "EG"
      ? "https://eg.school-points.com"
      : LocationData?.result?.data == "AE"
      ? "https://ae.school-points.com"
      : "https://sa.school-points.com"

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(navigateLing)
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="container text-center d-flex align-items-center flex-column gap-2 justify-content-center"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <img src="/404.png" alt="404 Not Found" />
      <p>Redirecting to the home page in 5 seconds...</p>
    </div>
  );
};

export default NotFound;
