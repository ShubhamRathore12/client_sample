import { Box, Typography } from "@mui/material";
import React from "react";

import { IAchievement } from "./achievements";

interface AchievementProps {
  achievement: IAchievement;
}

const Achievement: React.FC<AchievementProps> = (props) => {
  const { achievement } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {achievement.Icon}
      <Typography variant="body3" color="tertiary.gray">
        {achievement.body}
      </Typography>
    </Box>
  );
};

export default Achievement;
