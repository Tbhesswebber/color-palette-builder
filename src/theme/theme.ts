import React from 'react'
import {
  HeadingExtendedProps,
  ParagraphExtendedProps,
  ThemeContext,
  ThemeType as GrommetThemeType,
} from "grommet";
import { A } from "kea-router";
import { DefaultTheme } from "styled-components";
import { Font, TShirtSizeExtended } from "./constants";
import { ExtendedThemeColors, ThemeMode } from "./utils";

export const customTheme = {
  global: {
    colors: {
      control: "secondary",
      error: "oklch(59.31% 0.1904 20.53)",
      white: "var(--colors_white)",
      black: "var(--colors_black)",
      text: { dark: "var(--colors_white)", light: "var(--colors_black)" },
      focus: "grey",
      border: "lightGrey",
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
    elevation: {
      light: {
        none: "none",
        xsmall:
          "0px 1px 2px color-mix(in oklab, var(--colors_black), transparent 50%)",
        small:
          "0px 2px 4px color-mix(in oklab, var(--colors_black), transparent 50%)",
        medium:
          "0px 3px 8px color-mix(in oklab, var(--colors_black), transparent 50%)",
        large:
          "0px 6px 12px color-mix(in oklab, var(--colors_black), transparent 50%)",
        xlarge:
          "0px 8px 16px color-mix(in oklab, var(--colors_black), transparent 50%)",
      },
      dark: {
        none: "none",
        xsmall:
          "0px 1px 2px color-mix(in oklab, var(--colors_white), transparent 50%)",
        small:
          "0px 2px 4px color-mix(in oklab, var(--colors_white), transparent 50%)",
        medium:
          "0px 3px 8px color-mix(in oklab, var(--colors_white), transparent 50%)",
        large:
          "0px 6px 12px color-mix(in oklab, var(--colors_white), transparent 50%)",
        xlarge:
          "0px 8px 16px color-mix(in oklab, var(--colors_white), transparent 50%)",
      },
    },
    font: {
      family: Font.SansSerif,
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
  anchor: {
    color: "primary",
    extend: `&:focus {
      box-shadow: none;
    }`,
  },
  button: {
    extend: ({ theme }: { theme: GlobalTheme }) => `
      transition: box-shadow 100ms ease-in-out;
      will-change: box-shadow;
      box-shadow: ${
        theme.global.elevation[theme.dark ? "dark" : "light"].small
      };
      
      &:focus:not(:focus-visible) {
        box-shadow: ${
          theme.global.elevation[theme.dark ? "dark" : "light"].small
        };
      }
      
      /* active theme property doesn't seem to be applied correctly */
      &&:active {
        box-shadow: inset ${
          theme.global.elevation[theme.dark ? "dark" : "light"].xsmall
        };
        transition-duration: 50ms;
      }
      `,
    padding: { horizontal: "16px", vertical: "12px" },
    size: {
      small: {
        iconOnly: { pad: "8px" },
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
      background: { opacity: 1, color: { dark: "black", light: "white" } },
    },
    primary: {
      background: { color: "primary" },
      color: "text",
    },
    secondary: {
      border: { color: "primary", width: "1px" },
      color: "primary",
      background: { opacity: 1, color: { dark: "black", light: "white" } },
    },
    hover: {
      extend: ({ theme }: { theme: GlobalTheme }) =>
        `box-shadow: ${
          theme.global.elevation[theme.dark ? "dark" : "light"].xsmall
        };
        transition-duration: 300ms;`,
    },
  },
  heading: {
    extend: ({ margin }: HeadingExtendedProps) =>
      margin
        ? ""
        : `&:not(& + &):not(p + &) {margin-top: clamp(8px, 2vw + 0.5rem, 16px);}`,
  },
  menu: {
    drop: {
      align: { top: "bottom", left: "left" },
      round: "xsmall",
      margin: { bottom: "small" },
    },
  },
  paragraph: {
    extend: ({ margin }: ParagraphExtendedProps) =>
      margin
        ? ""
        : `
      margin: clamp(8px, 2vw + 0.5rem, 16px) 0;

      &:where(& + &) {
        margin-top: 0;
      } 
    `,
  },
  rangeInput: {
    thumb: { color: "primary" },
    track: {
      color: "#fff",
      opacity: 1,
      lower: { color: "blue" },
      height: "4px",
    },
  },
  tabs: {
    header: {
      extend: `
        & > button[role=tab]:active,
        & > button[role=tab]:focus,
        & > button[role=tab] {
          box-shadow: none;
        }
      `,
    },
  },
  tab: {
    active: {
      color: "text",
    },
    border: {
      color: "grey",
      active: { color: "primary" },
    },
    color: "darkGrey",
    disabled: {
      color: "lightGrey",
    },
    hover: {
      background: "lightGrey",
    },
    pad: "small",
  },
  tag: {
    background: "transparent",
  },
} as const satisfies GrommetThemeType;

type GlobalTheme = {
  global: {
    colors: ExtendedThemeColors;
    elevation: ThemeMode<Record<TShirtSizeExtended, string>>;
  };
  dark: boolean;
};

export type ThemeType = typeof customTheme & GlobalTheme & GrommetThemeType;
export function useThemeContext() {
  return React.useContext<ThemeType>(ThemeContext as React.Context<ThemeType>);
}
