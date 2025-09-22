import extractError from "./extract-error-only";
import { showSingleToast } from "./toast-util";

const extractErrorAndShowToast = (
  error: any,
  defaultMessage: string = "Something went wrong."
): string => {
  const errorToShow = extractError(error, defaultMessage);

  return showSingleToast.error(errorToShow ?? defaultMessage);
};

export default extractErrorAndShowToast;
