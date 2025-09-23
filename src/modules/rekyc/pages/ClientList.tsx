import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../store";
import { setCombinedUserData, setFormTexts, setUser } from "../../../slices/app";
import ClientCard from "../../../components/common/ClientCard";
import { apiService } from "../../../services/api.service";
import SMCLogo from "../../../assests/assets/SMCLogo.svg";
import extractErrorAndShowToast from "../../../utils/extract-error";

const RekycClientList: React.FC = () => {
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
      navigate("/rekyc/dashboard");
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
        background: "linear-gradient(135deg, #4A90E2 0%, #7BB3F0 100%)",
      }}
    >
      <img src={SMCLogo} alt="SMC Logo" width={200} height={60} />

      <Box
        sx={{
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: "0px 8px 32px rgba(74, 144, 226, 0.3)",
          borderRadius: 2,
          width: { xs: 350, md: 440 },
          minHeight: { xs: "75vh", md: 500 },
          backgroundColor: "white",
          border: "1px solid rgba(74, 144, 226, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" sx={{ color: "#4A90E2", fontWeight: 600 }}>
            Welcome to Re-KYC
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
          sx={{
            background: "linear-gradient(45deg, #4A90E2 30%, #7BB3F0 90%)",
            color: "white",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(45deg, #3A7BC8 30%, #6BA3E0 90%)",
            },
            "&:disabled": {
              background: "#ccc",
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default RekycClientList;