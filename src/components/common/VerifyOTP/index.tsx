"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";

import { useState, useCallback } from "react";
import StyledOTPInput from "../../../components/common/StyledOTPInput";
import { useResendTimer } from "../../../hooks/useResendTimer";
import Error from "../../../components/common/Error";
import StyledCenterBox from "../../../components/common/CenterBox";
import { apiService } from "../../../services/api.service";
import { useDispatch } from "react-redux";
import { setEsignData } from "../../../slices/app";
import { useNavigate } from "react-router-dom";
import React from "react";
import Clock from "../../../assests/assets/clock.svg";
import { showSingleToast } from "../../../utils/toast-util";
import extractErrorAndShowToast from "../../../utils/extract-error";
import extractError from "../../../utils/extract-error-only";
// import Tick from "../../../assests/assets/Tick.svg";

interface VerifyOTPProps {
  type: "mobileNumber" | "email" | "mobileAndEmail";
  regMobile?: string;
  regEmail?: string;
}

const DEFAULT_ERROR = {
  error: "",
  type: { emailError: false, mobileError: false },
};

const VerifyOTP = ({ type, regMobile, regEmail }: VerifyOTPProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);
  const lastResendTimeRef = React.useRef<number | null>(null);

  const { timer, isResendDisabled, startTimer, setIsResendDisabled } =
    useResendTimer({
      duration: 60,
    });

  const handleResend = useCallback(async () => {
    if (isResendDisabled) return;
    const now = Date.now();
    if (lastResendTimeRef.current && now - lastResendTimeRef.current < 2000) {
      showSingleToast.error("Please wait a few seconds before resending.");
      return;
    }
    lastResendTimeRef.current = now;

    setIsResendDisabled(true);
    setErrorMessage(DEFAULT_ERROR);
    setMobileOtp("");
    setEmailOtp("");
    setIsOtpVerified(null);
    try {
      setLoading(true);
      let phone = undefined;
      let email = undefined;

      if (type === "email") {
        email = regEmail;
      } else if (type === "mobileNumber") {
        phone = regMobile;
      } else if (type === "mobileAndEmail") {
        email = regEmail;
        phone = regMobile;
      }

      await apiService.sendContactUpdateOtp(phone, email);

      // await apiService.sendContactUpdateOtp(`${params.toString()}`);
      startTimer();
      showSingleToast("OTP resent successfully");
    } catch (err: any) {
      setErrorMessage((prev) => ({
        ...prev,
        error: err.message,
      }));
      extractErrorAndShowToast(err);
    } finally {
      setLoading(false);
    }
  }, [isResendDisabled, startTimer, type, regEmail, regMobile]);

  const handleVerify = async () => {
    if (
      (type === "mobileNumber" && mobileOtp.length < 6) ||
      (type === "email" && emailOtp.length < 6) ||
      (type === "mobileAndEmail" &&
        (mobileOtp.length < 6 || emailOtp.length < 6))
    ) {
      return;
    }
    setLoading(true);
    setErrorMessage(DEFAULT_ERROR);
    try {
      const toVerify: {
        mobile?: string;
        mobileOtp?: string;
        email?: string;
        emailOtp?: string;
      } = {};

      if (type === "mobileNumber" || type === "mobileAndEmail") {
        toVerify.mobile = regMobile;
        toVerify.mobileOtp = mobileOtp;
      }

      if (type === "email" || type === "mobileAndEmail") {
        toVerify.email = regEmail;
        toVerify.emailOtp = emailOtp;
      }

      const response = await apiService.verifyContactOtpAndProceed({
        toVerify,
        toProceed: {
          target:
            type === "email"
              ? "EMAIL"
              : type === "mobileNumber"
              ? "MOBILE"
              : "CONTACT",
        },
      });

      if (response?.esign) {
        dispatch(setEsignData(response.esign));
      }
      setIsOtpVerified(true);
      navigate("/cdu/updateContact/esign");
    } catch (err: any) {
      const apiMsg = extractError(
        err,
        "Failed to verify OTP. Please try again."
      );
      const errorTypes = err?.error?.data;
      setErrorMessage({
        error: apiMsg,
        type: errorTypes,
      });
      extractErrorAndShowToast(err);
      setIsOtpVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const getDisabledState = (): boolean => {
    if (loading) return true;

    return type === "email"
      ? emailOtp.length < 6
      : type === "mobileNumber"
      ? mobileOtp.length < 6
      : mobileOtp.length < 6 || emailOtp.length < 6;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          boxShadow: { md: "0px 4px 15px rgba(0,0,0,0.14)" },
          borderRadius: 2,
          width: { xs: 350, md: 440 },
          minHeight: { xs: "75vh", md: 500 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {(type === "mobileNumber" || type === "mobileAndEmail") && (
            <>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                Enter OTP sent to your new Mobile{" "}
                <strong style={{ wordBreak: "break-word" }}>{regMobile}</strong>
              </Typography>

              <StyledOTPInput
                error={errorMessage?.type?.mobileError}
                value={mobileOtp}
                onChange={(val) => setMobileOtp(val)}
                isInputNumber
                numInputs={6}
                shouldAutoFocus
              />
            </>
          )}

          {(type === "email" || type === "mobileAndEmail") && (
            <>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                Enter OTP sent to your new Email{" "}
                <strong style={{ wordBreak: "break-word" }}>{regEmail}</strong>
              </Typography>

              <StyledOTPInput
                error={errorMessage?.type?.emailError}
                value={emailOtp}
                onChange={(val) => setEmailOtp(val)}
                isInputNumber
                numInputs={6}
                shouldAutoFocus
              />
            </>
          )}

          {isOtpVerified ? (
            <StyledCenterBox sx={{ alignSelf: "start" }}>
              <Typography variant="h6">OTP Verified</Typography>
              {/* <img src={Tick} alt="Verified" width={18} height={18} /> */}
            </StyledCenterBox>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "0.875rem" }}>
                Didn’t get the code?{" "}
                <span
                  style={{
                    fontWeight: 600,
                    color: isResendDisabled
                      ? theme.palette.text.disabled
                      : theme.palette.text.info,
                    cursor: isResendDisabled ? "not-allowed" : "pointer",
                  }}
                  onClick={handleResend}
                >
                  {loading ? "Sending..." : "Resend OTP"}
                </span>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <img src={Clock} alt="Timer" width={19} height={19} />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "0.875rem",
                  }}
                >
                  {timer}s
                </Typography>
              </Box>
            </Box>
          )}

          {errorMessage?.error && <Error error={errorMessage?.error} />}
        </Box>
        <Button fullWidth onClick={handleVerify} disabled={getDisabledState()}>
          {loading ? "Verifying" : "Verify OTP"}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyOTP;
