export const contactFieldConfig = [
  {
    name: "type",
    label: "Select Type",
    type: "select",
    options: [
      { value: "email", label: "Email ID" },
      { value: "mobileNumber", label: "Mobile Number" },
      { value: "mobileAndEmail", label: "Mobile Number & Email ID" },
    ],
    disabled: false
  },
  {
    name: "regEmail",
    label: "Registered Email",
    type: "text",
    dependsOn: ["email", "mobileAndEmail"],
    disabled: true
  },
  {
    name: "newEmail",
    label: "New Email",
    type: "text",
    dependsOn: ["email", "mobileAndEmail"],
    disabled: false
  },
  {
    name: "regMobile",
    label: "Registered Mobile Number",
    type: "text",
    dependsOn: ["mobileNumber", "mobileAndEmail"],
    disabled: true
  },
  {
    name: "newMobile",
    label: "New Mobile Number",
    type: "text",
    dependsOn: ["mobileNumber", "mobileAndEmail"],
    disabled: false
  },
];
