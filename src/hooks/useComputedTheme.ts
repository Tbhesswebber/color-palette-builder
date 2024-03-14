import React from "react";
import { useColorLogicValues } from "../logics/colorLogic";
import { applyColorsToTheme } from "../theme/utils";

export function useComputedTheme() {
     const { cssVars, tintCount } = useColorLogicValues();

     const theme = React.useMemo(() => {
      const greyCount = tintCount + 2;
       return applyColorsToTheme({
         // there are two extra shades in the grey scale for white and black
         hint: "grey",
         primary: `var(--colors_primary_${
           Math.floor(tintCount / 2 + 0.25) - 1
         })`,
         secondary: `var(--colors_secondary_${
           Math.floor(tintCount / 2 + 0.25) - 1
         })`,
         lightGrey: {
           light: `var(--colors_black_${Math.round(greyCount / 4) - 1})`,
           dark: `var(--colors_black_${Math.round((greyCount / 4) * 3) - 1})`,
         },
         grey: {
           light: `var(--colors_black_${Math.round((greyCount) / 2) - 1})`,
           dark: `var(--colors_black_${Math.round((greyCount) / 2) - 1})`,
         },
         darkGrey: {
           light: `var(--colors_black_${
             Math.round(greyCount * (3 / 4)) - 1
           })`,
           dark: `var(--colors_black_${
             Math.round((greyCount) * (1 / 4)) - 1
           })`,
         },
         error: "red",
         errorDark: {dark: "color-mix(in oklab, red, white)", light: "color-mix(in oklab, red, black)"},
         errorLight: {dark: "color-mix(in oklab, red, black)", light: "color-mix(in oklab, red, white)"},
         success: "green",
         successDark: {dark: "color-mix(in oklab, green, white)", light: "color-mix(in oklab, green, black)"},
         successLight: {dark: "color-mix(in oklab, green, black)", light: "color-mix(in oklab, green, white)"},
         warning: "yellow",
         warningDark: {dark: "color-mix(in oklab, yellow, white)", light: "color-mix(in oklab, yellow, black)"},
         warningLight: {dark: "color-mix(in oklab, yellow, black)", light: "color-mix(in oklab, yellow, white)"},
         info: "blue",
         infoDark: {dark: "color-mix(in oklab, blue, white)", light: "color-mix(in oklab, blue, black)"},
         infoLight: {dark: "color-mix(in oklab, blue, black)", light: "color-mix(in oklab, blue, white)"},
       });
     }, [tintCount]);

     const values = React.useMemo(() => ({cssVars, theme}), [cssVars, theme]);

     return [values]
}
