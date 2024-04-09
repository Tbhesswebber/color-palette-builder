import React from 'react'
import {
  HeadingExtendedProps,
  ParagraphExtendedProps,
  ThemeContext,
  ThemeType as GrommetThemeType,
} from "grommet";
import { themeColor, themeEdgeSize, themeElevation, themeMode, themeText } from '../utils/styled';
import { global, GlobalTheme } from './themeParts/global';
import {css} from "styled-components"

type SafeThemeType = {
  theme: {
    global: GlobalTheme;
    dark: boolean;
  };
};

export const customTheme = {
  global,
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
    extend: ({ theme }: SafeThemeType) => `
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
      extend: ({ theme }: SafeThemeType) =>
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
      color: "green",
      opacity: 1,
      height: "4px",
    },
  },
  tabs: {
    gap: "xsmall",
    header: {
      extend: css`
        & > button[role="tab"]:active,
        & > button[role="tab"]:focus,
        & > button[role="tab"] {
          box-shadow: none;
        }
      `,
    },
    extend: css`
      & [role="tablist"] > button:has(> div > svg) > div {
        margin: 0;
        padding: ${themeEdgeSize("xxsmall", "18px")};
      }

      & [role="tablist"] > button:has(> div > svg) {
        box-shadow: ${themeElevation("xsmall")};
        background-color: ${themeMode(
          `var(--colors_white)`,
          `var(--colors_black)`
        )};
      }
    `,
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
    margin: "none",
    pad: "xsmall",
    extend: css`
      font-size: ${themeText("xsmall")};
    `,
  },
  tag: {
    background: "transparent",
  },
  text: {
    ...global.fontSize,
  },
} as const satisfies GrommetThemeType;

type Theme = {
  global: GlobalTheme;
  dark: boolean;
};

export type ThemeType = Theme & GrommetThemeType;
export function useThemeContext() {
  return React.useContext<ThemeType>(ThemeContext as React.Context<ThemeType>);
}
