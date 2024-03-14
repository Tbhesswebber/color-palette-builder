import { Box } from "grommet";
import { Palette } from "../Palette";
import React, { PropsWithChildren } from "react";
import { useColorLogicValues } from "../../logics/colorLogic";

export function ColorPage({ children }: PropsWithChildren): JSX.Element {
  const { greys, colors, tintCount } = useColorLogicValues();

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
    </>
  );
}
