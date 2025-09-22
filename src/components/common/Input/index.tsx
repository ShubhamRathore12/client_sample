/* eslint-disable no-nested-ternary */
import {
  CheckCircle,
  Error,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import { FieldAttributes, useField } from "formik";
import { FunctionComponent, useState } from "react";
import { hasEmoji } from "../../../utils/has-emoji";
import { snakeToCapitalizeCase } from "../../../utils/snake-to-capitalize-case";
import React from "react";

type MyTextFieldProps = StandardTextFieldProps & {
  labelName?: string;
  disabled?: boolean;
  // onChange?: any
  helperClassName?: string;
  testId?: string;
  prepend?: JSX.Element | string;
  label?: string;
  labelTestId?: string;
  numeric?: boolean;
  nonNumeric?: boolean;
  noSpecialCharacters?: boolean;
  noEmoji?: boolean;
  maxLength?: number;
  upperCase?: boolean;
  noSpace?: boolean;
  hideTick?: boolean;
  allowHyphenSlash?: boolean;
};

export const Input: FunctionComponent<FieldAttributes<MyTextFieldProps>> = ({
  placeholder,
  disabled,
  testId,
  labelTestId,
  prepend,
  label,
  numeric,
  nonNumeric,
  noSpecialCharacters,
  noEmoji,
  maxLength,
  upperCase,
  InputProps,

  noSpace,
  allowHyphenSlash,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const { labelName, ...rest } = props;

  const [type, setType] = useState(
    field.name === "password" ? "password" : props.type
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {labelName && (
        <Typography data-testid={labelTestId} fontSize={18} fontWeight={400}>
          {labelName}
        </Typography>
      )}
      <Box display={"flex"} height="100%">
        {prepend && (
          <Typography
            fontSize={{ xs: 16, xl: 21 }}
            color="tertiary.gray"
            mr={1}
            mt={{ xs: 0.5, xl: 1 }}
          >
            {prepend}
          </Typography>
        )}
        <Box width="100%">
          <TextField
            type={type}
            variant={"standard"}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            label={label}
            error={!!errorText}
            helperText={snakeToCapitalizeCase(errorText) || " "}
            color="secondary"
            FormHelperTextProps={{
              className: props.helperClassName,
            }}
            autoComplete="new-password"
            data-testid={testId}
            inputProps={{
              ...(numeric && {
                pattern: "[0-9]*",
              }),
            }}
            onPaste={(event) => event.preventDefault()}
            InputProps={{
              endAdornment: (
                <>
                  {field.name === "password" && (
                    <>
                      {type === "password" && (
                        <VisibilityOutlined
                          onClick={() => setType(props.type || "text")}
                          sx={{
                            mr: 1,
                            cursor: "pointer",
                          }}
                        />
                      )}
                      {type === "text" && (
                        <VisibilityOffOutlined
                          onClick={() => setType("password")}
                          sx={{
                            mr: 1,
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </>
                  )}
                  {errorText ? (
                    <>
                      <Error color="error" />
                    </>
                  ) : (
                    meta.touched &&
                    !props.hideTick && (
                      <CheckCircle sx={{ color: "neutral.main" }} />
                    )
                  )}
                </>
              ),
              sx: {
                fontSize: 18,
                borderBottom: "1px solid",
                borderColor: "primary.400",
              },
              disableUnderline: true,
              ...InputProps,
            }}
            {...field}
            onChange={(e) => {
              if (noEmoji && hasEmoji(e.target.value)) return;
              if (numeric && Number.isNaN(+e.target.value)) return;
              if (
                nonNumeric &&
                "0123456789"
                  .split("")
                  .some((char) => e.target.value.includes(char))
              )
                return;
              if (
                noSpecialCharacters &&
                "`¦¬¤¾½¼·±«»¡¿¶£¢¥°©®~÷×§€!@#$%^&*()_+-=[]\\{}|;':\",./<>?"
                  .split("")
                  .some((char) => {
                    if (allowHyphenSlash && (char === "-" || char === "/"))
                      return false;
                    return e.target.value.includes(char);
                  })
              )
                return;
              if (maxLength && e.target.value.length > maxLength) return;
              if (e.target.value.startsWith(" ")) return;

              if (upperCase) {
                e.target.value = e.target.value.toUpperCase();
              }
              field.onChange(e);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" ||
                e.key === "Tab" ||
                e.key === "Enter" ||
                e.key === "Escape" ||
                e.key === "Arrow" ||
                e.ctrlKey ||
                e.altKey ||
                e.metaKey
              ) {
                return;
              }
              if (noSpace && e.key === " ") {
                e.preventDefault();
              }
              if (
                numeric &&
                !"0123456789".split("").some((char) => e.key.includes(char))
              )
                e.preventDefault();
              if (noEmoji && hasEmoji(e.key)) e.preventDefault();
              if (
                nonNumeric &&
                "0123456789".split("").some((char) => e.key.includes(char))
              )
                e.preventDefault();
              if (
                noSpecialCharacters &&
                "`¦¬¤¾½¼·±«»¡¿¶£¢¥°©®~÷×§€!@#$%^&*()_+-=[]\\{}|;':\",./<>?"
                  .split("")
                  .some((char) => {
                    if (allowHyphenSlash && (char === "-" || char === "/"))
                      return false;
                    return e.key.includes(char);
                  })
              )
                e.preventDefault();
            }}
            {...rest}
          />
        </Box>
      </Box>
    </Box>
  );
};
