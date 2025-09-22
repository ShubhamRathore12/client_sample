import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import useSettings from "../../hooks/settings";
import React from "react";

const ThemeToggle = () => {
  const { settings, saveSettings } = useSettings();
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <Box sx={{ position: "fixed", left: 16, bottom: 16 }}>
      <IconButton
        sx={{ boxShadow: 2 }}
        onClick={() =>
          saveSettings({
            ...settings,
            theme: settings.theme === "dark" ? "light" : "dark",
          })
        }
      >
        {settings.theme === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
