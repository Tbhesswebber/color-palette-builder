import { DefaultTheme } from "styled-components";
import { TShirtSize, TShirtSizeExtended } from "../theme/constants";
import { ThemeType } from "../theme/theme";
import { GlobalTheme } from "../theme/themeParts/global";

export function props<T, K extends keyof T = keyof T>(
  key: K,
  defaultValue?: T[K]
): (props: T) => T[K] | undefined {
  return (props) => props[key] ?? defaultValue;
}

export function themeMode<T, K = T>(
  lightValue: T,
  darkValue: K
): (props: { theme: DefaultTheme }) => T | K {
  return ({ theme }) => {
    if ("dark" in theme && theme["dark"]) {
      return darkValue;
    }
    return lightValue;
  };
}

export function themeColor(
  color: keyof GlobalTheme["colors"]
): (props: { theme: DefaultTheme }) => string {
  return ({ theme }) => {
    if (!theme) return "";
    const isDarkMode = !!theme["dark"];
    const colorValue = theme.global.colors[color];
    let retrievedValue: string;

    if (typeof colorValue === "string") {
      retrievedValue = colorValue;
    } else {
      retrievedValue = colorValue[isDarkMode ? "dark" : "light"];
    }

    if (retrievedValue in theme.global.colors) {
      return themeColor(
        retrievedValue as keyof GlobalTheme["colors"]
      )({ theme });
    }
    return retrievedValue;
  };
}

export function themeElevation(
  darkLevel:
    | keyof GlobalTheme["elevation"]["dark"]
    | keyof GlobalTheme["elevation"]["light"]
): (props: { theme: DefaultTheme }) => string {
  return ({ theme }) => {
    if (!theme) return "";
    const isDarkMode = !!theme["dark"];
    const modeValue =
      theme.global.elevation[isDarkMode ? "dark" : "light"][darkLevel];

    return modeValue;
  };
}

export function themeEdgeSize(
  size: keyof GlobalTheme["edgeSize"],
  defaultValue: string = ""
): (props: { theme: DefaultTheme }) => string {
  return ({ theme }) =>{
    const value = theme.global.edgeSize
    ? theme.global.edgeSize[size] ?? defaultValue
    : defaultValue;
    return value;
}}

export function themeText(
  size: keyof GlobalTheme["fontSize"],
  defaultValue: { size: string; height: string } = { size: "", height: "" }
): (props: { theme: DefaultTheme }) => { size: string; height: string } {
  return ({ theme }) => {
    return {...defaultValue, ...theme.global.fontSize[size]};
  };
}
