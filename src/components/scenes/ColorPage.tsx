import { Box, Heading } from "grommet";
import { Palette } from "../Palette";
import React, { PropsWithChildren } from "react";
import { Color, useColorLogicValues } from "../../logics/colorLogic";
import { styled } from "styled-components";

export const enum ColorPageGrid {
  Colors = "colors",
  Greys = "greys",
  System = "system"
}

interface ColorPageProps {
  children: React.ReactNode;
  showLabels?: boolean;
}

export function ColorPage({ children, showLabels }: ColorPageProps): JSX.Element {
  const shouldShowLabels = showLabels !== false;
  const {
    greys,
    colors,
    tintCount,
    namedColors: allNamedColors,
  } = useColorLogicValues();
  const namedColors = (
    Object.entries(allNamedColors) as [string, Color[]][]
  ).filter(([name]) => ["primary", "secondary"].includes(name) === false);

  return (
    <>
      {children}
      <Box
        justify="between"
        gridArea={ColorPageGrid.Colors}
        className={ColorPageGrid.Colors}
      >
        {shouldShowLabels && (
          <Heading level="3" alignSelf="center">
            Standard Palette
          </Heading>
        )}
        <Box fill direction="column" wrap align="stretch" justify="stretch">
          {colors.map((paletteColors, index) => (
            <Palette
              key={paletteColors[0]?.css}
              prefix={`colors_${index}`}
              count={tintCount}
            />
          ))}
        </Box>
      </Box>

      {namedColors.length > 0 && (
        <Box
          direction="column"
          justify="between"
          gridArea={ColorPageGrid.System}
          className={ColorPageGrid.System}
        >
          {shouldShowLabels && (
            <Heading level="3" alignSelf="center">
              System Colors
            </Heading>
          )}
          <Box
            direction="row"
            height={{ min: "100px" }}
            justify="between"
            flex="grow"
            align="stretch"
          >
            {namedColors.map(([, paletteColors]) => (
              <Palette
                key={paletteColors[0]?.css}
                prefix={`colors_${paletteColors[0].paletteName}`}
                count={paletteColors.length}
                direction="column"
              />
            ))}
          </Box>
        </Box>
      )}

      <Box
        direction="column"
        justify="between"
        gridArea={ColorPageGrid.Greys}
        className={ColorPageGrid.Greys}
      >
        {shouldShowLabels && (
          <Heading level="3" alignSelf="center">
            Grey Scale
          </Heading>
        )}
        <Palette
          prefix="colors_black"
          direction="column"
          count={greys.length}
        />
      </Box>
    </>
  );
}
