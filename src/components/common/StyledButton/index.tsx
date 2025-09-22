import { Button, ButtonProps } from "@mui/material";
import useMounted from "../../../hooks/mounted";
import { userAgentFromString } from "../../../utils/user-agent";
import React from "react";

interface Props extends ButtonProps {
  selected?: boolean;
  children?: React.ReactNode;
}

const StyledButton = (props: Props) => {
  const { selected, children, sx, variant = "outlined", ...rest } = props;

  const mounted = useMounted();

  const isMobile =
    typeof window !== "undefined"
      ? userAgentFromString(navigator.userAgent).device.type === "mobile"
      : false;

  if (!mounted) return null;
  return (
    <Button
      {...rest}
      sx={{
        fontWeight: 400,
        fontSize: "14px",
        width: "100%",
        paddingInline: 0,
        whiteSpace: "nowrap",
        ...(!isMobile && {
          "&:hover": {
            color: "primary.contrastText",
            backgroundColor: "neutral.main",
          },
        }),

        ...(selected && {
          backgroundColor: "neutral.main",
          color: "primary.contrastText",
          "&:hover": {
            color: "primary.contrastText",
            backgroundColor: "neutral.main",
          },
        }),
        ...sx,
      }}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
