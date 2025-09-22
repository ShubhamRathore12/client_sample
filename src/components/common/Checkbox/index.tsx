import { Box, Checkbox as MuiCheckbox, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { FunctionComponent, useEffect, useState } from "react";

const StyledCheckbox = styled(MuiCheckbox)`
  padding: 0;
  margin-right: 4px;
  &.Mui-checked {
    color: ${({ theme }) => theme.palette.neutral.main};
  }
`;

interface IProps {
  label: string | JSX.Element;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
  testId?: string;
}

const Checkbox: FunctionComponent<IProps> = ({
  label,
  onChange,
  defaultChecked = false,
  testId,
}) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~

  // ~~~~~ Cmp state ~~~~~
  const [checked, setChecked] = useState(defaultChecked);

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    onChange(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  // ~~~~~ Handlers ~~~~~

  return (
    <Box
      display="flex"
      alignItems={"flex-start"}
      sx={{ cursor: "pointer" }}
      onClick={() => setChecked((prev) => !prev)}
    >
      <StyledCheckbox checked={checked} data-testid={testId} />{" "}
      <Typography>{label}</Typography>
    </Box>
  );
};

export default Checkbox;
