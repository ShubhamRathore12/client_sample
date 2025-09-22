import { ArrowForward } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

type LinkButtonProps = {
  to: LinkProps["to"];
  color?: string;
} & Omit<ButtonProps<"a">, "href" | "to">;

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { to, children, color, sx, ...other } = props;
  return (
    <Button
      variant="text"
      sx={{
        color: color ?? "primary.blue",
        borderRadius: "13px",
        px: 0,
        ...sx,
      }}
      component={Link}
      to={to}
      endIcon={<ArrowForward />}
      {...other}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
