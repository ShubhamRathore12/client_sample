import { Box, Chip, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Check from "./icons/Check";
import Circle from "./icons/Circle";
import { Plan } from "./plans";
import React from "react";

interface IProps extends Plan {
  onClick: (plan: string) => void;
  isSelected: boolean;
}

const AdvanceSubscriptionCard: FunctionComponent<IProps> = (props) => {
  return (
    <Box
      onClick={() => props.onClick(props.title)}
      sx={{
        cursor: "pointer",
        boxShadow: 1,
      }}
      bgcolor={props.isSelected ? "neutral.main" : "primary.contrastText"}
      borderRadius={"24px"}
      display={"flex"}
      py={6}
      px={5}
      gap={2}
      alignItems={"baseline"}
    >
      <Box>{props.isSelected ? <Check /> : <Circle />}</Box>
      <Box flex={1} display={"flex"} justifyContent={"space-between"} gap={1}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent="space-between"
          gap={1}
        >
          <Typography
            color={props.isSelected ? "primary.contrastText" : "text.primary"}
            variant={"h4"}
          >
            {props.title}
          </Typography>
          <Chip
            label={`₹${props.brokerage_benefits}/- Brokerage Benefits`}
            size={"small"}
            sx={{
              borderRadius: "8px",
              backgroundColor: props.isSelected
                ? "primary.contrastText"
                : "tertiary.cream",
              "&:hover": {
                backgroundColor: props.isSelected
                  ? "primary.contrastText"
                  : "tertiary.cream",
                color: "text.primary",
              },
              color: "text.primary",
            }}
          />
        </Box>
        <Box
          gap={1.5}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent="space-between"
          mb={0.5}
        >
          <Typography
            variant={"h5"}
            color={props.isSelected ? "primary.contrastText" : "text.primary"}
          >
            ₹{props.price}
          </Typography>
          <Typography
            color={props.isSelected ? "primary.contrastText" : "text.secondary"}
            variant={"body3"}
            whiteSpace="nowrap"
          >
            / {props.period} months
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvanceSubscriptionCard;
