import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

type useMutateProps_TP<response_T> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: response_T) => void;
  onError?: (err: any) => void;
  formData?: boolean;
  onMutate?: (err?: unknown) => void;
  method?: "post" | "delete"; // Add the method property
};

export function useMutate<response_T>({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = "post", // Set a default value for the method
}: useMutateProps_TP<response_T>) {
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
  const [uploadProgress, setUploadProgress] = useState(0);

  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;

  const { data, isPending, isSuccess, mutate, failureReason, isError } =
    useMutation({
      mutationKey,
      mutationFn: (values) => {
        const requestConfig = {
          method: method.toUpperCase(), // Use the specified method
          url: `${baseURL}${endpoint}`,
          data: values,
          headers: formData
            ? {
                "Content-Type": "multipart/form-data",
                Authorization: authorizationHeader,
              }
            : {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: authorizationHeader,
              },
          onUploadProgress: (progressEvent: {
            loaded: number;
            total: number;
          }) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        };

        return axios(requestConfig);
      },
      onSuccess,
      onError,
      onMutate,
    });
  return {
    data,
    isPending,
    isSuccess,
    mutate,
    failureReason,
    isError,
    uploadProgress,
  };
}
