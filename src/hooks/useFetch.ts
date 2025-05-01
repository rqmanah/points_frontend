import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type useFetchPops_TP = {
  queryKey: [string];
  endpoint: string;
  enabled?: boolean;
  select?: ((data: any) => any) | undefined;
  onError?: (err: any) => void;
  onSuccess?: (err: any) => void;
  localization?: boolean;
};
function useFetch<T>({
  endpoint,
  enabled,
  select,
  queryKey,
  onError,
  onSuccess,
}: useFetchPops_TP) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: authorizationHeader,
    },
  };
  const hostname = window.location.hostname;
  let baseURL: string;
  if (hostname === "ae.school-points.com") {
    baseURL = "https://ae-api.school-points.com/api/";
  } else if (hostname === "eg.school-points.com") {
    baseURL = "https://eg-api.school-points.com/api/";
  } else if (hostname === "sa.school-points.com") {
    baseURL = "https://sa-api.school-points.com/api/";
  } else {
    baseURL = import.meta.env.VITE_API_URL;
  }
  // const baseURL = import.meta.env.VITE_API_URL;

  const query = useQuery<T>({
    queryKey,
    queryFn: () =>
      axios.get(`${baseURL}${endpoint}`, config).then((res) => res.data),
    enabled,
    select,
    onError: (error) => {
      toast("error", error?.response?.data?.message);
      if (error?.response?.data?.message == "Unauthenticated.") {
        localStorage.removeItem("user");
        navigate("/login");
        Cookies.remove("token");
      }
      if (onError) {
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
