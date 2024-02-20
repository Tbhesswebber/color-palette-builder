import React from "react";
import { Box, BoxExtendedProps } from "grommet";
import { styled } from "styled-components";
import { props } from "../utils/styled";
import { Code } from "./typography/code";

interface PaletteProps {
  count: number;
  prefix: string;
}

const Swatch = styled(Box)`
  code {
    background: inherit;
    color: transparent;
    background-clip: text;
    font-weight: bold;
  }

  &:hover code,
  &:focus code {
    filter: invert(100%) grayscale(100%) invert(100%) contrast(9000%) invert(100%);
  }
`;

export function Palette({ count, prefix }: PaletteProps) {
  const colors = React.useMemo(
    () =>
      Array.from({ length: count }, (_, index): JSX.Element => {
        const color = `var(--${prefix}_${index})`;
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
              {color}
            </Code>
          </Swatch>
        );
      }),
    [count, prefix]
  );

  return (
    <Box fill flex gap="xsmall">
      {colors}
    </Box>
  );
}
