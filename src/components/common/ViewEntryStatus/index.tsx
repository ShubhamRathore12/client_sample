import { Box, Button, Theme, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiService } from "../../../services/api.service";
import { setEsignData } from "../../../slices/app";
import { useNavigate } from "react-router-dom";
import extractErrorAndShowToast from "../../../utils/extract-error";
import { showSingleToast } from "../../../utils/toast-util";

type Props = {
  statusText?: string;
  requestType?: string;
  delayText?: string;
};

export const getStatusStyle = (status: string, theme: Theme) => {
  switch (status) {
    case "APPROVED":
      return {
        border: `1px solid ${theme.palette.text.green}`,
        backgroundColor: theme.palette.text.greenBackground,
        color: theme.palette.text.green,
      };
    case "REJECTED":
    case "CANCELLED":
      return {
        border: `1px solid ${theme.palette.text.red}`,
        backgroundColor: theme.palette.text.redBackground,
        color: theme.palette.text.red,
      };
    case "WAITING_FOR_APPROVAL":
    case "DRAFT":
    case "VERIFIED":
    case "ESIGN_INITIATED":
      return {
        border: `1px solid ${theme.palette.text.yellow}`,
        backgroundColor: theme.palette.text.yellowBackground,
        color: theme.palette.text.yellow,
      };
    default:
      return {
        border: `1px solid ${theme.palette.text.gray}`,
        backgroundColor: theme.palette.text.grayBackground,
        color: theme.palette.text.gray,
      };
  }
};

// const DEFAULT_REQUEST_ALL_TYPE =
//   "phone number/email/bank details/nominee changes/segment addition";

// const DEFAULT_DAYS = "You have to wait for 2 days before requesting another change";

const ViewEntryStatus = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusText } = props;
  const delayText = useSelector((state: any) => state.app?.delayText);
  const rejectionText = useSelector((state: any) => state.app?.rejectionText);
  const requestType = useSelector((state: any) => state.app?.requestType);

  const theme = useTheme();
  const statusStyle = getStatusStyle(statusText, theme);
  const [showButton, setShowButton] = useState(
    statusText === "ESIGN_INITIATED"
  );

  const proceedWithEsign = async () => {
    setLoading(true);
    try {
      let target = "CONTACT";
      let route = "/updateContact/esign";
      if (
        requestType.includes("phone") ||
        requestType.includes("mobile") ||
        requestType.includes("email")
      ) {
        target = "CONTACT";
        route = "/updateContact/esign";
      } else if (requestType.includes("nominee")) {
        target = "NOMINEE";
        route = "/updateNominee/esign";
      } else if (requestType.includes("bank")) {
        target = "BANK_ACCOUNT";
        route = "/updateBank/esign";
      } else {
        target = "CONTACT";
        route = "/updateContact/esign";
      }
      const response: any = await apiService.changeRequestEsignProceed(target);
      if (response?.data?.esign) {
        dispatch(setEsignData(response?.data?.esign));
        navigate(route);
      } else {
        showSingleToast(response.msg);
        setShowButton(false);
      }
    } catch (error) {
      extractErrorAndShowToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        marginTop: { xs: 2, md: 10 },
        paddingX: {xs: 2, md: 8},
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, textAlign: "center" }}
        >
          {`We have received your request to update your ${requestType}`}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {delayText}
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Your current status is:
        </Typography>
        <Box
          sx={{
            mt: 1,
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            fontWeight: 500,
            textTransform: "capitalize",
            width: {xs: "280px", md: "450px"},
            ...statusStyle,
          }}
        >
          {statusText.replaceAll("_", " ").toUpperCase()}
        </Box>
         {statusText === "REJECTED" && (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            REASON: {rejectionText}
          </Typography>
        )}
        {showButton && (
          <Button fullWidth onClick={proceedWithEsign}>
            {loading ? "Proceeding to Esign" : "Complete E-Sign"}
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default ViewEntryStatus;
