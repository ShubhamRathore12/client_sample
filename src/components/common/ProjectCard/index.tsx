import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Project } from "../../../types/projects";

interface ProjectCardProps extends Project {
  onClick: () => void;
  selected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  displayName,
  description,
  icon,
  bgColor,
  textColor,
  onClick,
  selected = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      sx={{
        width: "100%",
        border: selected ? 2 : 1,
        borderRadius: 2,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        ...(bgColor
          ? { background: bgColor }
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
          boxShadow: theme.shadows[1],
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Left: Icon + Text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            backgroundColor: textColor ? "rgba(255,255,255,0.2)" : theme.palette.background.default,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: textColor || theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            {displayName.charAt(0)}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{ 
              fontWeight: 500, 
              color: textColor || "inherit",
              fontSize: "1.1rem"
            }}
          >
            {displayName}
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: textColor ? "rgba(255,255,255,0.8)" : theme.palette.text.secondary,
              fontSize: "0.9rem"
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Right: Arrow */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: textColor ? "rgba(255,255,255,0.2)" : theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: textColor || theme.palette.primary.contrastText,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;