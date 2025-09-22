import { Box, Typography } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  title: string;
  description?: string;
}

const ToasterContent: FunctionComponent<IProps> = ({ title, description }) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~

  // ~~~~~ Cmp state ~~~~~

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~

  // ~~~~~ Handlers ~~~~~

  return (
    <Box>
      <Typography
        mb={1}
        fontSize={18}
        fontWeight={500}
        color="neutral.primary"
        sx={{ opacity: 0.8 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography fontSize={14} color="neutral.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ToasterContent;
