import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../store";
import { setCombinedUserData, setFormTexts, setUser } from "../../slices/app";
import ClientCard from "../../components/common/ClientCard";
import { apiService } from "../../services/api.service";
import SMCLogo from "../../assests/assets/SMCLogo.svg";
import extractErrorAndShowToast from "../../utils/extract-error";

const MainClientList: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const multipleUsers = useSelector(
    (state: RootState) => state.app.multipleUsers
  );
  const [selectedClientId, setSelectedClientId] = useState<
    string | number | null
  >(null);

  const handleSelectClient = (item: any) => {
    setSelectedClientId(item.id);
  };

  const handleContinue = async () => {
    try {
      const users: any = await apiService.getUserList(String(selectedClientId));
      dispatch(setUser(...users));
      
      // Check if there's a target project from URL
      const targetProject = sessionStorage.getItem('targetProject');
      
      if (targetProject) {
        navigate(`/${targetProject}`);
      } else {
        navigate("/project-selection");
      }
    } catch (err) {
      extractErrorAndShowToast(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <img src={SMCLogo} alt="SMC Logo" width={200} height={60} />

      <Box
        sx={{
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: { md: "0px 4px 15px rgba(0,0,0,0.14)" },
          borderRadius: 2,
          width: { xs: 350, md: 440 },
          minHeight: { xs: "75vh", md: 500 },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
            Welcome
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Please choose the client ID
          </Typography>

          {multipleUsers?.map((item: any) => (
            <Box
              key={item.id}
              onClick={() => handleSelectClient(item)}
              sx={{ cursor: "pointer" }}
            >
              <ClientCard
                img={item?.dpImageUrl}
                clientName={item?.name}
                clientId={item?.id}
                selected={item.id === selectedClientId}
              />
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={handleContinue}
          disabled={!selectedClientId}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default MainClientList;