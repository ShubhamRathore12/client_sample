import axios, { AxiosError } from "axios";
import { APIError } from "../types/response";
import { Toast } from "../types/app";
import { showSingleToast } from "./toast-util";


export default function handleError<T extends Error | AxiosError<APIError>>(
  error: T,
  toastType?: Toast
) {
  let toastMessage: string;

  if (axios.isAxiosError<APIError>(error)) {
    if (error.response?.status === 307) {
      return;
    }
    toastMessage = error.response?.data?.error || error.message;
  } else if (error instanceof Error) {
    toastMessage = error.message;
  } else {
    toastMessage = "Something went wrong";
  }

  showSingleToast.error(toastMessage, { id: toastType || Toast.FALLBACK, duration: 6000 });
}
