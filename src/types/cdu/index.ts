import { APIDataResponse } from "../response";


export type CDUResponse = APIDataResponse<CDUData>;

export interface CDUData {
  dummy?: boolean;
}

export interface NomineeRequestPayload {
  id: string; // empty for ADD
  name?: string;
  sharePercentage?: string;
  relation?: string;
  mobile?: string;
  dob?: string;
  address?: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  idProof?: {
    type: string;
    value: string;
  };
  guardian?: {
    name: string;
    idProof: {
      type: string;
      value: string;
    };
  };
}

