import { Box, Typography } from "@mui/material";

import React, { SVGProps } from "react";

interface IconCardProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  body: string;
}

const IconCard: React.FC<IconCardProps> = (props) => {
  const { title, body, Icon } = props;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        py: 5,
        px: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textAlign: "left",
        flexBasis: { xs: "auto", md: 328 },
      }}
    >
      <Box>
        <Icon />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography color="tertiary.gray">{body}</Typography>
      </Box>
    </Box>
  );
};

export default IconCard;
