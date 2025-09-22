import { TextField } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  icon: JSX.Element;
}

const LargeInput: FunctionComponent<IProps> = ({ icon }) => {
  return <TextField InputProps={{ endAdornment: icon }}></TextField>;
};

export default LargeInput;
