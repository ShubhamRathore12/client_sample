import type { PaletteOptions, ThemeOptions } from "@mui/material";

// Colors

const neutral = {
  90: "#424242",
  80: "#5D5D5D",
  70: "#6B6B6B",
  60: "#797979",
  50: "#868686",
  40: "#939393",
  30: "#A2A2A2",
  20: "#AFAFAF",
  10: "#BDBDBD",
  main: "#0ca750",
  primary: "#0d0d0d",
  secondary: "#2a394e",
};

const background: PaletteOptions["background"] = {
  default: "#141a1f",
  paper: "#2b2c36",
};

const divider: PaletteOptions["divider"] = "#d1d1d1";

const primary: PaletteOptions["primary"] = {
  contrastText: "#fff",
  green: "#0CA750",
  blue: "#436AF5",
  50: "#7a7a7a", // input label
  100: "#a7a7a7", // input placeholder
  200: "#414452", // input underline
  300: "#414452", // outlined button border
  400: "#e9e9e9", // input
  500: "#fdfcfd", // helper text
  600: "#a7a7a7", // secondary
  700: "#e9e9e9", // outlined button text, subtitle2
  800: "#404352", // otp input border
  900: "#fcfbfd", // primary
  main: "#38439A",
};

const secondary = {
  light: "#dee1e2",
  main: "#7c7d7d",
  green: "#29F280",
  orange: "#FFAA00",
};

const tertiary = {
  black: "#222448",
  white: "#fff",
  gray: "#707070",
  cream: "#EEEEEE",
};

const alert = {
  blue: "#0065FF",
  green: "#00D35D",
  orange: "#ECB035",
  red: "#FF5630",
};

const success: PaletteOptions["success"] = {
  main: "#def2d6",
};

// const info: PaletteOptions["info"] = {};

const warning = {
  main: "#ffe2b4",
};

const error: PaletteOptions["error"] = {
  main: "#ff0000",
};

const text: PaletteOptions["text"] = {
  primary: "#DDDDDD",
  secondary: "#707070",
  disabled: "#A7A7A7",
};

const action: PaletteOptions["action"] = {
  disabled: "#d0e59e",
};

const link: PaletteOptions["link"] = {
  main: "#617dff",
  light: "#7a90f8",
};

const green = {
  700: "#1AC380",
  600: "#33C98D",
  500: "#66D7AA",
  400: "#99E4C6",
  300: "#CCF2E3",
};

const blue = {
  700: "#3183FF",
  600: "#4891FF",
  500: "#76ACFF",
  400: "#A3C8FF",
  300: "#D1E3FF",
  100: "#EAF0FF",
};

const red = {
  700: "#FF6745",
  600: "#FF7859",
  500: "#FF9A83",
  400: "#FFBBAC",
  300: "#FFDDD6",
};

const teal = {
  700: "#21CABA",
  600: "#4DD5C8",
  500: "#7ADFD6",
  400: "#A6EAE3",
  300: "#D3F4F1",
};

const orange = {
  700: "#FFB31A",
  600: "#FFC248",
  500: "#FFD176",
  400: "#FFE1A3",
  300: "#FFF0D1",
};

const shadows: ThemeOptions["shadows"] = [
  "none",
  "6px 12px 30px 2px rgba(0, 56, 255, 0.05)",
  "0px 0px 40px 8px rgba(0, 56, 255, 0.1)",
  "0px 0px 60px 12px rgba(0, 56, 255, 0.1)",
  "0px 0px 80px 8px rgba(0, 56, 255, 0.1)",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
];

export const darkThemeOptions: ThemeOptions = {
  components: {},
  palette: {
    action,
    alert,
    background,
    divider,
    error,
    neutral,
    mode: "dark",
    primary,
    secondary,
    tertiary,
    success,
    text,
    warning,
    link,
    green,
    blue,
    red,
    teal,
    orange,
  },
  shadows,
};
