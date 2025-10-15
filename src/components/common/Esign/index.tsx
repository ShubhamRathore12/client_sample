import React from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import ContentBox from "../ContentBox";
import { LoaderBackdrop } from "../LoaderBackdrop";
import { DigioOptions } from "../../../types/digio";
import { useSelector } from "react-redux";
import {
  useNavigate,
  useLocation as useRouterLocation,
} from "react-router-dom";
import useLocation from "../../../hooks/location";
import { getGeolocation } from "../../../utils/geolocation";
import handleError from "../../../utils/error-handler";
import PublicLayout from "../../layouts/PublicLayout";
// Import the Digio SDK - it's likely a script that adds to window object
import "../../../assests/digio/sdk.v10.digio";
import { apiService } from "../../../services/api.service";
import { showSingleToast } from "../../../utils/toast-util";

// Extended window interface for Digio
declare global {
  interface Window {
    Digio?: new (options: DigioOptions) => any;
  }
}

const Esign = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { location } = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [agreed, setAgreed] = React.useState(true);
  const esignData = useSelector((state: any) => state.app.esignData);
  const [response, setResponse] = React.useState(null);

  const openDigioSDK = React.useCallback(
    (currentRes) => {
      // Check if Digio SDK is available
      if (!window.Digio) {
        showSingleToast.error(
          "E-signature service not available. Please refresh the page."
        );
        return;
      }

      try {
        const options = {
          environment: "production",
          callback: async (response: any) => {
            setProcessing(false);
            setLoading(true);

            if (response.error_code) {
              showSingleToast.error(response.message);
              setLoading(false);
            } else {
              await apiService.esignCheck(esignData?.id);
              showSingleToast(response.message);
              navigate("/requestedEntries");
            }
          },
        };

        // Use the Digio SDK from window object
        const digioSDK = new window.Digio(options as any);
        digioSDK.init();
        digioSDK.submit(
          currentRes.document_id,
          currentRes.customer_identifier,
          currentRes.access_token
        );
        setProcessing(true);
      } catch (error) {
        if (
          error instanceof Error &&
          !axios.isAxiosError(error) &&
          error.name === "TypeError"
        ) {
          handleError(
            new Error(
              "It seems that you have an adblocker or popup blocker enabled. Please allow popups to continue further"
            )
          );
        } else {
          console.error("Error initializing Digio SDK:", error);
          showSingleToast.error("Failed to initialize e-signature service");
          setProcessing(false);
        }
      }
    },
    [navigate]
  );

  const startDigioSDK = async () => {
    setLoading(true);
    try {
      let currentLocation = location;
      if (!currentLocation?.latitude || !currentLocation?.longitude) {
        const [err, coords] = await getGeolocation();
        if (err) {
          showSingleToast.error(
            err.code === err.PERMISSION_DENIED
              ? "Please allow location in browser settings and refresh the page"
              : err.message,
            { duration: 20000 }
          );
          return;
        }
        currentLocation = coords
          ? {
              latitude: coords.latitude,
              longitude: coords.longitude,
            }
          : location;
      }

      const digioData = {
        document_id: esignData.docId,
        access_token: esignData.tokenId,
        customer_identifier: esignData.signerId,
      };
      setResponse(digioData as any);
      openDigioSDK(digioData);
    } catch (error) {
      if (
        error instanceof Error &&
        !axios.isAxiosError(error) &&
        error.name === "TypeError" &&
        error.stack?.includes("window.Digio")
      ) {
        handleError(
          new Error(
            "It seems that you have an adblocker or popup blocker enabled. Please allow popups to continue further"
          )
        );
      } else {
        handleError(error);
      }
      setError(
        error.response?.data?.error || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const product = new URLSearchParams(routerLocation.search).get("product");

  return (
    <PublicLayout>
      <ContentBox component="form" sx={{ marginTop: "2rem", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {loading && <LoaderBackdrop />}

          <Box
            sx={{
              minHeight: { xs: "100%", md: "100%" },
              height: { xs: "100%", md: "100%" },
              pt: { xs: 4, sm: 0 },
              pb: { xs: 2, sm: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                marginBottom: "2rem",
                border: "1px solid",
                textAlign: "center",
                padding: 0.5,
                borderRadius: 2,
                background: theme.palette?.background?.border,
              }}
            >
              <Typography variant="h6" sx={{color: theme.palette.text.primary}}>
                <strong>NOTE:</strong> Kindly enable your location services to proceed with
                esign.
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Digitally sign the documents required to update your CDU request
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {processing && (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>
                  Processing, please go to the popup window
                </Typography>
              </Box>
            )}

            <Box sx={{ marginTop: "2rem" }}>
              {!processing && (
                <>
                  <FormControlLabel
                    label={
                      <Stack>
                        <Typography
                          sx={{ fontWeight: 500, fontSize: "13px !important" }}
                        >
                          I am fine with requesting a change for my submitted
                          entry and am willing to complete the e-sign process
                        </Typography>
                      </Stack>
                    }
                    control={
                      <Checkbox
                        sx={{
                          py: 0,
                          "&.Mui-checked": { color: "primary.green" },
                        }}
                        checked={agreed}
                        onChange={(_, checked) => setAgreed(checked)}
                      />
                    }
                    sx={{ alignItems: "start", mb: 1 }}
                  />
                  {/* <Typography sx={{ fontSize: 10 }}>
                    • I agree to standing instructions of the online account
                    opening journey of Stoxkart.
                  </Typography>
                  <Typography sx={{ fontSize: 10 }}>
                    • I agree to the most important terms and conditions of
                    Stoxkart.
                  </Typography>
                  <Typography sx={{ fontSize: 10 }}>
                    • I agree to the DP charges of Stoxkart.
                  </Typography>
                  {product?.toLowerCase() !== "demat" && (
                    <Typography sx={{ fontSize: 10 }}>
                      • I agree to activate DDPI
                    </Typography>
                  )}
                  <Typography sx={{ fontSize: 10 }}>
                    • I understand the policies and procedures of Stoxkart.
                  </Typography> */}
                  <Typography sx={{ fontSize: 10 }}>
                    • Changes will take upto 2 working days after successful
                    acceptance of change request.
                  </Typography>
                </>
              )}
              <Button
                onClick={startDigioSDK}
                fullWidth
                sx={{ marginTop: "2rem" }}
                variant="contained"
                disabled={!agreed}
              >
                Submit & Esign
              </Button>
            </Box>
          </Box>
        </Box>
      </ContentBox>
    </PublicLayout>
  );
};

export default Esign;
