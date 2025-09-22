import Box from "@mui/material/Box";
import MuiSlider from "@mui/material/Slider";
import { FunctionComponent } from "react";

import { styled } from "@mui/material/styles";
import React from "react";

const StyledSlider = styled(MuiSlider)`
  & .MuiSlider-track,
  & .MuiSlider-thumb {
    background-color: ${({ theme }) => theme.palette.success.main};
    border-color: ${({ theme }) => theme.palette.success.main};
  }

  & .MuiSlider-thumb {
    &:focus,
    &:hover,
    &.Mui-active {
      box-shadow: none;
    }
  }

  & .MuiSlider-rail {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const Slider: FunctionComponent<{
  onChange: (value: number) => void;
  min: number;
  max: number;
  defaultValue: number;
}> = ({ onChange, min, max, defaultValue }) => {
  return (
    <Box width="98%">
      <StyledSlider
        onChange={(_, value) => onChange(value as number)}
        defaultValue={defaultValue}
        min={min}
        max={max}
        aria-label="Default"
        valueLabelDisplay="off"
        value={defaultValue}
      />
    </Box>
  );
};

export default Slider;
