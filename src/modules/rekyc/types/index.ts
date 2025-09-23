export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  fatherName: string;
  motherName: string;
  spouseName?: string;
  panNumber: string;
  aadharNumber: string;
  email: string;
  mobile: string;
  occupation: string;
  annualIncome: string;
}

export interface PermanentAddress {
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  sameAsCorrespondence: boolean;
}

export interface SegmentDetails {
  equity: boolean;
  derivatives: boolean;
  commodity: boolean;
  currency: boolean;
  mutualFunds: boolean;
}

export interface SignatureDetails {
  signatureImage?: File;
  photographImage?: File;
}

export interface OtherDetails {
  nomineeDetails: {
    name: string;
    relation: string;
    sharePercentage: number;
  }[];
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountType: 'savings' | 'current';
  };
  tradingExperience: string;
  riskProfile: 'low' | 'medium' | 'high';
}

export interface RekycFormData {
  personalDetails: PersonalDetails;
  permanentAddress: PermanentAddress;
  segmentDetails: SegmentDetails;
  signatureDetails: SignatureDetails;
  otherDetails: OtherDetails;
}

export type RekycStep = 'personal' | 'address' | 'segment' | 'signature' | 'other' | 'review';