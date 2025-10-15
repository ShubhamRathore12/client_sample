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
    icon: "/assets/First Project/Add user.json",
    route: "/cdu",
    bgColor: "linear-gradient(90deg, #265949 0%, #52BF9D 133.99%)",
    textColor: "#fff"
  },
  {
    id: "rekyc",
    name: "rekyc",
    displayName: "Re-KYC",
    description: "Re-Know Your Customer process",
    icon: "/assets/First Project/Verification - ID Card & Face Scan.json",
    route: "/rekyc",
    bgColor: "linear-gradient(90deg, #4A90E2 0%, #7BB3F0 133.99%)",
    textColor: "#fff"
  },
  {
    id: "ddpi",
    name: "ddpi",
    displayName: "DDPI",
    description: "Demat Debit and Pledge Instruction",
    icon: "/assets/First Project/Contract Sign.json",
    route: "/ddpi",
    bgColor: "linear-gradient(90deg, #F5A623 0%, #F7B955 133.99%)",
    textColor: "#fff"
  },
  {
    id: "account-closures",
    name: "account-closures",
    displayName: "Account Closures",
    description: "Close Trading & Demat Account",
    icon: "/assets/First Project/Menu - Open and close.json",
    route: "/account-closures",
    bgColor: "linear-gradient(90deg, #D0021B 0%, #E85D75 133.99%)",
    textColor: "#fff"
 }
];