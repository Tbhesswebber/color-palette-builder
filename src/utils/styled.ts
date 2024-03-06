import { DefaultTheme } from "styled-components";
import { ThemeType } from "../theme/theme";

export function props<T, K extends keyof T = keyof T>(
  key: K,
  defaultValue?: T[K]
): (props: T) => T[K] | undefined {
  return (props) => props[key] ?? defaultValue;
}

export function themeMode<T, K = T>(
  lightValue: T,
  darkValue: K
): (props: { theme: ThemeType }) => T | K {
  return ({ theme }) => {
    if ("dark" in theme && theme["dark"]) {
      return darkValue;
    }
    return lightValue;
  };
}

export function themeColor(
  color: keyof Required<ThemeType["global"]>["colors"]
): (props: { theme: DefaultTheme }) => string {
  return ({ theme }) => {
    const colorValue = theme.global.colors[color];
    if (typeof colorValue === "string") {
      return colorValue;
    }
    return colorValue["dark" in theme && theme["dark"] ? "dark" : "light"];
  };
}
