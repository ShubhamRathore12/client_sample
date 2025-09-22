import { Box, Typography, useTheme } from "@mui/material";
import ErrorIco from "../../../assests/assets/Error.svg";

import React from "react";

const Error = ({ error }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.background.error,
        display: "flex",
        borderRadius: 2,
        padding: 1,
        gap: 2,
      }}
    >
      <img src={ErrorIco} alt="clock" width={19} height={19} />
      <Typography
        variant="h6"
        sx={{ color: theme.palette.text.error, fontSize: "0.75rem" }}
      >
        {error}
      </Typography>
    </Box>
  );
};

export default Error;
