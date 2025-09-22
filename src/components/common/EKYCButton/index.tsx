import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

interface EKYCButtonProps extends ButtonProps {
  isSubmitting: boolean;
  progress?: number;
}

const EKYCButton: React.FC<EKYCButtonProps> = (props) => {
  const { children, progress = 0, isSubmitting, sx, ...other } = props;
  return (
    <Button
      sx={{ width: { xs: "100%" }, whiteSpace: "nowrap", ...(sx || {}) }}
      disabled={isSubmitting}
      {...other}
    >
      {isSubmitting ? (
        <CircularProgress
          variant={progress < 100 ? "determinate" : "indeterminate"}
          value={progress}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default EKYCButton;
