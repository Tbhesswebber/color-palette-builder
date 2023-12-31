import { ThemeType, grommet } from "grommet";
import { deepMerge } from "grommet/utils";

const customTheme: ThemeType = {
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
  },
  icon: {
    size: {
      small: "12px",
      medium: "20px",
      large: "32px",
      xlarge: "48px",
    },
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

export function applyColorsToTheme(
  colors: Record<string, string | { dark: string; light: string } | undefined>
) {
  return deepMerge(grommet, customTheme, { global: { colors } });
}
