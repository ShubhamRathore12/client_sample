import { Box, Typography, useTheme } from "@mui/material";

import React from "react";
import SMCLogo from "../../../assests/assets/SMCLogo.svg";
import LogoutImg from "../../../assests/assets/logout.svg";

const CDUHeader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.header,
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: "2 1",
        width: "100%",
        height: "10%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <img
        src={SMCLogo}
        alt="image"
        width={32}
        height={32}
        style={{ alignSelf: "flex-start", borderRadius: "50%" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "80%",
          // justifyContent: "start",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 400 }}>
          Skyler White
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          ID: A873687
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={LogoutImg} alt="Arrow" width={40} height={40} />
      </Box>
    </Box>
  );
};

export default CDUHeader;
