import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { Rating } from "../../../components/common/Rating";
import React from "react";

import { ITestimonial } from "./testimonials";

interface TestimonialProps {
  testimonial: ITestimonial;
}

const Testimonial: React.FC<TestimonialProps> = (props) => {
  const { testimonial } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "min(850px, 100%)",
      }}
    >
      <img
        src={testimonial.src}
        style={{ width: mdUp ? "236px" : "100%" }}
        height={mdUp ? "326px" : "auto"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: -20,
          ml: 10,
        }}
      >
        <Box sx={{ display: { xs: "none", lg: "block" }, textAlign: "left" }}>
          <Typography variant="l2">{testimonial.name}</Typography>
          <Typography color="tertiary.gray">
            {testimonial.designation}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: "8px",
            borderLeftWidth: { xs: 8, md: 16 },
            borderLeftStyle: "solid",
            borderColor: "primary.green",
            p: 2,
            width: "min(467px, 100%)",
          }}
        >
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <Typography variant="l2">{testimonial.name}</Typography>
            <Typography color="tertiary.gray">
              {testimonial.designation}
            </Typography>
          </Box>
          <Typography
            color="tertiary.gray"
            sx={{ textAlign: "justify", my: { xs: 2, lg: 0 } }}
          >
            {testimonial.message}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 26 },
                fontWeight: 600,
                lineHeight: { xs: "50px", md: "36px" },
              }}
            >
              {testimonial.rating}/5
            </Typography>
            <Rating
              rating={testimonial.rating}
              IconProps={{
                sx: { fill: (theme) => theme.palette.secondary.orange },
                fontSize: "large",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonial;
