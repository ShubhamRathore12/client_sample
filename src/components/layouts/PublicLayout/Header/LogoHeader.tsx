import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SMCLogo from "../../../../assests/assets/SMCLogo.svg";

const LogoHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/project-selection");
  };

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        paddingX: 5,
        paddingY: 1,
        width: "100%",
        height: "10%",
        position: "sticky",
        top: 0,
        zIndex: 999,
        boxShadow: `0px 4px 14px 0px ${theme.palette.background.shadow}`,
      }}
    >
      <img
        src={SMCLogo}
        alt="image"
        // width={103}
        width={130}
        height={40}
        style={{
          alignSelf: "flex-start",
          cursor: "pointer"
        }}
        onClick={handleLogoClick}
      />
    </Box>
  );
};

export default LogoHeader;
