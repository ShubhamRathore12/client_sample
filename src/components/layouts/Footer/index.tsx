import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container sx={{ py: 6 }}>
        <Typography fontSize={18} fontWeight={400}>
          Disclaimer:
        </Typography>
        <Typography
          textAlign="justify"
          color="text.secondary"
          fontSize={13}
          fontWeight={400}
          lineHeight="24px"
        >
          Footer
          <Link
            href="https://www.smctradeonline.com/demat-account/tnc.aspx"
            target="_blank"
          >
            T&C
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};
