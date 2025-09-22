import { APIDataResponse } from "types/response";

export type DigioResponse = {
  txn_id?: string;
  error_code?: string;
  digio_doc_id: string;
  message: string;
};

export type DigioOptions = {
  environment: "sandbox" | "production";
  logo?: string;
  theme?: {
    // 6 digit hex codes only
    primaryColor?: string; // background
    secondaryColor?: string; // text
  };
  callback?: (response: DigioResponse) => void;
  is_redirection_approach?: boolean; // default false
  redirect_url?: string;
  is_iframe?: boolean; // default false
};

export type Digio = {
  init: () => void;
  submit: (requestId: string, identifier: string, token_id: string) => void;
  cancel: () => void;
};

export type DigioKeys = {
  document_id: string;
  access_token: string;
  customer_identifier: string;
};

export type GetDigioKeysResponse = DigioKeys;

export interface UpdateDigioStatusRequest {
  document_id: string;
}

export interface EsignRequest {
  lat: string;
  long: string;
}
