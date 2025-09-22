import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FunctionComponent } from "react";

interface IProps {
  items: {
    title: string;
    content: JSX.Element | JSX.Element[] | string;
  }[];
}

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  "&:not(.Mui-expanded)": {
    borderBottom: `1px solid ${theme.palette.green[400]}`,
    background: "transparent",
  },
  "&:not(:last-child)": {
    // marginBottom: ,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",

  "&.Mui-expanded": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  paddingTop: 16,
  paddingBottom: 16,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CardAccordion: FunctionComponent<IProps> = ({ items }) => {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {items.map(({ title, content }, idx) => (
        <StyledAccordion key={idx} expanded={expanded === title} onChange={handleChange(title)}>
          <AccordionSummary aria-controls={`${title}-content`} id={`${title}-header`}>
            <Typography fontSize={26} fontWeight={500}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </div>
  );
};

export default CardAccordion;
