import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PublicLayout from "../../../components/layouts/PublicLayout";

const AccountClosuresDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <PublicLayout>
      <Box
        sx={{
          paddingX: { xs: 2, md: 8 },
          paddingY: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          width: "100%",
          minHeight: { xs: "75vh", md: "500px" },
          margin: "auto",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, mb: 2, color: theme.palette.primary.main }}
          >
            Account Closures Module
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Close your Trading & Demat Account with proper procedures
          </Typography>
          <Typography variant="h6" color="text.secondary">
            This module is under development and will be available soon.
          </Typography>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default AccountClosuresDashboard;