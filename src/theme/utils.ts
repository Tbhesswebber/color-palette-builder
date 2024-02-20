import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { customTheme } from "./theme";

export function applyColorsToTheme(
  colors: Record<string, string | { dark: string; light: string } | undefined>
) {
  return deepMerge(grommet, customTheme, { global: { colors } });
}
