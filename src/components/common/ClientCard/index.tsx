import { Box, Typography, useTheme } from "@mui/material";
import BlueTick from "../../../assests/assets/blueTick.svg";

import React from "react";
import AvatarInitials from "../../../utils/getInitials";

// Define prop types
interface ClientCardProps {
  img: string;
  clientName: string;
  clientId: string | number;
  selected?: boolean;
}

interface ClientCardProps {
  img: string;
  clientName: string;
  clientId: string | number;
  selected?: boolean;
}

const ClientCard = ({
  img,
  clientName,
  clientId,
  selected,
}: ClientCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: selected ? 2 : 1,
        borderRadius: 2,
        padding: 1,
        gap: 2,
        display: "flex",
        backgroundColor: selected
          ? theme.palette.background.accentBg
          : theme.palette.background.paper,
        borderColor: selected
          ? theme.palette.primary.main
          : theme.palette.background.border,
      }}
    >
      {img ? (
        <img
          src={img}
          alt="client image"
          width={60}
          height={60}
          style={{ alignSelf: "flex-start", borderRadius: 2 }}
        />
      ) : (
        AvatarInitials({ name: clientName })
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, color: theme.palette.text.heading }}
        >
          {clientName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {clientId}
        </Typography>
      </Box>

      {selected && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={BlueTick} alt="Selected Tick" width={25} height={25} />
        </Box>
      )}
    </Box>
  );
};

export default ClientCard;
