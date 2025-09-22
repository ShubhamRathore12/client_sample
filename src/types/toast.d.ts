import "react-hot-toast";

import { ToastType as ToasterToastType } from "react-hot-toast";

declare module "react-hot-toast" {
  type ToastType = ToasterToastType | "warning";
}
