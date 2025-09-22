import { Box, Container, Typography } from "@mui/material";
import { LinkButton } from "../../../components/common/LinkButton";
import React from "react";

import Achievement from "./Achievement";
import achievements from "./achievements";

const Achievements = () => {
  return (
    <Container>
      <Box component="section" sx={{ mb: 10 }}>
        <Container
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="overline" color="tertiary.gray">
            Achievements
          </Typography>
          <Typography variant="h2" component="h2" color="tertiary.black">
            Awards won by{" "}
            <Typography variant="h2" component="span" color="primary.green">
              SMC
            </Typography>{" "}
            Group
          </Typography>
          <Typography color="tertiary.gray">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              py: 8,
            }}
          >
            {achievements.map((achievement) => (
              <Achievement key={achievement.id} achievement={achievement} />
            ))}
          </Box>
          <LinkButton href="/about">Know more about us</LinkButton>
        </Container>
      </Box>
    </Container>
  );
};

export default Achievements;
