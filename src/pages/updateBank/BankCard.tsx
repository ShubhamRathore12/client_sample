import { Box, Radio, Typography, useTheme } from "@mui/material";
import React from "react";
import BankLogo from "./bankLogo";

interface BankCardProps {
  logo: string;
  text: string;
  selected?: boolean;
  primary?: boolean;
  name?: string;
  onSelectPrimary?: () => void;
}

const BankCard: React.FC<BankCardProps> = ({
  logo,
  text,
  selected = false,
  primary = false,
  onSelectPrimary,
  name,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: { xs: 30, md: 40 },
            height: { xs: 30, md: 40 },
            position: "relative",
          }}
        >
          <BankLogo bankCode={logo} name={name}/>
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 400, color: theme.palette.text.primary }}
        >
          {text}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Radio
          checked={selected}
          onChange={onSelectPrimary}
          value={text}
          name="primary-bank"
          inputProps={{ "aria-label": text }}
        />

        <Typography variant="subtitle2">
          {primary ? "Primary" : "Make Primary"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BankCard;
