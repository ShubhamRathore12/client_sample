import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const LoaderBackdrop = ({
  processing,
  text,
  processingText,
}: {
  processing?: boolean;
  text?: string;
  processingText?: string;
}) => {
  return (
    <Backdrop open sx={{ zIndex: "tooltip" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {text && (
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 500,
              textAlign: "center",
              color: "lightgrey",
            }}
          >
            {text}
          </Typography>
        )}
        <CircularProgress />
        {processing && (
          <Typography
            sx={{ color: "white", textAlign: "center", maxWidth: 350 }}
          >
            {processingText || "Processing, please go to the popup window"}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};
