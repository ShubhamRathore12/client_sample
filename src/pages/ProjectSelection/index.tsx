import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../types/projects";
import ProjectCard from "../../components/common/ProjectCard";
import SMCLogo from "../../assests/assets/SMCLogo.svg";

const ProjectSelection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleProjectSelect = (projectRoute: string) => {
    navigate(projectRoute);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <img src={SMCLogo} alt="SMC Logo" width={180} height={60} />

      <Box
        sx={{
          paddingX: 3,
          paddingY: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: { md: "0px 4px 15px rgba(0, 0, 0, 0.14)" },
          borderRadius: "8px",
          width: { xs: "360px", md: "500px" },
          minHeight: { xs: "75vh", md: "600px" },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem", mb: 1 }}
          >
            Select a Service
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Choose the service you want to access
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => handleProjectSelect(project.route)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectSelection;