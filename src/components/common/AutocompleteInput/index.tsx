/* eslint-disable no-nested-ternary */
import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import { FieldAttributes, useField } from "formik";
import { FunctionComponent } from "react";
import { snakeToCapitalizeCase } from "../../../utils/snake-to-capitalize-case";
import React from "react";
interface MyTextFieldProps {
  labelName?: string;
  disabled?: boolean;
  // onChange?: any
  helperClassName?: string;
  testId?: string;
  prepend?: JSX.Element | string;
  label?: string;
  params: AutocompleteRenderInputParams;
}

export const AutocompleteInput: FunctionComponent<
  FieldAttributes<MyTextFieldProps>
> = ({ placeholder, disabled, testId, params, prepend, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const { type, labelName } = props;

  return (
    <>
      <TextField
        variant="standard"
        label={label}
        fullWidth
        {...params}
        error={!!errorText}
        helperText={snakeToCapitalizeCase(errorText) || " "}
        InputProps={{
          ...params.InputProps,
          disableUnderline: true,
        }}
        data-testid={testId}
        {...field}
      />
    </>
  );
};
