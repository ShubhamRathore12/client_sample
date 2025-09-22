import { toast, ToastOptions } from "react-hot-toast";

interface ShowSingleToastFn {
  (message: string, options?: ToastOptions): string; // default to success
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  custom: (message: string, options?: ToastOptions) => string;
  dismiss: () => void;
}

const base = (message: string, options?: ToastOptions) => {
  toast.dismiss();
  return toast.success(message, options);
};

base.success = (message: string, options?: ToastOptions) => {
  toast.dismiss();
  return toast.success(message, options);
};

base.error = (message: string, options?: ToastOptions) => {
  toast.dismiss();
  return toast.error(message, options);
};

base.loading = (message: string, options?: ToastOptions) => {
  toast.dismiss();
  return toast.loading(message, options);
};

base.custom = (message: string, options?: ToastOptions) => {
  toast.dismiss();
  return toast.custom(message, options);
};

base.dismiss = () => toast.dismiss();

export const showSingleToast: ShowSingleToastFn = base;
