import type { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../api";
import type { Response } from "../types/response.type";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState();
  const [success, setSuccess] = useState<boolean>();
  const executingRequest = async (
    method: "post" | "put" | "delete" | "get",
    url: string,
    body?: object,
  ) => {
    setIsLoading(true);
    try {
      let response;
      if (["delete", "get"].includes(method)) {
        response = await api[method]<Response>(`${url}`);
      } else {
        response = await api[method]<Response>(`${url}`, body);
      }
      if (response.data.success) {
        setData(response.data?.data);
        setSuccess(response.data.success);
        return response.data.data;
      } else {
        setError("תקלת שרת");
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      console.log(serverMsg);
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };
  return { executingRequest, data, isLoading, error, success };
};
