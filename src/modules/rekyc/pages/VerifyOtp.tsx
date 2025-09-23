import React, { useState, useCallback } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useResendTimer } from "../../../hooks/useResendTimer";
import { apiService } from "../../../services/api.service";
import {
  setCombinedUserData,
  setFormTexts,
  setMultipleUser,
  setUser,
} from "../../../slices/app";

import StyledOTPInput from "../../../components/common/StyledOTPInput";
import StyledCenterBox from "../../../components/common/CenterBox";
import Error from "../../../components/common/Error";

import SMCLogo from "../../../assests/assets/SMCLogo.svg";
import OTPImg from "../../../assests/assets/otp.svg";
import Tick from "../../../assests/assets/Tick.svg";
import Clock from "../../../assests/assets/clock.svg";
import extractErrorAndShowToast from "../../../utils/extract-error";
import { showSingleToast } from "../../../utils/toast-util";
import extractError from "../../../utils/extract-error-only";

const RekycVerifyOtp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const lastResendTimeRef = React.useRef<number | null>(null);

  const userData = useSelector((state: any) => state.app.userData);
  const otpResponse = useSelector((state: any) => state.app.otpResponse);
  const { timer, isResendDisabled, startTimer, setIsResendDisabled } =
    useResendTimer({
      duration: 60,
    });

  const handleResend = useCallback(async () => {
    if (isResendDisabled) return;

    const now = Date.now();
    if (lastResendTimeRef.current && now - lastResendTimeRef.current < 2000) {
      return;
    }
    lastResendTimeRef.current = now;

    setIsResendDisabled(true);
    setOtp("");
    setErrorMessage("");
    setIsOtpVerified(null);
    try {
      setLoading(true);
      await apiService.sendOtp(`${userData?.type}=${userData?.target}`);
      startTimer();
      showSingleToast("OTP resent successfully");
    } catch (err: any) {
      setErrorMessage(err.message);
      extractErrorAndShowToast(err);
    } finally {
      setLoading(false);
    }
  }, [isResendDisabled, startTimer, userData?.target]);

  const handleVerify = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (otp.length < 6) return;

      setErrorMessage("");
      setLoading(true);

      try {
        const response = await apiService.verifyOtp({
          target: userData?.target,
          type: userData?.type,
          otp: otp,
        });

        if (response) {
          setIsOtpVerified(true);
          showSingleToast("OTP verified successfully");

          const users = await apiService.getUserList();
          dispatch(setMultipleUser(users));
          if (users.length > 1) {
            navigate("/rekyc/client-list");
          } else {
            dispatch(setUser(users[0]));
            navigate("/rekyc/dashboard");
          }
        } else {
          setIsOtpVerified(false);
          showSingleToast.error("Getting error in OTP verification");
          setErrorMessage("Unexpected response from server.");
        }
      } catch (err: any) {
        setIsOtpVerified(false);

        const apiMsg = extractError(
          err,
          "Failed to verify OTP. Please try again."
        );
        setErrorMessage(apiMsg);
        extractErrorAndShowToast(err);
      } finally {
        setLoading(false);
      }
    },
    [otp, userData, navigate, dispatch]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4A90E2 0%, #7BB3F0 100%)",
      }}
    >
      <img src={SMCLogo} alt="SMC Logo" width={200} height={60} />

      <form onSubmit={handleVerify}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            boxShadow: "0px 8px 32px rgba(74, 144, 226, 0.3)",
            borderRadius: 2,
            width: { xs: 350, md: 440 },
            minHeight: { xs: "75vh", md: 500 },
            backgroundColor: "white",
            border: "1px solid rgba(74, 144, 226, 0.2)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <img
              src={OTPImg}
              alt="OTP logo"
              width={50}
              height={50}
              style={{ alignSelf: "flex-start" }}
            />

            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              Please enter the OTP sent to{" "}
              {userData?.type === "mobile" ? (
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {otpResponse?.data?.maskedMobile}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, wordWrap: "break-word" }}
                >
                  {`${otpResponse?.data?.maskedMobile} & ${otpResponse?.data?.maskedEmail}`}
                </Typography>
              )}
            </Typography>

            <StyledOTPInput
              error={isOtpVerified === false}
              value={otp}
              onChange={(val: string) => setOtp(val)}
              isInputNumber
              numInputs={6}
              shouldAutoFocus
            />

            {isOtpVerified ? (
              <StyledCenterBox sx={{ alignSelf: "start" }}>
                <Typography variant="h6">OTP Verified</Typography>
                <img src={Tick} alt="Verified" width={18} height={18} />
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
                  Didn't get the code?{" "}
                  <span
                    style={{
                      fontWeight: 600,
                      color: isResendDisabled
                        ? theme.palette.text.disabled
                        : "#4A90E2",
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

            {errorMessage && <Error error={errorMessage} />}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              onClick={handleVerify}
              disabled={otp.length < 6 || loading}
              sx={{
                background: "linear-gradient(45deg, #4A90E2 30%, #7BB3F0 90%)",
                color: "white",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(45deg, #3A7BC8 30%, #6BA3E0 90%)",
                },
                "&:disabled": {
                  background: "#ccc",
                },
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
              Entered wrong Number/ Client Id ?{" "}
              <Typography
                variant="subtitle2"
                component="span"
                onClick={() => {
                  navigate("/rekyc");
                }}
                sx={{ color: "#4A90E2", cursor: "pointer" }}
                data-testid={`title__re-enter`}
              >
                Re-enter
              </Typography>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RekycVerifyOtp;