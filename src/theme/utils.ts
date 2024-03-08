import { grommet } from "grommet";
import { ColorType, deepMerge } from "grommet/utils";
import { customTheme } from "./theme";

type Color = string | {dark: string, light: string}
export interface ExtendedThemeColors {
  hint: Color;
  primary: Color;
  secondary: Color;
  lightGrey: Color;
  grey: Color;
  darkGrey: Color;
}

export function applyColorsToTheme(
  colors: ExtendedThemeColors
) {
  return deepMerge(grommet, customTheme, { global: { colors } });
}
