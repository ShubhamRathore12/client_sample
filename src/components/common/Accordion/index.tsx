import { Box, Stack, StackProps } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { FunctionComponent } from "react";
import Minus from "./icons/Minus";
import Plus from "./icons/Plus";

interface IProps {
  items: {
    title: string;
    body: JSX.Element | JSX.Element[] | string;
  }[];
  stackProps?: StackProps;
}

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },

  "& .MuiCollapse-root": {
    marginTop: "8px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { expanded: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      props.expanded ? (
        <Minus
          onClick={() => {
            //
          }}
        />
      ) : (
        <Plus
          onClick={() => {
            //
          }}
        />
      )
    }
    {...props}
  />
))(({ theme, expanded }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    ...(!expanded ? { rotate: "90deg" } : 0),
  },
  "& .MuiAccordionSummary-body": {
    marginRight: theme.spacing(1),
  },
  border: "1px solid",
  borderColor: theme.palette.neutral[10],
  borderRadius: "8px",
  paddingBlock: theme.spacing(2),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.primary.contrastText,
  marginBlock: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: "8px",
}));

const Accordion: FunctionComponent<IProps> = ({ items, stackProps }) => {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Stack gap={2} {...stackProps}>
      {items.map(({ title, body }, idx) => (
        <StyledAccordion key={idx} expanded={expanded === title} onChange={handleChange(title)}>
          <AccordionSummary
            expanded={expanded === title}
            aria-controls={`${title}-body`}
            id={`${title}-header`}
          >
            <Typography color="tertiary.gray">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>{body}</Box>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Stack>
  );
};

export default Accordion;
