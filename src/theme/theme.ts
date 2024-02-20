import { ThemeType } from "grommet";
import { Font } from "./constants";

export const customTheme: ThemeType = {
  global: {
    colors: {
      control: "primary",
      error: "oklch(59.31% 0.1904 20.53)",
      white: "var(--colors_black_0)",
      text: { dark: "white", light: "black" },
      focus: "grey",
    },
    breakpoints: {
      small: {
        value: 400,
      },
      medium: {
        value: 800,
      },
      large: {
        value: undefined,
      },
    },
    font: {
      "family": Font.SansSerif
    }
  },
  icon: {
    size: {
      small: "12px",
      medium: "20px",
      large: "32px",
      xlarge: "48px",
    },
  },
  anchor: {
    color: "primary"
  },
  button: {
    padding: { horizontal: "16", vertical: "12" },
    size: {
      small: {
        iconOnly: { pad: "8" },
      },
      medium: {
        iconOnly: { pad: "12px" },
      },
      large: {
        iconOnly: { pad: "16px" },
      },
    },
    default: {
      color: "primary",
      background: "transparent",
    },
    primary: {
      background: { color: "primary" },
      color: "text",
    },
    secondary: {
      border: { color: "primary", width: "1px" },
      color: "primary",
    },
  },
};
