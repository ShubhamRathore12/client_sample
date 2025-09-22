import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  title: string;
  description: string;
  index: number;
}

const TextCard: FunctionComponent<IProps> = ({ description, index, title }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Typography color="tertiary.gray" fontSize={20}>
        {index < 10 ? 0 : ""}
        {index}
      </Typography>
      <Stack gap={1.5}>
        <Typography variant="h6" component="h6" color="tertiary.black">
          {title}
        </Typography>
        <Typography color="tertiary.gray" sx={{ mt: 0.25 }}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TextCard;
