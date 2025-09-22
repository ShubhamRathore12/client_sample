import { Box, Container, Typography } from "@mui/material";
import React from "react";

import testimonials from "./testimonials";

const Testimonials = () => {
  return (
    <Box component="section" sx={{ bgcolor: "blue.100", py: 10 }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 5 / 12,
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="overline">Our Proud</Typography>
          <Typography variant="h2" component="h2" color="tertiary.black">
            The reason why we are{" "}
            <Typography variant="h2" component="span" color="primary.green">
              Unique
            </Typography>
          </Typography>
          <Typography color="tertiary.gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            aut fuga omnis eos facilis totam ad dolore, molestias ipsum illum!
          </Typography>
        </Box>
        <Box sx={{ flex: 7 / 12 }}>
          <Testimonials testimonial={testimonials[0]} />
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
