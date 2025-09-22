import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCenterBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}));

export default StyledCenterBox;
