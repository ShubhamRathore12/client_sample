const extractError = (
  error: any,
  defaultMessage: string = "Something went wrong."
): string => {
  let errorToShow: string | undefined;

  const data =
    error?.response?.data ?? // standard axios/fetch error
    error; // raw error response, like your case

  if (typeof error === "string") {
    errorToShow = error;
  } else if (typeof data === "string") {
    errorToShow = data;
  } else if (typeof data?.error === "string") {
    errorToShow = data.error;
  } else if (typeof data?.err === "string") {
    errorToShow = data.err;
  } else if (typeof data?.message === "string") {
    errorToShow = data.message;
  } else if (typeof data?.msg === "string") {
    errorToShow = data.msg;
  } else if (typeof data?.error?.message === "string") {
    errorToShow = data.error.message;
  } else if (typeof data?.error?.msg === "string") {
    errorToShow = data.error.msg;
  } else if (typeof data?.err?.message === "string") {
    errorToShow = data.err.message;
  } else if (typeof data?.err?.msg === "string") {
    errorToShow = data.err.msg;
  }

  return errorToShow ?? defaultMessage;
};

export default extractError;
