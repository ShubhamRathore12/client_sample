import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { Box, SvgIconProps } from "@mui/material";
import React from "react";

type StarFill = "full" | "half" | "empty";

function getStars(num = 0): StarFill[] {
  let n = Math.floor(num * 2) / 2;
  const array: StarFill[] = [];
  while (n-- > 0) {
    if (n >= 0) array.push("full");
    else array.push("half");
  }
  while (array.length < 5) array.push("empty");
  return array;
}

function getIcon(
  fill: StarFill,
  IconProps: SvgIconProps,
  idx: number
): JSX.Element {
  const props = { key: idx, ...IconProps };
  switch (fill) {
    case "full":
      return <Star {...props} />;
    case "half":
      return <StarHalf {...props} />;
    default:
      return <StarBorder {...props} />;
  }
}

interface RatingProps {
  rating: number;
  IconProps?: SvgIconProps;
}

export const Rating: React.FC<RatingProps> = (props) => {
  const { rating, IconProps = {} } = props;
  const stars = getStars(rating);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {stars.map((star, idx) => getIcon(star, IconProps, idx))}
    </Box>
  );
};

export default Rating;
