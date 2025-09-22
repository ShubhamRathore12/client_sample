/* eslint-disable @typescript-eslint/no-explicit-any */
import type { useFormik, useFormikContext } from "formik";

export default function getErrorProps(
  formik: ReturnType<typeof useFormik<any> | typeof useFormikContext<any>>,
  name: string
) {
  const meta = formik.getFieldMeta(name);
  const touched = meta.touched;
  const error = meta.error;
  return {
    error: Boolean(touched && error),
    helperText: touched ? (error as unknown as string) || " " : " ",
  };
}
