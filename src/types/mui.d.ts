import "@mui/material/Button";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tiny: true;
    "primary-light": true;
    "primary-dark": true;
    submit: true;
    link: true;
  }
}

declare module "@mui/material/styles" {
  // ✅ Extend custom background keys here
  interface TypeBackground {
    error?: string;
    verify?: string;
    border?: string;
    accentBg?: string;
    header?: string;
    shadow?: string;
    boxBorder?: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }

  interface TypographyVariants {
    l1: TypographyStyleOptions;
    l2: TypographyStyleOptions;
    body3: TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    l1?: TypographyStyleOptions;
    l2?: TypographyStyleOptions;
    body3?: TypographyStyleOptions;
  }

  interface TypeText {
    placeholder: string;
    info: string;
    error: string;
    verify: string;
    heading: string;
    success: string;
    green: string;
    greenBackground: string;
    red: string;
    redBackground: string;
    yellow: string;
    yellowBackground: string;
    gray: string;
    grayBackground: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    l1: true;
    l2: true;
    body3: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonProps {
    variant?: "square" | "circle";
  }
}
