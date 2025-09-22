import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiService } from "../services/api.service";
import { setOtpResponseData, setUserData } from "../slices/app";
// Replace with actual paths or imports as needed
import SMCLogo from "../assests/assets/SMCLogo.svg";
import LoginImg from "../assests/assets/login.svg";
import extractErrorAndShowToast from "../utils/extract-error";
import { showSingleToast } from "../utils/toast-util";
import extractError from "../utils/extract-error-only";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState({
    error: "",
    loading: false,
  });

  const isMobileNumber = (input) => /^\d{10}$/.test(input);
  const isClientId = (input) => /^[a-zA-Z0-9]{7}$/.test(input);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedInput = userInput.trim();

    if (!trimmedInput) {
      setStatus({ error: "This field is required", loading: false });
      return;
    }

    let queryParam = "";

    if (isMobileNumber(trimmedInput)) {
      dispatch(setUserData({ type: "mobile", target: trimmedInput }));
      queryParam = `mobile=${encodeURIComponent(trimmedInput)}`;
    } else if (isClientId(trimmedInput)) {
      dispatch(setUserData({ type: "clientId", target: trimmedInput }));
      queryParam = `clientId=${encodeURIComponent(trimmedInput)}`;
    } else {
      setStatus({
        error: "Enter a valid 10-digit mobile number or 7-character Client ID",
        loading: false,
      });
      return;
    }

    setStatus({ error: "", loading: true });

    try {
      const response: any = await apiService.sendOtp(queryParam);

      if (response) {
        dispatch(setOtpResponseData(response));
        showSingleToast(response?.msg ? response.msg : "OTP sent successfully");
        navigate("/verifyOTP");
      } else {
        showSingleToast.error("Failed to send OTP");
        setStatus({ error: "Failed to send OTP", loading: false });
      }
    } catch (err) {
      extractErrorAndShowToast(err);

      setStatus({
        error: extractError(err, "Failed to send OTP"),
        loading: false,
      });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* <img src={SMCLogo} alt="SMC Logo" width={200} height={60} /> */}
      <img src={SMCLogo} alt="SMC Logo" width={180} height={60} />

      <form onSubmit={handleLogin}>
        <Box
          sx={{
            paddingX: 3,
            paddingY: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            boxShadow: { md: "0px 4px 15px rgba(0, 0, 0, 0.14)" },
            borderRadius: "8px",
            width: { xs: "360px", md: "440px" },
            minHeight: { xs: "75vh", md: "500px" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <img
              src={LoginImg}
              alt="Login icon"
              width={50}
              height={50}
              style={{ alignSelf: "flex-start" }}
            />

            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Enter Your Mobile Number / Client ID
            </Typography>

            <TextField
              id="login-input"
              placeholder="Mobile Number / Client ID"
              variant="outlined"
              value={userInput}
              onChange={(e) => {
                const raw = e.target.value;
                const cleaned = raw.replace(/[^a-zA-Z0-9]/g, ""); // only alphanumeric
                const uppercased = cleaned.toUpperCase(); // convert to uppercase
                const trimmed = uppercased.slice(0, 10); // enforce max length
                setUserInput(trimmed);
              }}
              error={!!status.error}
              helperText={status.error}
              fullWidth
              inputProps={{
                minLength: 3,
                maxLength: 10,
              }}
            />

            <Typography variant="h6">
              You will receive an{" "}
              <span
                style={{
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                }}
              >
                OTP
              </span>{" "}
              on your registered mobile number and email.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              disabled={!userInput.trim() || status.loading}
              onClick={handleLogin}
            >
              {status.loading ? "Sending OTP..." : "Send OTP"}
            </Button>
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
              By logging in, you agree to the{" "}
              <Link
                underline="always"
                color="primary.main"
                href="https://www.stoxkart.com/privacy-policy/"
                target="_blank"
              >
                Terms & Conditions
              </Link>{" "}
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
