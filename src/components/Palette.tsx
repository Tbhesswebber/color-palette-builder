import React from "react";
import { Box, BoxExtendedProps } from "grommet";
import { styled } from "styled-components";
import { props } from "../utils/styled";
import { Code } from "./typography/code";

interface PaletteProps {
  count: number;
  prefix: string;
}

const PaletteWrapper = styled(Box)`
  container-name: swatch;
  container-type: inline-size;
`;

const Swatch = styled(Box)`
  code {
    background: inherit;
    color: transparent;
    background-clip: text;
    font-weight: bold;
    font-size: clamp(10px, calc(10cqw - 3px), 24px);
    filter: invert(0%) grayscale(0%) invert(0%) contrast(100%) invert(0%);
    filter: grayscale(0%) invert(0%) contrast(100%);
    filter: invert(100%) grayscale(100%) contrast(9000%);
    display: none;
    opacity: 0;
    will-change: opacity;
    transition: opacity 700ms ease-in-out;
  }
  
  &:hover code,
  &:focus code {
    display: revert;
    opacity: 1;
    transition: opacity 75ms ease-in-out;
  }

  @container swatch (max-width: 100px) {
    code {
      font-weight: 900;
    }
  }
`;

export function Palette({ count, prefix }: PaletteProps) {
  const colors = React.useMemo(
    () =>
      Array.from({ length: count }, (_, index): JSX.Element => {
        const cssVar = `--${prefix}_${index}`;
        const color = `var(${cssVar})`;
        return (
          <Swatch
            key={color}
            flex="grow"
            background={color}
            color={color}
            align="center"
            justify="center"
          >
            <Code>
              {cssVar}
            </Code>
          </Swatch>
        );
      }),
    [count, prefix]
  );

  return (
    <PaletteWrapper fill flex gap="xsmall">
      {colors}
    </PaletteWrapper>
  );
}
