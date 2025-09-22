import { styled } from "@mui/material/styles";
import OtpInput from "react-otp-input";
import { forwardRef } from "react";
import React from "react";

const StyledContainer = styled("div")<{ error?: boolean; success?: boolean }>(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  })
);

const StyledInput = styled("input")<{ error?: boolean; success?: boolean }>(
  ({ theme, error, success }) => ({
    padding: "8px",
    minWidth: "50px !important",
    minHeight: "50px !important",
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    backgroundColor: error
      ? theme.palette.error.light
      : success
      ? theme.palette.success.light
      : "transparent",
    borderRadius: "4px",
    border: `1px solid ${
      error
        ? theme.palette.text.error
        : success
        ? theme.palette.success.main
        : theme.palette.grey?.[300] ?? "#ccc"
    }`,
    color: error
      ? theme.palette.text.error
      : success
      ? theme.palette.success.main
      : theme.palette.text.secondary,
    outline: "none",
    fontSize: "18px",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      minWidth: "38px !important",
      minHeight: "38px !important",
      fontSize: "16px",
      marginRight: theme.spacing(1.2),
    },
  })
);

interface StyledOTPInputProps {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  disabled?: boolean;
  isInputNumber?: boolean;
  shouldAutoFocus?: boolean;
}

const StyledOTPInput = forwardRef<HTMLDivElement, StyledOTPInputProps>(
  ({ error, success, numInputs = 6, isInputNumber, ...props }, ref) => {
    return (
      <StyledContainer ref={ref} error={error} success={success}>
        <OtpInput
          {...props}
          numInputs={numInputs}
           inputType="tel" 
          renderInput={(props) => (
            <StyledInput {...props} error={error} success={success} />
          )}
        />
      </StyledContainer>
    );
  }
);

StyledOTPInput.displayName = "StyledOTPInput";

export default StyledOTPInput;
