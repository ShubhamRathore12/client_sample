import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders 
} from "axios";
import { NomineeRequestPayload } from "../types/cdu";
import { getCaptcha } from "../utils/catpcha";

const BASE_URL =
  process.env.BASE_URL || "https://uat-signup.stoxkart.com/cdu/client/api";

class ApiService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    // Request Interceptor: Inject clientId from URL
    this.client.interceptors.request.use((config) => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const clientId = params.get("client_id");
        if (clientId) {
          config.headers["Client-Id"] = clientId;
        }
      }
      return config;
    });

    // Attach x-captcha for OTP endpoints
    this.client.interceptors.request.use(async (config) => {
      if (
        config.url?.startsWith("/login/otp/send") ||
        config.url?.startsWith("/login/otp/verify")
      ) {
        try {
          const token = await getCaptcha();

          // Ensure headers exist and are typed correctly
          if (!config.headers) {
            config.headers = new AxiosHeaders(); // Use AxiosHeaders
          }

          // Set x-captcha
          (config.headers as  AxiosRequestHeaders ).set("x-captcha-token", token);
        } catch (err) {
          console.error("Failed to get captcha token", err);
        }
      }

      return config;
    });

    // Response Interceptor: Extract data, handle errors globally
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            const publicRoutes = ["/", "/login", "/verifyOTP"];
            const currentPath = window.location.pathname;

            const isPublic = publicRoutes.includes(currentPath);

            if (!isPublic) {
              localStorage.clear();
              window.location.href = "/login";
            }
          }
        }

        const message =
          (error.response?.data as any) ||
          error.message ||
          "Something went wrong";

        return Promise.reject(message);
      }
    );
  }

  // ====== OTP APIs ======

  sendOtp(queryParam: string) {
    return this.client.post(`/login/otp/send?${queryParam}`).then((res) => res); // Return only the data object;
  }

  verifyOtp({
    target,
    type,
    otp,
  }: {
    target: string;
    type: string;
    otp: string;
  }) {
    return this.client.post(
      `/login/otp/verify?${type}=${encodeURIComponent(target)}`,
      {
        otp,
      }
    );
  }

  getUserList(clientId?: string) {
    const url = clientId
      ? `/user?clientId=${encodeURIComponent(clientId)}`
      : `/user`;
    return this.client.get(url).then((res) => res.data || []);
  }

  getCombinedUserData(target?: string) {
    const url = target
      ? `/userdata/combined?target=${encodeURIComponent(target)}`
      : `/userdata/combined`;

    return this.client.get(url).then((res) => res.data); // extract data directly
  }

  getFormTexts(target?: string) {
    const url = target
      ? `/texts/form-texts?target=${target}`
      : `/texts/form-texts`;
    return this.client.get(url).then((res) => res.data);
  }

  sendContactUpdateOtp(phone?: string, email?: string) {
    const queryParams = new URLSearchParams();

    if (phone) queryParams.append("phone", phone);
    if (email) queryParams.append("email", email);

    const url = `/contact/send-otp?${queryParams.toString()}`;

    return this.client.post(url).then((res) => res.data);
  }

  verifyContactOtpAndProceed(payload: {
    toVerify: {
      mobile?: string;
      mobileOtp?: string;
      email?: string;
      emailOtp?: string;
    };
    toProceed: {
      target: "MOBILE" | "EMAIL" | "CONTACT" | "BANK_ACCOUNT" | "NOMINEE";
    };
  }) {
    return this.client
      .post("/contact/verify-and-proceed", payload)
      .then((res) => res.data);
  }

  verifyNomineesAndProceed(payload: NomineeRequestPayload[]) {
    return this.client
      .post("/nominee/verify-and-proceed", payload)
      .then((res) => res?.data);
  }

  addNominee(payload: NomineeRequestPayload[]) {
    return this.client
      .post("/nominee/request", payload)
      .then((res) => res?.data);
  }

  proceedNominee(queryString?: string, payload?: any) {
    const url = `/nominee/proceed${queryString ?? ""}`;
    return this.client.post(url, payload).then((res) => res?.data);
  }

  esignCheck(payload?: any) {
    return this.client
      .post(`/change-req/esign-check?id=${payload}`)
      .then((res) => res?.data);
  }

  logout() {
    return this.client.post(`/user/logout`).then((res) => res); // Return only the data object;
  }

  getBankDetailsByIFSC(ifsc: string) {
    return this.client
      .get("/bank/data", { params: { ifsc } })
      .then((res) => res.data);
  }

  getBankPayVerificationLink() {
    return this.client.get("/bank/verify/pay-link").then((res) => res.data);
  }

  getBankPayVerificationStatus(payload: any) {
    return this.client.post("/bank/verify/status", payload).then((res) => res);
  }

  initiateManualBankVerification(payload: any) {
    return this.client.post("/bank/change-init", payload).then((res) => res);
  }

  uploadBankProofFile(file: File, accountId: string, password?: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("accountId", accountId);
    password && formData.append("password", password);

    return this.client
      .post("/bank/verify/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res); // Returns: { id: string }
  }

  proceedWithEsignBankAccount(payload: {
    toProceed: { target: string; ids: number[] };
  }) {
    return this.client
      .post("/bank/proceed", payload)
      .then((res) => res.data.esign);
  }

  changeRequestEsignProceed(target?: string) {
    return this.client
      .post(`/change-req/proceed?target=${target}`)
      .then((res) => res);
  }

  deleteNominee(id?: number) {
    return this.client.delete(`/change-req?id=${id}`).then((res) => res);
  }

  getOptionsAll() {
    const url = "options/all";
    return this.client.get(url).then((res) => res.data);
  }

  submitSegmentRequest(payload: {
    segments: { id: string; isEnabled: boolean }[];
  }) {
    return this.client.post("/segment/request", payload).then((res) => res);
  }

  uploadSegmentFile(
    file: File,
    targetId: string,
    proofType: string,
    password?: string
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetId", targetId);
    formData.append("proofType", proofType);
    password && formData.append("password", password);

    return this.client
      .post("/segment/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res);
  }

  // ====== Generic methods ======

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
