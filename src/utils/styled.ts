import { ThemeType } from "grommet";

export function props<T, K extends keyof T = keyof T>(
  key: K,
  defaultValue?: T[K],
): (props: T) => T[K] | undefined {
  return (props) => props[key] ?? defaultValue;
}

export function themeMode<T, K = T>(
  lightValue: T,
  darkValue: K
): (props: { theme: ThemeType }) => T | K {
  return ({ theme }) => {
    if ("dark" in theme && theme["dark"]) {
      return darkValue
    }
    return lightValue;
  };
}
