import React from "react";
import { Button, useTheme } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); //

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      if (location.pathname === "/cdu/requestedEntries") {
        navigate("/cdu/dashboard");
      } else if (location.pathname === "/cdu/updateContact/esign") {
        navigate(-2);
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="outlined"
      startIcon={<ArrowBackIosNew fontSize="small" />}
      sx={{
        position: "absolute",
        top: "10rem",
        left: "2rem",
        borderRadius: "999px",
        textTransform: "none",
        paddingX: 2.5,
        paddingY: 1,
        fontWeight: 500,
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: "transparent",
          borderColor: theme.palette.text.primary,
        },
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
