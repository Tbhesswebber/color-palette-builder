import { Box } from "grommet";
import { Palette } from "../Palette";
import { applyColorsToTheme } from "../../theme/utils";
import React, { PropsWithChildren } from "react";
import { Layout } from "../Layout";
import { useColorLogicValues } from "../../logics/colorLogic";

export function ColorPage({children}: PropsWithChildren): JSX.Element {
  const { greys, colors, cssVars, tintCount } = useColorLogicValues();

  const theme = React.useMemo(() => {
    return applyColorsToTheme({
      // there are two extra shades in the grey scale for white and black
      black: `var(--colors_black_${tintCount + 2 - 1})`,
      hint: {
        dark: `var(--colors_secondary_${
          Math.round(tintCount / 2) - Math.floor(tintCount / 4)
        })`,
        light: `var(--colors_secondary_${
          Math.round(tintCount / 2) + Math.floor(tintCount / 4) - 1
        })`,
      },
      primary: `var(--colors_primary_${Math.floor(tintCount / 2 + 0.25) - 1})`,
      secondary: `var(--colors_secondary_${
        Math.floor(tintCount / 2 + 0.25) - 1
      })`,
      grey: {
        light: `var(--colors_black_${
          Math.round(tintCount / 2) - Math.floor(tintCount / 3)
        })`,
        dark: `var(--colors_black_${
          Math.round(tintCount / 2) + Math.floor(tintCount / 3)
        })`,
      },
    });
  }, [tintCount]);

  return (
    <Layout theme={theme} cssVars={cssVars}>
      {children}
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
