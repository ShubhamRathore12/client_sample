import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Check from "./icons/Check";
import Cross from "./icons/Cross";
import { Plan } from "./plans";
import React from "react";

interface IProps extends Plan {
  onClick: (plan: string) => void;
  isSelected: boolean;
}

const SubscriptionCard: FunctionComponent<IProps> = (props) => {
  return (
    <Box
      onClick={() => props.onClick(props.title)}
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        transform: { md: `translateY(${props.isSelected ? "-20px" : 0})` },
        boxShadow: 5,
      }}
      bgcolor={props.isSelected ? "neutral.main" : "primary.contrastText"}
      borderRadius={"24px"}
    >
      <Box py={3} px={5}>
        <Typography
          color={props.isSelected ? "primary.contrastText" : "text.primary"}
          mb={3}
          variant={"h4"}
        >
          {props.title}
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={2.5}>
          {props.features.map((feature, idx) => (
            <Box key={idx} display={"flex"} alignItems={"center"} gap={3.5}>
              {feature.isAvailable ? <Check /> : <Cross />}
              <Typography
                color={
                  props.isSelected ? "primary.contrastText" : "text.primary"
                }
              >
                {feature.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box mt={5}>
          <Box gap={1.5} display={"flex"} alignItems={"center"} mb={1}>
            <Typography
              variant={"h5"}
              color={props.isSelected ? "primary.contrastText" : "text.primary"}
            >
              ₹{props.price}
            </Typography>
            <Typography
              color={
                props.isSelected ? "primary.contrastText" : "text.secondary"
              }
              variant={"body3"}
              sx={{ opacity: props.isSelected ? 0.6 : 1 }}
            >
              / {props.period} months
            </Typography>
          </Box>
          <Box
            bgcolor={props.isSelected ? "green.700" : "green.100"}
            borderRadius={"4px"}
            py={0.5}
            px={1}
            component={"span"}
          >
            <Typography
              color={props.isSelected ? "primary.contrastText" : "text.primary"}
              variant={"body3"}
              component={"span"}
              fontWeight={600}
            >
              {props.discount}%
            </Typography>{" "}
            <Typography
              color={props.isSelected ? "primary.contrastText" : "text.primary"}
              variant={"body3"}
              component={"span"}
            >
              Discount, Save{" "}
            </Typography>
            <Typography
              color={props.isSelected ? "primary.contrastText" : "text.primary"}
              variant={"body3"}
              component={"span"}
              fontWeight={600}
            >
              ₹{props.save}
            </Typography>
          </Box>
        </Box>
        <Box mt={5}>
          <Button
            sx={{
              borderRadius: "8px",
              backgroundColor: props.isSelected
                ? "primary.contrastText"
                : "green.100",
              "&:hover": {
                backgroundColor: props.isSelected
                  ? "primary.contrastText"
                  : "green.100",
                color: "text.primary",
              },
              color: "text.primary",
            }}
            fullWidth
          >
            {props.isSelected ? "Buy Now" : "Choose"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionCard;
