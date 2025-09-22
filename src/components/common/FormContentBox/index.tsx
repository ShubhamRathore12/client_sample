import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  border: 0,
  borderRadius: theme.spacing(1),
  padding: 0,

  [theme.breakpoints.up("md")]: {
    border: `1px solid ${theme.palette.background.boxBorder}`,
    padding: theme.spacing(2),
    maxHeight: "460px",
    overflowY: "scroll",
  },
}));

export default FormContentBox;
