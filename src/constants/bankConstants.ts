export const bankFieldConfig = [
  {
    name: "ifsc",
    label: "Bank IFSC Code",
    type: "text",
  },
  {
    name: "bank",
    label: "Bank Name",
    type: "text",
     disabled: true 
  },
  {
    name: "micr",
    label: "Branch MICR",
    type: "text",
     disabled: true 
  },
  {
    name: "holderName",
    label: "Account Holder Name",
    type: "text",
  },
  {
    name: "accountNo",
    label: "Account Number",
    type: "text",
  },
    {
    name: "confirmAccountNo",
    label: "Confirm Account Number",
    type: "text",
  },
  {
    name: "accountType",
    label: "Primary Account Type",
    type: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
 {
    name: "bankType",
    label: "Bank Account Type",
    type: "select",
    options: [
      { value: "saving", label: "Saving" },
      { value: "current", label: "Current" },
    ],
  },
];
