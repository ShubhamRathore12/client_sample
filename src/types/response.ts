export interface APIResponse {
  message: string;
  status: "success";
}

export interface APIError {
  error: string;
  status: "failed";
}

export interface APIDataResponse<T = unknown> extends APIResponse {
  data: T;
}
