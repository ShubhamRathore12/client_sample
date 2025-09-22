import type { Color, Theme } from "@mui/material";
import type { SimplePaletteColorOptions } from "@mui/material/styles";
import { createTheme as createMuiTheme } from "@mui/material/styles";

import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";
import { lightThemeOptions } from "./light-theme-options";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    link: PaletteColorOptions;
    alert: {
      blue: string;
      green: string;
      orange: string;
      red: string;
    };
    neutral: PaletteColorOptions;
    tertiary: {
      black: string;
      white: string;
      gray: string;
      cream: string;
    };
    green: Partial<Color>;
    blue: Partial<Color>;
    red: Partial<Color>;
    teal: Partial<Color>;
    orange: Partial<Color>;
  }

  interface Palette {
    link: PaletteColorOptions;
    alert: {
      blue: string;
      green: string;
      orange: string;
      red: string;
    };
    neutral: PaletteColorOptions;
    tertiary: {
      black: string;
      white: string;
      gray: string;
      cream: string;
    };
    green: Partial<Color>;
    blue: Partial<Color>;
    red: Partial<Color>;
    teal: Partial<Color>;
    orange: Partial<Color>;
  }

  interface PaletteColorOptions extends SimplePaletteColorOptions, Partial<Color> {
    green?: string;
    blue?: string;
    orange?: string;
  }

  interface PaletteColor extends Partial<Color> {
    green?: string;
    blue?: string;
    orange?: string;
  }

  interface TypeText {
    placeholder: string;
  }
}

export type ThemeType = "light" | "dark";

export const createTheme = (themeType: ThemeType): Theme => {
  const theme = createMuiTheme(
    themeType === "dark" ? darkThemeOptions : lightThemeOptions,
    baseThemeOptions
  );

  return theme;
};
