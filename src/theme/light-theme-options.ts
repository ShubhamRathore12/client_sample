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
  // main: "#38439A",
  main: "#0ca750",
  primary: "#0d0d0d",
  secondary: "#2a394e",
  100: "#dce3ec",
  200: "#0171b1",
  300: "#ebebeb",
};

const background: PaletteOptions["background"] = {
  default: "#FFF",
  error: "#FFEFEF",
  verify: "#FAFAFF",
  border: "#EEEEEE",
  accentBg: "#F4F5FF",
  header: "#F6FAFD",
  shadow: "#0000001A",
  boxBorder: "#D0DBEB",
};

const divider: PaletteOptions["divider"] = "#d1d1d1";

const primary: PaletteOptions["primary"] = {
  contrastText: "#fff",
  blue: "#436AF5",
  // main: "#3F4599",
  main: "#0ca750",
  green: "#0CA750",
  50: "#6d7481", // input label
  100: "#c3c8ce", // input placeholder,
  200: "#cacdce", // input underline
  300: "#7070704d", // outlined button border
  400: "#71797e", // input
  500: "#2a394e", // helper text
  600: "#a7a7a7", // secondary
  700: "#707070", // outlined button text, subtitle2
  800: "#40424242", // otp input border
  900: "#22222F", // primary
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
  main: "#01B762",
};

// const info: PaletteOptions["info"] = {};

const warning = {
  main: "#ffe2b4",
};

const error: PaletteOptions["error"] = {
  main: "#ff0000",
  light: "#FFEFEF",
};

const text: PaletteOptions["text"] = {
  primary: "#22222F",
  secondary: "#707070",
  disabled: "#A7A7A7",
  placeholder: "#C3C8CE",
  info: "#1570EF",
  error: "#FF5630",
  verify: "#373F99",
  heading: "#424242",
  success: "#0CA750",
  green: "#165800",
  greenBackground: "#1658001A",
  red: "#A30000",
  redBackground: "#FDEAEA",
  yellow: "#A98400",
  yellowBackground: "#A9840029",
  gray: "gray",
  grayBackground: "#f0f0f0",
};

const action: PaletteOptions["action"] = {
  disabled: "#A7A7A7",
};

const link: PaletteOptions["link"] = {
  // main: "#3f5bd9",
  main: "#0ca750",
  light: "#3f5bd9",
};

const green = {
  700: "#1AC380",
  600: "#33C98D",
  500: "#66D7AA",
  400: "#99E4C6",
  300: "#CCF2E3",
  100: "#E7F7EE",
};

const blue = {
  700: "#3183FF",
  600: "#4891FF",
  500: "#76ACFF",
  400: "#A3C8FF",
  300: "#D1E3FF",
  100: "#ECF3FF",
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
  "6px 12px 15px 2px rgba(0, 56, 255, 0.05)",
  "0px 0px 20px 8px rgba(0, 56, 255, 0.05)",
  "0px 0px 60px 12px rgba(0, 56, 255, 0.1)",
  "0px 0px 80px 8px rgba(0, 56, 255, 0.1)",
  "6px 12px 30px 2px rgba(0, 56, 255, 0.07)",
  "0px -1px 20px rgba(0, 0, 0, 0.05)",
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

export const lightThemeOptions: ThemeOptions = {
  components: {},
  palette: {
    action,
    alert,
    background,
    divider,
    error,
    neutral,
    mode: "light",
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
