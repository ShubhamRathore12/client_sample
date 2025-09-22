import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";

const Pricing = () => {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: { xs: "100%", md: "lg" },
        m: "0 auto",
        py: 4,
        pl: { xs: 2, md: 10 },
        pr: 2,
        borderRadius: { xs: 0, md: "16px" },
        bgcolor: "blue.100",
        overflow: "hidden hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", md: "start" },
            flex: 1,
          }}
        >
          <Typography
            variant="overline"
            color="tertiary.gray"
            textAlign={{ xs: "center", md: "left" }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            textAlign={{ xs: "center", md: "left" }}
            color="tertiary.black"
          >
            No hidden charges, low cost &amp; transparent
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "nowrap",
              my: 4,
              gap: 2,
              width: "90%",
              flex: 1,
            }}
          >
            <Stack gap={1}>
              <Typography component="span" variant="h4">
                ₹{" "}
                <Typography component="span" variant="h3">
                  0
                </Typography>
              </Typography>
              <Typography component="h6" variant="h6">
                Equity Delivery
              </Typography>
              <Typography color="tertiary.gray">
                Zero trading charges on equity delivery
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography component="span" variant="h4">
                ₹{" "}
                <Typography component="span" variant="h3">
                  15
                </Typography>
              </Typography>
              <Typography component="h6" variant="h6">
                Brokerage
              </Typography>
              <Typography color="tertiary.gray">
                ₹ 15 brokerage on every “profitable” intra-day trade
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography component="span" variant="h4">
                ₹{" "}
                <Typography component="span" variant="h3">
                  0
                </Typography>
              </Typography>
              <Typography component="h6" variant="h6">
                Account Opening
              </Typography>
              <Typography color="tertiary.gray">
                Zero trading account opening charges
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              sx={{
                width: { xs: "100%", md: "initial" },
                ml: { xs: 0, md: "271px" },
              }}
            >
              Start Investing
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" }, translate: "10%" }}>
          <img
            src="/assets/landing/pricing-graphic.png"
            height={547}
            width={271}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;
