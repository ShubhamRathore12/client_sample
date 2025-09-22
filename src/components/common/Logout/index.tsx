import {
  Backdrop,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../services/api.service";
import { setLogoutPopupState } from "../../../slices/app";
import PCLogo from "../../../assests/assets/PcLogo.svg";
import LogoutConfirm from "../../../assests/assets/LogoutConfirm.svg";
import { showSingleToast } from "../../../utils/toast-util";
import extractErrorAndShowToast from "../../../utils/extract-error";

const Logout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => dispatch(setLogoutPopupState(false));
  const handleClick = async () => {
    try {
      await apiService.logout();
      showSingleToast("Logout successfully");
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
      dispatch(setLogoutPopupState(false));
    } catch (err) {
       extractErrorAndShowToast(err);
    }
  };
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Backdrop open sx={{ zIndex: "tooltip" }} onClick={handleClose}>
      {isAboveMd ? (
        // Desktop view
        <Box
          sx={{
            width: "422px",
            background: theme.palette.background.default,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onClick={(e) => e.stopPropagation()} // prevent backdrop close
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: theme.palette.text.primary }}
          >
            Login Session
          </Typography>
          <Box
            sx={{
              borderRadius: "6px",
              border: `1px solid ${theme.palette.background.border}`,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img src={PCLogo} alt="PC Logo" width={50} height={50} />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: theme.palette.text.primary }}
              >
                This PC
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.success }}
              >
                Active Now
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={
              <img
                src={LogoutConfirm}
                alt="Logout Icon"
                width={20}
                height={20}
              />
            }
            sx={{
              color: theme.palette.error.main,
              width: "100%",
              borderColor: theme.palette.error.main,
              ":hover": {
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
                backgroundColor: "transparent",
              },
            }}
            onClick={handleClick}
          >
            Logout
          </Button>
          <Button fullWidth variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      ) : (
        // Mobile view
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: theme.palette.background.default,
            borderTop: `1px solid ${theme.palette.divider}`,
            padding: 2,
            zIndex: "modal",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          onClick={(e) => e.stopPropagation()} // prevent backdrop close
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
              textAlign: "left",
            }}
          >
            Are you sure! you want to logout?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { md: "space-between" },
              gap: 2,
              flexDirection: { xs: "row-reverse", md: "row" },
            }}
          >
            <Button
              variant={isAboveMd ? "outlined" : "text"}
              fullWidth={isAboveMd}
              sx={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
                ":hover": {
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleClick}
            >
              {isAboveMd ? "Logout" : "Yes"}
            </Button>
            <Button
              variant={isAboveMd ? "contained" : "text"}
              fullWidth={isAboveMd}
              onClick={handleClose}
            >
              {isAboveMd ? "Close" : "Cancel"}
            </Button>
          </Box>
        </Box>
      )}
    </Backdrop>
  );
};

export default Logout;
