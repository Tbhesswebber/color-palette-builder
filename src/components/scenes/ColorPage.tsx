import { Box } from "grommet";
import { Palette } from "../Palette";
import React, { PropsWithChildren } from "react";
import { useColorLogicValues } from "../../logics/colorLogic";
import { styled } from "styled-components";

const PaletteContainer = styled(Box)`
  & > div {
    flex-grow: 1;
    transition: flex-grow 200ms ease-in-out;
  }
  & > div:hover {
    flex-grow: 1.25;
  }
`;

export function ColorPage({ children }: PropsWithChildren): JSX.Element {
  const { greys, colors, tintCount } = useColorLogicValues();

  return (
    <>
      {children}
      <PaletteContainer
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
      </PaletteContainer>
    </>
  );
}
