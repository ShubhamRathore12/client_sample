"use client";

import { Box, Typography, useTheme } from "@mui/material";
import whiteArrow from "../../../assests/assets/whiteArrow.svg";
import arrow from "../../../assests/assets/arrow.svg";
import React from "react";

interface DashboardCardProps {
  logo: string;
  text: string;
  selected?: boolean;
  func?: () => void;
  bgColor?: string; // Optional background color
  textColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  logo,
  text,
  selected = false,
  func,
  bgColor,
  textColor,
}) => {
  const theme = useTheme();

  return (
    <Box
      onClick={func}
      role={func ? "button" : undefined}
      tabIndex={func ? 0 : -1}
      sx={{
        width: "100%",
        border: selected ? 2 : 1,
        borderRadius: 2,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        cursor: func ? "pointer" : "default",
        ...(bgColor
          ? { background: bgColor } // apply full background (can be gradient)
          : {
              backgroundColor: selected
                ? theme.palette.background.accentBg ||
                  theme.palette.action.selected
                : theme.palette.background.paper,
            }),
        borderColor: selected
          ? theme.palette.primary.main
          : theme.palette.background.border || theme.palette.divider,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: func ? theme.shadows[1] : undefined,
        },
      }}
    >
      {/* Left: Logo + Text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}
      >
        <img
          src={logo}
          alt="Card logo"
          width={32}
          height={32}
          style={{ alignSelf: "flex-start" }}
        />
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, color: textColor || "inherit" }}
        >
          {text}
        </Typography>
      </Box>

      {/* Right: Arrow */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {bgColor ? (
          <img
            src={whiteArrow}
            alt="Arrow icon"
            width={20}
            height={20}
          />
        ) : (
          <img
            src={arrow}
            alt="Arrow icon"
            width={20}
            height={20}
          />
        )}
      </Box>
    </Box>
  );
};

export default DashboardCard;
