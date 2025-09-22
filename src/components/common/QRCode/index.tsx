import { Box, BoxProps } from "@mui/material";
import React from "react";

import RootQRCode, { QRCodeProps } from "react-qr-code";

export const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps & BoxProps>(
  (props, ref) => {
    const {
      value,
      size,
      bgColor,
      fgColor,
      level,
      ref: _,
      sx,
      ...other
    } = props;
    return (
      <Box
        ref={ref}
        my={0.5}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "white",
          p: 0.75,
          color: "black",
          maxWidth: "103px",
          "& > a": {
            height: size,
          },
          ...sx,
        }}
        {...other}
      >
        <a href={value} target="_blank" rel="noreferrer noopener">
          <RootQRCode value={value} size={size} />
        </a>
      </Box>
    );
  }
);
