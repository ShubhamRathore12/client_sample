"use client";

import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogoutIco from "../../../../assests/assets/logout.svg";
import { RootState } from "../../../../store";
import { setLogoutPopupState } from "../../../../slices/app";
import AvatarInitials from "../../../../utils/getInitials";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.app.user);
  const handleLogout = () => {
    dispatch(setLogoutPopupState(true));
  };

  return (
    <Box
      sx={{
        background: theme.palette.background.header,
        display: "flex",
        alignItems: "center",
        gap: 3,
        paddingY: 2,
        paddingX: { xs: 2, md: 4 },
        width: "100%",
        height: "8%",
        position: { xs: "sticky", md: "static" },
        top: { xs: 0, md: "none" },
        zIndex: { xs: 99, md: 9 },
      }}
    >
      {user?.dpImageUrl ? (
        <img
          src={user?.dpImageUrl}
          alt="image"
          width={32}
          height={32}
          style={{
            borderRadius: "50%",
            border: `1px solid ${theme.palette.background.boxBorder} `,
          }}
        />
      ) : (
        AvatarInitials({ name: user?.name })
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          flexGrow: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 400 }}>
          {user?.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          ID: {user?.id}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7,
          },
        }}
        onClick={handleLogout}
      >
        <img src={LogoutIco} alt="Logout" width={40} height={40} />
      </Box>
    </Box>
  );
};

export default Header;
