import { styled } from "@mui/material/styles";
import MuiSwitch, { SwitchProps } from "@mui/material/Switch";
import React from "react";
import { FunctionComponent } from "react";

const IOSSwitch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 45,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 3,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      color: theme.palette.primary.contrastText,
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.neutral.main,
      border: `6px solid ${theme.palette.primary.contrastText}`,
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.tertiary.gray,
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.primary[100],
    opacity: 0.7,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface IProps {
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
  testId?: string;
}

const Switch: FunctionComponent<IProps> = ({
  onChange,
  defaultChecked = true,
  testId,
}) => {
  return (
    <IOSSwitch
      data-testid={testId}
      sx={{ m: 1 }}
      defaultChecked={defaultChecked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
  );
};

export default Switch;
