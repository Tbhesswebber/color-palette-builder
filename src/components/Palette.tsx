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
    margin: 0;
    padding: 0;
    line-height: 1em;
    // approximate light or dark text based on background
    background: inherit;
    color: transparent;
    background-clip: text;
    font-weight: bold;
    font-size: clamp(10px, calc(10cqw - 3px), 24px);
    filter: invert(100%) grayscale(100%) contrast(9000%);

    display: none;
    opacity: 0;
    will-change: opacity, display;
    transition: opacity 700ms ease-in-out;
  }

  &:hover code {
    display: block;
    opacity: 1;
    transition: opacity 705ms ease-in-out;
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
            basis="0%"
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
    <PaletteWrapper flex="grow" direction="column" gap="xsmall">
      {colors}
    </PaletteWrapper>
  );
}
