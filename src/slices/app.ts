import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPayload {
  type: string;
  target: string;
}

interface BankFormType {
  type: string;
}

interface OTPResponse {
  maskedPhone: string;
  maskedEmail: string;
}

interface ContactVerificationPayload {
  type: string;
  regMobile?: string;
  regEmail?: string;
}

interface User {
  id: string;
  type: string;
  isActive: boolean;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  dpImageUrl: string;
  signUrl: string;
  city: string;
}

interface MobileOrEmail {
  id: string;
  value: string;
}

export interface Nominee {
  id: string;
  name: string;
  sharePercentage: string;
  relation: string;
  mobile: string;
  dob: string;
  isAdressSameAsUser: boolean;
  email: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  idProof: {
    type: string;
    value: string;
  };
  guardian: {
    name: string;
    idProof: {
      type: string;
      value: string;
    };
  };
  updatedId?: string;
}

interface BankDetails {
  ifsc: string;
  micr: string;
  name: string;
  code: string;
  branchName: string;
}
interface AddressDetails {
  line1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface AccountDetails {
  accountNumber: string;
  holderName: string;
  type: "SAVING" | "CURRENT";
  vpa: string;
}

interface BankAccount {
  id: string;
  isPrimary: boolean;
  bank: BankDetails;
  accountNumber: string;
  holderName: string;
  type: string;
  vpa: string;
}

interface Segement {
  id?: string;
  isEnabled?: boolean;
  isDocRequired?: boolean;
}

interface ChangeRequestMeta {
  isEditable: boolean;
  lastActionAt: string;
}

export interface ChangeRequest<T> {
  id: string;
  type: "ADD" | "MODIFY" | "DELETE";
  status:
    | "DRAFT"
    | "ESIGN_INITIATED"
    | "WAITING_FOR_APPROVAL"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "VERIFIED";
  targetId: string;
  data: T | null;
}

interface CombinedUserData {
  current: {
    mobile: MobileOrEmail;
    email: MobileOrEmail;
    nominees: Nominee[];
    bankAccounts: BankAccount[];
    segments: Segement[];
    isAllSegmentsActive: Boolean
  };
  changesRequests: {
    mobile: ChangeRequest<MobileOrEmail>[];
    email: ChangeRequest<MobileOrEmail>[];
    nominee: ChangeRequest<Nominee>[];
    bankAccounts: {
      meta: ChangeRequestMeta;
      requests: ChangeRequest<BankAccount>[];
    };
    nomineeMeta: any | null;
    bankMeta: any | null;
    emailMeta: any | null;
    mobileMeta: any | null;
  };
}

type TextType = "NOTE" | "CONSENT";

interface DropdownItem {
  id: string;
  value: string;
}

interface DropdownState {
  IdProof: DropdownItem[];
  Relation: DropdownItem[];
  BankAccountType: DropdownItem[];
  Segment: DropdownItem[];
  SegmentProofType: DropdownItem[];
}

interface FormText {
  text: string;
  type: TextType;
}

interface EsignData {
  docId: string;
  tokenId: string;
  signerId: string;
}

export interface NomineeEsignResponse {
  esign: EsignData;
  changeRequests: any[]; // can be typed later
}

export interface BankInfo {
  code: string;
  name: string;
  branch: string;
  address: AddressDetails;
  contact?: string;
  city: string;
  district: string;
  state: string;
  ifsc: string;
  micr?: string;
}

export interface AccountInfo {
  id: string;
  isPrimary: boolean;
  bank: BankInfo;
  accountNumber: string;
  holderName: string;
  type: "SAVING" | "CURRENT";
  vpa: string;
}

export interface StatusResponse {
  msg: string;
  status: "IN_PROGRESS" | "SUCCESS" | "FAILED";
  data: null | {
    id: number;
    change: AccountInfo;
  };
  nextSteps: {
    BankProof: {
      required: boolean;
      msg: string;
    };
    ManualBankEntry: {
      required: boolean;
      msg: string;
    };
  };
}

export interface uploadResponse {
  id: string;
}

export interface PayLinkResponse {
  link: string;
  expiresAt: string; // ISO string, e.g. "2025-07-10T12:00:00Z"
  id: string;
}

interface InitialState {
  userData: UserPayload;
  otpResponse: OTPResponse;
  contactVerification?: ContactVerificationPayload | null;
  user: User | null;
  multipleUsers: User[] | null;
  data: CombinedUserData | null;
  consent: FormText[] | null;
  esignData: EsignData | null;
  nomineeResponse: NomineeEsignResponse | null;
  selectedNominee: Nominee | null;
  nomineeState: "add" | "edit" | "view";
  isLogoutPopupOpen: boolean | null;
  bankInfoByIfsc: BankInfo | null;
  payLink: PayLinkResponse | null;
  statusBankInfo: StatusResponse | null;
  uploadResponse: uploadResponse | null;
  optionsAll: DropdownState | null;
  delayText: string | null;
  rejectionText: string | null;
  requestType: string | null;
  segmentResponse: null | any;
  segmentProofType: null | any;
  bankFormType: "ADD" | "VIEW" | string
}

const initialState: InitialState = {
  userData: { type: "", target: "" },
  contactVerification: undefined,
  user: {
    id: "",
    type: "",
    isActive: false,
    name: "",
    email: "",
    mobile: "",
    pan: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    dpImageUrl: "",
    signUrl: "",
    city: "",
  },
  multipleUsers: [],
  data: {
    current: {
      mobile: { id: "", value: "" },
      email: { id: "", value: "" },
      nominees: [],
      bankAccounts: [],
      segments: [],
      isAllSegmentsActive : false
    },
    changesRequests: {
      mobile: [],
      email: [],
      nominee: [],
      bankAccounts: {
        meta: { isEditable: false, lastActionAt: "" },
        requests: [],
      },
      nomineeMeta: null,
      emailMeta: null,
      mobileMeta: null,
      bankMeta: null,
    },
  },
  consent: [],
  esignData: {
    docId: "",
    tokenId: "",
    signerId: "",
  },
  nomineeResponse: null,
  nomineeState: "add",
  selectedNominee: {
    id: "",
    name: "",
    sharePercentage: "",
    relation: "",
    mobile: "",
    dob: "",
    isAdressSameAsUser: false,
    email: "",
    address: {
      line1: "",
      line2: "",
      line3: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    idProof: {
      type: "",
      value: "",
    },
    guardian: {
      name: "",
      idProof: {
        type: "",
        value: "",
      },
    },
    updatedId: "",
  },
  isLogoutPopupOpen: false,
  bankInfoByIfsc: null,
  payLink: {
    link: "",
    expiresAt: "",
    id: "",
  },
  statusBankInfo: {
    msg: "",
    status: "IN_PROGRESS",
    data: null,
    nextSteps: {
      BankProof: {
        required: false,
        msg: "",
      },
      ManualBankEntry: {
        required: false,
        msg: "",
      },
    },
  },
  uploadResponse: { id: "" },
  optionsAll: {
    IdProof: [],
    Relation: [],
    BankAccountType: [],
    Segment: [],
    SegmentProofType: [],
  },
  delayText: "You have to wait for 7 days before requesting another change",
  rejectionText: "",
  requestType:
    "phone number/email/bank details/nominee changes/segment addition",
  otpResponse: null,
  segmentResponse: null,
  segmentProofType: null,
  bankFormType: "ADD"
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserPayload>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = { type: "", target: "" };
    },
    setOtpResponseData: (state, action: PayloadAction<OTPResponse>) => {
      state.otpResponse = action.payload;
    },
    setContactVerification: (
      state,
      action: PayloadAction<ContactVerificationPayload>
    ) => {
      state.contactVerification = action.payload;
    },
    clearContactVerification: (state) => {
      state.contactVerification = undefined;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setMultipleUser: (state, action: PayloadAction<User[]>) => {
      state.multipleUsers = action.payload;
    },
    clearMultipleUser: (state) => {
      state.multipleUsers = [];
    },
    setCombinedUserData: (state, action: PayloadAction<CombinedUserData>) => {
      state.data = action.payload;
    },
    clearCombinedUserData: (state) => {
      state.data = null;
    },
    setFormTexts: (state, action: PayloadAction<FormText[]>) => {
      state.consent = action.payload;
    },
    clearFormTexts: (state) => {
      state.consent = [];
    },
    setEsignData: (state, action: PayloadAction<EsignData>) => {
      state.esignData = action.payload;
    },
    clearEsignData: (state) => {
      state.esignData = null;
    },
    setNomineeEsignData: (
      state,
      action: PayloadAction<NomineeEsignResponse>
    ) => {
      state.nomineeResponse = action.payload;
    },
    clearNomineeEsignData: (state) => {
      state.nomineeResponse = null;
    },
    setNomineeState: (
      state,
      action: PayloadAction<"add" | "edit" | "view">
    ) => {
      state.nomineeState = action.payload;
    },
    clearNomineeState: (state) => {
      state.nomineeState = "add";
    },
    setSelectedNominee: (state, action: PayloadAction<Nominee>) => {
      state.selectedNominee = action.payload;
    },
    setNomineeInCurrent: (state, action: PayloadAction<Nominee>) => {
      state.data.current.nominees = [
        ...(state.data.current.nominees || []),
        action.payload,
      ];
    },
    clearSelectedNominee: (state) => {
      state.selectedNominee = null;
    },
    setLogoutPopupState: (state, action) => {
      state.isLogoutPopupOpen = action.payload;
    },
    setBankInfo: (state, action: PayloadAction<BankInfo>) => {
      state.bankInfoByIfsc = action.payload;
    },
    clearBankInfo: (state) => {
      state.bankInfoByIfsc = null;
    },
    setPayLink: (state, action: PayloadAction<PayLinkResponse>) => {
      state.payLink = action.payload;
    },
    clearPayLink: (state) => {
      state.payLink = null;
    },
    setStausResponse: (state, action: PayloadAction<StatusResponse>) => {
      state.statusBankInfo = action.payload;
    },
    clearStatusResponse: (state) => {
      state.statusBankInfo = null;
    },
    setUploadResponse: (state, action: PayloadAction<uploadResponse>) => {
      state.uploadResponse = action.payload;
    },
    clearUploadResponse: (state) => {
      state.uploadResponse = null;
    },
    setOptionsAll: (state, action: PayloadAction<DropdownState>) => {
      state.optionsAll = action.payload;
    },
    clearOptionsAll: (state) => {
      state.optionsAll = null;
    },
    setDelayText: (state, action: PayloadAction<string>) => {
      state.delayText = action.payload;
    },
    clearDelayText: (state) => {
      state.delayText = null;
    },
    setRejectionText: (state, action: PayloadAction<string>) => {
      state.rejectionText = action.payload;
    },
    clearRejectionText: (state) => {
      state.rejectionText = null;
    },
    setRequestType: (state, action: PayloadAction<string>) => {
      state.requestType = action.payload;
    },
    clearRequestType: (state) => {
      state.requestType = null;
    },
    setSegmentResponse: (state, action: PayloadAction<any>) => {
      state.segmentResponse = action.payload;
    },
    clearSegmentResponse: (state) => {
      state.segmentResponse = null;
    },
    setSegmentProofType: (state, action: PayloadAction<any>) => {
      state.segmentProofType = action.payload;
    },
    clearSegmentProofType: (state) => {
      state.segmentProofType = null;
    },
     setBankFormType: (state, action: PayloadAction<any>) => {
      state.bankFormType = action.payload;
    },
    clearBankFormType: (state) => {
      state.bankFormType = "ADD";
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setContactVerification,
  clearContactVerification,
  setUser,
  clearUser,
  setMultipleUser,
  clearMultipleUser,
  setCombinedUserData,
  clearCombinedUserData,
  setFormTexts,
  clearFormTexts,
  setEsignData,
  clearEsignData,
  setNomineeEsignData,
  clearNomineeEsignData,
  setNomineeState,
  clearNomineeState,
  setSelectedNominee,
  setNomineeInCurrent,
  clearSelectedNominee,
  setLogoutPopupState,
  setBankInfo,
  clearBankInfo,
  setPayLink,
  clearPayLink,
  setStausResponse,
  clearStatusResponse,
  setUploadResponse,
  clearUploadResponse,
  setOptionsAll,
  clearOptionsAll,
  setDelayText,
  clearDelayText,
  setOtpResponseData,
  setRequestType,
  clearRequestType,
  setSegmentResponse,
  clearSegmentResponse,
  setSegmentProofType,
  clearSegmentProofType,
  setBankFormType,
  clearBankFormType,
  clearRejectionText,
  setRejectionText
} = appSlice.actions;
export default appSlice;
