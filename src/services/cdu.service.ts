import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Toast } from "../types/app";
import { CDUResponse } from "../types/cdu";
import getRoute from "../utils/get-route";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const apiService = axios.create({
  baseURL: `${BASE_URL}/api/user`,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRF-Token",
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 307) {
      window.location.href = error.response?.data?.data?.redirect_url;
    }
    if (
      process.env.NODE_ENV !== "development" &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      window.location.replace(getRoute("mobile"));
      showSingleToast.error("Please login again to continue", {
        id: Toast.UNAUTHORIZED_ERROR,
      });
    }
    return Promise.reject(error);
  }
);

apiService.interceptors.request.use((value) => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(location.search);
    if (params.get("client_id")) {
      value.headers["Client-Id"] = params.get("client_id");
    }
  }
  return value;
});

type CommonResponse = Promise<AxiosResponse<CDUResponse>>;

class CduService {
  getUser(config?: AxiosRequestConfig): CommonResponse {
    return apiService.get("", config);
  }
}

const cduService = new CduService();
export default cduService;
