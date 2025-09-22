// import { Box, BoxProps } from "@mui/material";
// import { styled } from "@mui/material/styles";

// interface ContentBoxProps extends BoxProps {
//   isBoxShadow?: boolean;
// }

// const ContentBox = styled(Box, {
//   shouldForwardProp: (prop) => prop !== 'isBoxShadow',
// })<ContentBoxProps>(({ theme, isBoxShadow = true }) => ({
//   padding: theme.spacing(3),
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: theme.spacing(2),
//   boxShadow: "none",
//   borderRadius: "8px",
//   width: "100%",
//   minWidth: "320px",
//   maxWidth: "100%",
//   minHeight: "75vh",
//   margin: "auto",
//   marginTop: 0,

//   [theme.breakpoints.up("md")]: {
//     paddingTop: theme.spacing(5),
//     paddingBottom: theme.spacing(5),
//     boxShadow: isBoxShadow ? "0px 4px 15px rgba(0, 0, 0, 0.14)" : "none",
//     width: "550px",
//     minHeight: "500px",
//     // marginTop: "1rem",
//   },
// }));

// export default ContentBox;

import React, { ElementType, forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ContentBoxBaseProps extends BoxProps {
  isBoxShadow?: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isBoxShadow",
})<ContentBoxBaseProps>(({ theme, isBoxShadow = true }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  boxShadow: "none",
  borderRadius: "8px",
  width: "100%",
  minWidth: "320px",
  maxWidth: "100%",
  minHeight: "75vh",
  margin: "auto",
  marginTop: 0,

  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    boxShadow: isBoxShadow ? "0px 4px 15px rgba(0, 0, 0, 0.14)" : "none",
    width: "550px",
    minHeight: "500px",
  },
}));

// Generic component type to infer form vs div properly
type PolymorphicContentBoxProps<T extends ElementType> = {
  component?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "component"> &
  ContentBoxBaseProps;

const ContentBox = forwardRef(
  <T extends ElementType = "div">(
    { component, ...rest }: PolymorphicContentBoxProps<T>,
    ref: React.Ref<Element>
  ) => {
    return <StyledBox ref={ref} component={component} {...rest} />;
  }
);

ContentBox.displayName = "ContentBox";
export default ContentBox;
