import { Box } from "grommet";
import { Palette } from "../Palette";
import React, { PropsWithChildren } from "react";
import { Color, useColorLogicValues } from "../../logics/colorLogic";

export function ColorPage({ children }: PropsWithChildren): JSX.Element {
  const { greys, colors, tintCount, namedColors: allNamedColors } = useColorLogicValues();
  const namedColors = (Object.entries(allNamedColors) as [string, Color[]][]).filter(
    ([name]) => ["primary", "secondary"].includes(name) === false
  );

  return (
    <>
      {children}
      <Box
        direction="row"
        basis="100%"
        height={{ min: "300px" }}
        flex="grow"
        justify="between"
        align="stretch"
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
      {namedColors.length > 0 && (
        <Box
          direction="row"
          basis="100%"
          height={{ min: "100px" }}
          flex="grow"
          justify="between"
          align="stretch"
          gap="xsmall"
        >
          {namedColors.map(([, paletteColors]) => (
            <Palette
              key={paletteColors[0]?.css}
              prefix={`colors_${paletteColors[0].paletteName}`}
              count={paletteColors.length}
            />
          ))}
        </Box>
      )}
    </>
  );
}
