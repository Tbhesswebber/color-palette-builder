import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { customTheme } from "./theme";

export type ThemeMode<T> = {dark: T, light: T}
type Color = string | ThemeMode<string>;

type ExtendedThemeColorName =
  | "hint"
  | "primary"
  | "secondary"
  | "lightGrey"
  | "grey"
  | "darkGrey"
  | "success"
  | "successDark"
  | "successLight"
  | "warning"
  | "warningDark"
  | "warningLight"
  | "error"
  | "errorDark"
  | "errorLight"
  | "info"
  | "infoDark"
  | "infoLight";
export type ExtendedThemeColors = Record<ExtendedThemeColorName, Color>;

export function applyColorsToTheme(colors: ExtendedThemeColors) {
  return deepMerge(grommet, customTheme, { global: { colors } });
}
