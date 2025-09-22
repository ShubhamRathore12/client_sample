import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const RiskDisclosure = (props: Props) => {
  const { onClose, onSubmit, open } = props;
  const [checked, setChecked] = React.useState(false);
  // const setDisclose = (flag: boolean) => dispatch(appSlice.actions.setDisclosure(flag));

  React.useEffect(() => {
    setChecked(false);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: { xs: 2, md: 3.5 },
          minWidth: "50%",
          width: "100%",
        },
      }}
      sx={{
        zIndex: "tooltip",
      }}
    >
      <Stack gap={2}>
        <Typography sx={{ textAlign: "center", pt: 2, color: "text.disabled" }}>
          Risk Disclosure on Derivatives
        </Typography>

        <Box>
          <List
            sx={{
              "& .MuiListItem-root": (theme) => ({
                fontSize: 11,
                padding: theme.spacing(0.5, 0, 0.5, 2),
                color: "text.disabled",
                "&:before": {
                  position: "absolute",
                  left: 0,
                  top: 3,
                  content: "'•'",
                  fontSize: "28px",
                },
              }),
            }}
          >
            <ListItem>
              9 out of 10 individual traders in equity Futures and Options
              Segment, incurred net losses.
            </ListItem>
            <ListItem>
              On an average, loss makers registered net trading loss close to
              ₹50,000.
            </ListItem>
            <ListItem>
              Over and above the net trading losses incurred, loss makers
              expended an additional 28% of net trading losses as transaction
              costs
            </ListItem>
            <ListItem>
              Those making net trading profits, incurred between 15% to 50% of
              such profits as transaction cost.
            </ListItem>
          </List>
        </Box>
        {/* <Stack gap={2}>
          <Typography variant="subtitle1">Source: </Typography>
          <Typography variant="body2" color={"primary.blue"}>
            SEBI study dated January 25, 2023 on &apos;Analysis of Profit and Loss of Individual
            Traders dealing in equity Futures and Options (F&O) Segment&apos;, wherein Aggregate
            Level findings are based on annual Profit/Loss incurred by individual traders in equity
            F&O during FY 2021-22.
          </Typography>
        </Stack> */}
        <Stack gap={2}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ py: 0, "&.Mui-checked": { color: "primary.main" } }}
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                  />
                }
                componentsProps={{
                  typography: {
                    fontSize: 14,
                    lineHeight: 1.34,
                    color: "text.secondary",
                  },
                }}
                label="I've read and understood the Risk Disclosure"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: 16,
                  },
                }}
              />
            </FormGroup>
          </Box>
          <Button
            disabled={!checked}
            onClick={() => {
              onSubmit();
              // setDisclose(true);
            }}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default RiskDisclosure;
