import type { ThemeOptions } from "@mui/material";

export const baseThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  // typography: {
  //   fontFamily: "'Roboto', sans-serif",
  //   overline: {
  //     fontSize: 18,
  //     lineHeight: "23px",
  //     letterSpacing: "6px",
  //     "@media (max-width: 600px)": {
  //       fontSize: 12,
  //       lineHeight: "18px",
  //     },
  //   },
  //   h1: {
  //     fontSize: "54px",
  //     fontWeight: 700,
  //     lineHeight: "75px",
  //     "@media (max-width: 600px)": {
  //       fontSize: "48px",
  //       lineHeight: "56px",
  //     },
  //   },
  //   h2: {
  //     fontSize: "38px",
  //     fontWeight: 700,
  //     lineHeight: "56px",
  //     "@media (max-width: 600px)": {
  //       fontSize: "36px",
  //       lineHeight: "42px",
  //     },
  //   },
  //   h3: {
  //     fontSize: "26px",
  //     fontWeight: 700,
  //     lineHeight: "52px",
  //     "@media (max-width: 600px)": {
  //       fontSize: "24px",
  //       lineHeight: "42px",
  //     },
  //   },
  //   h4: {
  //     fontSize: "24px",
  //     fontWeight: 600,
  //     lineHeight: "34px",
  //     "@media (max-width: 600px)": {
  //       fontSize: "20px",
  //       lineHeight: "20px",
  //     },
  //   },
  //   h5: {
  //     fontSize: 20,
  //     fontWeight: 600,
  //     lineHeight: "22px",
  //     "@media (max-width: 600px)": {
  //       fontSize: "20px",
  //       lineHeight: "23px",
  //     },
  //   },
  //   h6: {
  //     fontSize: 18,
  //     fontWeight: 500,
  //     lineHeight: "23px",
  //     "@media (max-width: 600px)": {
  //       fontSize: 20,
  //       lineHeight: "20px",
  //     },
  //   },
  //   // l1: {
  //   //   fontSize: "40px",
  //   //   fontWeight: 500,
  //   //   lineHeight: "47px",
  //   //   "@media (max-width: 600px)": {
  //   //     fontSize: 24,
  //   //     lineHeight: "28px",
  //   //   },
  //   // },
  //   // l2: {
  //   //   fontSize: "28px",
  //   //   fontWeight: 500,
  //   //   lineHeight: "42.19px",
  //   //   "@media (max-width: 600px)": {
  //   //     fontSize: 22,
  //   //     lineHeight: "22px",
  //   //   },
  //   // },
  //   body1: {
  //     fontSize: 18,
  //     fontWeight: 400,
  //     lineHeight: "26px",
  //     letterSpacing: "0%",
  //     // "@media (max-width: 600px)": {
  //     //   fontSize: "16px",
  //     //   lineHeight: "20px",
  //     // },
  //   },
  //   body2: {
  //     fontSize: "16px",
  //     fontWeight: 400,
  //     lineHeight: "24px",
  //   },
  //   // body3: {
  //   //   fontSize: "16px",
  //   //   fontWeight: 400,
  //   //   lineHeight: "21px",
  //   //   "@media (max-width: 600px)": {
  //   //     fontSize: "12px",
  //   //     lineHeight: "16px",
  //   //   },
  //   // },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: "4px",
          textTransform: "inherit",
          boxShadow: "none",
          "&:hover": {
            filter: "brightness(1.05)",
            boxShadow: "none",
          },
          ...(ownerState.variant === "contained" && {
            "&.Mui-disabled": {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              opacity: 0.5,
            },
          }),
        }),
        contained: ({ theme }) => ({
          padding: "10px 40px",
          fontSize: "16px",
          fontWeight: 500,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }),
        outlined: ({ theme }) => ({
          background: "transparent",
          color: theme.palette.primary.main,
          border: "1px solid",
          padding: "10px 40px",
          fontSize: "16px",
          fontWeight: 400,
          borderColor: theme.palette.primary.main,
          "&:hover": {
            background: "transparent",
            color: theme.palette.primary.main,
            border: "1px solid",
            borderColor: theme.palette.primary.main,
          },
        }),
        text: ({ theme }) => ({
          background: "transparent",
          color: theme.palette.tertiary.gray,
          fontSize: "16px",
          fontWeight: 400,
          "&:hover": {
            background: "transparent",
          },
        }),
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
        size: "medium",
        disableElevation: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
        disableRipple: true,
      },
      variants: [
        {
          props: { size: "small" },
          style: () => ({
            padding: "8px",
            fontSize: "14px",
            fontWeight: 400,
          }),
        },
        // {
        //   props: { variant: "link" },
        //   style: ({ theme }) => ({
        //     background: "transparent",
        //     color: theme.palette.primary.blue,
        //     fontSize: "20px",
        //     fontWeight: 400,
        //     "&:hover": {
        //       background: "transparent",
        //       color: theme.palette.primary.blue,
        //     },
        //   }),
        // },
      ],
    },
    MuiCircularProgress: {
      defaultProps: {
        size: "28px",
      },
      styleOverrides: {
        circle: ({ theme }) => ({
          stroke: theme.palette.primary.contrastText,
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiCssBaseline: {
      styleOverrides(theme) {
        return {
          ".grecaptcha-badge": {
            display: "none !important",
          },
          ".rc-anchor .rc-anchor-invisible .rc-anchor-light .rc-anchor-invisible-hover": {
            display: "none !important",
          },
          // Styling OTP Input
          ".react-otp-input input": {
            fontSize: 18,
            lineHeight: "32px",
            fontWeight: 400,
            letterSpacing: "0.42px",
            width: "45px !important",
            height: 55,
            borderRadius: "4px",
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            marginRight: theme.spacing(1.5),
            "&:hover, &:focus": {
              border: `1px solid ${theme.palette.primary.main}`,
              outline: "none",
            },
            [theme.breakpoints.down("sm")]: {
              width: "35px !important",
              height: 40,
              marginRight: theme.spacing(0.5),
            },
          },
          body: {
            overflowY: "overlay",
            height: "100%",
          },
          "#nprogress": {
            pointerEvents: "none",
          },
          "#nprogress .bar": {
            backgroundColor: theme.palette.primary.main,
            height: "3px",
            left: "0px",
            position: "fixed",
            top: "0px",
            width: "100%",
            zIndex: 2000,
          },
          // "*::-webkit-scrollbar": {
          //   background: "transparent",
          //   width: "10px",
          // },
          // "*::-webkit-scrollbar-thumb": {
          //   background: `${theme.palette.tertiary.gray}55`,
          //   borderRadius: "12px",
          // },
          ".toast": {
            fontSize: 16,
            [theme.breakpoints.down("sm")]: {
              fontSize: 14,
            },
          },
          input: {
            // Customizing the chrome autofill input colors
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            },
          },
          img: {
            maxWidth: "100%",
          },
        };
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          cursor: "pointer",
          color: theme.palette.link.main,
        }),
      },

      defaultProps: {
        underline: "none",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.blue[100],
          color: theme.palette.text.secondary,
          padding: theme.spacing(2),
          fontSize: "16px",
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.blue[100],
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          boxShadow: theme.shadows[1],
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          borderBottom: "none",
          "&:before": {
            borderBottom: "none",
          },
          "&:after": {
            borderBottom: "none",
          },
          "&:hover": {
            borderBottom: "none",
            "&:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
            "&:not(.Mui-disabled):after": {
              borderBottom: "none",
            },
          },
        }),
        input: {
          padding: "16px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: () => ({
          "& .MuiInputLabel-root": { top: -3 },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.text.primary,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
        }),
        input: ({ theme }) => ({
          padding: "12px",
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.type === "number" && {
            // Chrome, Safari, Edge, Opera
            "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            // Firefox
            input: {
              MozAppearance: "textfield",
            },
          }),
          "& .MuiInputBase-input::placeholder": {
            fontSize: 12,
            color: theme.palette.text.secondary,
            opacity: 1,
            fontWeight: 400,
            [theme.breakpoints.up("lg")]: {
              fontSize: 14,
            },
          },
          "& .MuiInputBase-root": {
            // borderBottom: `1px solid ${theme.palette.primary[200]}`,
            // color: theme.palette.primary.main,
            ...(ownerState.variant === "filled" && {
              "&:hover": {
                backgroundColor: theme.palette.primary,
              },
              "&.Mui-focused": {
                backgroundColor: theme.palette.primary,
              },
            }),
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "1px",
            color: `${theme.palette.primary[50]} !important`,
          },
          "& .MuiInputLabel-root": {
            fontSize: "16px",
            color: `${theme.palette.primary[50]} !important`,
          },
          // "& .MuiInputLabel-root + div .MuiInputBase-input": {
          //   color: "#707070 !important",
          // },

          "& .MuiInputBase-input": {
            fontSize: 16,
            fontWeight: 400,
            [theme.breakpoints.up("xl")]: {
              fontSize: 18,
            },
          },
        }),
      },
    },
    // MuiIconButton: {
    //   styleOverrides: {},
    //   defaultProps: { variant: "square" },
    //   variants: [
    //     {
    //       props: { variant: "square" },
    //       style: ({ theme }) => ({
    //         borderRadius: "4px",
    //         background: theme.palette.primary.main,
    //         cursor: "pointer",
    //         "&:hover": {
    //           background: theme.palette.primary.main,
    //         },
    //         "& .MuiSvgIcon-root path": {
    //           fill: theme.palette.primary.contrastText,
    //         },
    //       }),
    //     },
    //     {
    //       props: { variant: "circle" },
    //       style: ({ theme }) => ({
    //         boxShadow: theme.shadows[2],
    //         borderRadius: "100%",
    //         background: "transparent",
    //       }),
    //     },
    //   ],
    // },
    MuiSvgIcon: {
      styleOverrides: {
        colorError: ({ theme }) => ({
          color: theme.palette.error.main,
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: () => ({
          "& .MuiAutocomplete-popupIndicator": {
            transform: "none !important",
          },
          "& .MuiInput-root::before": {
            borderBottom: `1px solid red !important`,
          },
          "& .MuiInput-underline.MuiInput-underline": {
            border: `none !important`,
          },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 40,
          "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
            backgroundColor: `${theme.palette.neutral[200]} !important`,
          },
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        root: () => ({
          paddingTop: "0 !important",
        }),
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          alignItems: "flex-start",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: () => ({
          marginBottom: "-8px",
        }),
      },
    },
    MuiStepContent: {
      styleOverrides: {
        root: () => ({
          marginTop: "-8px",
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: ({ theme }) => ({
          fontSize: "1rem",
          fontWeight: 400,
          color: theme.palette.text.primary,
          [theme.breakpoints.up("md")]: {
            fontSize: "1.25rem",
          },
        }),
        h5: ({ theme }) => ({
          fontSize: "0.875rem",
          fontWeight: 400,
          color: theme.palette.text.secondary,
          [theme.breakpoints.up("md")]: {
            fontSize: "1.125rem",
          },
        }),
        h6: ({ theme }) => ({
          fontSize: "0.75rem",
          fontWeight: 400,
          color: theme.palette.text.secondary,
          [theme.breakpoints.up("md")]: {
            fontSize: "1rem",
          },
        }),
        subtitle2: ({ theme }) => ({
          fontSize: "0.625rem", //10px
          fontWeight: 400,
          color: theme.palette.text.secondary,
          [theme.breakpoints.up("md")]: {
            fontSize: "0.875rem", //14px
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: "32px",
          "& .Mui-selected": {
            color: `${theme.palette.primary.main} !important`,
            fontWeight: 500,
          },
        }),
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
        fixed: ({ theme }) => ({
          "& .MuiTabs-flexContainer": {
            padding: "0px",
          },
          "& .MuiTab-root": {
            fontSize: "16px",
            padding: "0px",
            minHeight: "28px",
            textTransform: "none",
            fontWeight: 400,
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          },
        }),
        flexContainer: ({ theme }) => ({
          gap: theme.spacing(4),
        }),
      },
    },
  },
};
