import { Box } from "grommet";
import { useValues } from "kea";
import { ColorForm } from "./ColorForm";
import { oklchFormLogic } from "../../../logics/oklchFormLogic";
import { Palette } from "../../Palette";
import { applyColorsToTheme } from "../../../theme";
import React from "react";
import { Layout } from "../../Layout";

export function OklchFormulaic(): JSX.Element {
  const { greys, colors, cssVars, tintCount } = useValues(oklchFormLogic);

  const theme = React.useMemo(() => {
    return applyColorsToTheme({
      // there are two extra shades in the grey scale for white and black
      black: `var(--colors_black_${tintCount + 2 - 1})`,
      hint: {
        dark: `var(--colors_secondary_${Math.round((tintCount) / 2) - Math.floor((tintCount) / 4)})`,
        light: `var(--colors_secondary_${Math.round((tintCount) / 2) + Math.floor((tintCount) / 4) - 1})`,
      },
      primary:  `var(--colors_primary_${Math.floor((tintCount) / 2 + 0.25) - 1})`,
      secondary:  `var(--colors_secondary_${Math.floor((tintCount) / 2 + 0.25) - 1})`,
      grey: {
        light: `var(--colors_black_${Math.round((tintCount) / 2) - Math.floor((tintCount) / 3)})`,
        dark: `var(--colors_black_${Math.round((tintCount) / 2) + Math.floor((tintCount) / 3)})`,
      }
    });
  }, []);

  console.log({colors: colors.length, count: tintCount})

  return (
    <Layout theme={theme} cssVars={cssVars}>
      <ColorForm />
      <Box
        direction="row"
        basis="100%"
        height={{ min: "300px" }}
        justify="between"
        gap="xsmall"
      >
        <Palette prefix="colors_black" count={greys.length} />
        {colors.map((paletteColors, index) => (
          <Palette
            key={paletteColors[0]?.css}
            prefix={`colors_${index}`}
            count={tintCount}
          />
        ))}
      </Box>
    </Layout>
  );
}
