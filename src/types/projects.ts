export interface Project {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  route: string;
  bgColor?: string;
  textColor?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "cdu",
    name: "cdu",
    displayName: "CDU",
    description: "Client Data Update",
    icon: "/assets/projects/cdu.svg",
    route: "/cdu",
    bgColor: "linear-gradient(90deg, #265949 0%, #52BF9D 133.99%)",
    textColor: "#fff"
  },
  {
    id: "rekyc",
    name: "rekyc",
    displayName: "Re-KYC",
    description: "Re-Know Your Customer",
    icon: "/assets/projects/rekyc.svg",
    route: "/rekyc",
    bgColor: "linear-gradient(90deg, #4A90E2 0%, #7BB3F0 133.99%)",
    textColor: "#fff"
  },
  {
    id: "ddpi",
    name: "ddpi",
    displayName: "DDPI",
    description: "Demat Debit and Pledge Instruction",
    icon: "/assets/projects/ddpi.svg",
    route: "/ddpi",
    bgColor: "linear-gradient(90deg, #F5A623 0%, #F7B955 133.99%)",
    textColor: "#fff"
  },
  {
    id: "account-closures",
    name: "account-closures",
    displayName: "Account Closures",
    description: "Close Trading & Demat Account",
    icon: "/assets/projects/account-closures.svg",
    route: "/account-closures",
    bgColor: "linear-gradient(90deg, #D0021B 0%, #E85D75 133.99%)",
    textColor: "#fff"
  }
];