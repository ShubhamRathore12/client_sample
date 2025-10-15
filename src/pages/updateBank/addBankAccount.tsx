import React, { useState, useEffect, useRef } from "react";
import { Backdrop, Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Replacing Next.js router
import toast from "react-hot-toast";
import { apiService } from "../../services/api.service";
import ContentBox from "../../components/common/ContentBox";
import { LoaderBackdrop } from "../../components/common/LoaderBackdrop";
import {
  setBankFormType,
  setEsignData,
  setPayLink,
  setStausResponse,
} from "../../slices/app";
import PublicLayout from "../../components/layouts/PublicLayout";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";

// Custom components

const POLL_INTERVAL = 5000; // 5 seconds

const AddBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate instead of Next.js router
  const theme = useTheme();

  const [paymentLoader, setPaymentLoader] = useState(false);
  const [countdownText, setCountdownText] = useState("02:00");
  const [expiresAt, setExpiresAt] = useState(null);
  let paymentWindow: Window | null = null;
  const pollingRef = useRef(null);
  const countdownRef = useRef(null);

  const handleUPI = async () => {
    try {
      setPaymentLoader(true);
      const res = await apiService.getBankPayVerificationLink();

      const link = res?.link;
      const expires = res?.expiresAt;
      const id = res?.id;

      dispatch(setPayLink(res));
      if (!link || !expires) throw new Error("Invalid response");

      setExpiresAt(new Date(expires));
      // window.open(link, "_blank");
      paymentWindow = window.open(link, "_blank");

      if (
        !paymentWindow ||
        paymentWindow.closed ||
        typeof paymentWindow.closed === "undefined"
      ) {
        throw new Error(
          "Popup was blocked. Please allow popups for this site to continue."
        );
      }

      startCountdownTimer(new Date(expires));
      startPolling(id);
    } catch (err) {
      extractErrorAndShowToast(err);
      setPaymentLoader(false);
    }
  };

  const startCountdownTimer = (expires: any) => {
    if (countdownRef.current) clearInterval(countdownRef.current);

    countdownRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const expireTime = new Date(expires).getTime();
      const diff = expireTime - now;

      if (diff <= 0) {
        setCountdownText("Expired");
        stopAll();
        showSingleToast.error("Session expired. Please try again.");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setCountdownText(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`
      );
    }, 1000);
  };

  const startPolling = (id: any) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const response: any = await apiService.getBankPayVerificationStatus({
          id: id,
        });

        dispatch(setStausResponse(response));
        const status: string = response?.status;

        if (!status) return;

        if (status === "SUCCESS") {
          stopAll();
          dispatch(setBankFormType("EDIT"));
          navigate("/updateBank/updateForm");
          // const bankProofRequired =
          //   response?.data?.nextSteps?.BankProof?.required;
          // const payload = {
          //   toProceed: {
          //     target: "BANK_ACCOUNT",
          //     ids: [Number(response?.data?.id)],
          //   },
          // };
          // const esignData = await apiService.proceedWithEsignBankAccount(
          //   payload
          // );
          // dispatch(setEsignData(esignData));
          // // if (bankProofRequired) {
          // //   navigate("/updateBank/uploadProof");
          // // } else {
          // navigate("/updateBank/esign");
          // }
        } else if (status === "FAILED") {
          const manualRequired = response?.nextSteps?.ManualBankEntry?.required;
          const bankProofRequired = response?.nextSteps?.BankProof?.required;
          stopAll();
          // showSingleToast.error("UPI verification failed. Please try again.");
          showSingleToast.error(response?.msg || "Bank verification failed.");
          if (bankProofRequired) {
            navigate("/updateBank/uploadProof");
          }
          if (manualRequired) {
            navigate("/updateBank/updateForm");
          }
        }
      } catch (err) {
        stopAll();
        extractErrorAndShowToast(err);
      }
    }, POLL_INTERVAL);
  };

  const stopAll = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (paymentWindow && !paymentWindow.closed) {
      paymentWindow.close();
    }
    setPaymentLoader(false);
  };

  useEffect(() => {
    dispatch(setBankFormType("ADD"));
    return () => {
      stopAll();
    };
  }, []);

  return (
    <PublicLayout>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <ContentBox isBoxShadow={false} sx={{ width: { md: "570px" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Select how you want to add bank details
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleUPI}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              Verify via UPI
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/updateBank/updateForm")}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              Enter Details Manually
            </Button>
          </Box>
        </ContentBox>

        {paymentLoader && (
          <LoaderBackdrop
            text={countdownText}
            processing={paymentLoader}
            processingText="Processing, please go to the popup window"
          />
        )}
      </Box>
    </PublicLayout>
  );
};

export default AddBank;
