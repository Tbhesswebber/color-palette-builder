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
  container-name: palette;
  container-type: inline-size;
`;

const Swatch = styled(Box)`
  container-name: swatch;
  container-type: size;

  code {
    margin: 0;
    padding: 0;
    line-height: 1em;
    // approximate light or dark text based on background
    background: inherit;
    color: transparent;
    background-clip: text;
    filter: invert(100%) grayscale(100%) contrast(9000%);

    visibility: hidden;
    /* display: none; */
    opacity: 0;
    will-change: opacity, display;
    transition: opacity 200ms ease-in-out;
  }

  &:hover code {
    visibility: visible;
    /* display: block; */
    opacity: 1;
    transition: opacity 150ms ease-in-out;
  }

  @container swatch (min-width: 0px) {
    code {
      line-height: 40cqh;
      font-size: 35cqh;
    }
  }

  @container swatch (max-height: 40px) {
    code {
      font-weight: 650;
    }
  }
`;

export function Palette({ count, prefix }: PaletteProps) {
  const cssVariables = React.useMemo(
    () =>
      Array.from({ length: count }, (_, index): string => {
        return `--${prefix}_${index}`;
      }),
    [count, prefix]
  );
  const colors = React.useMemo(
    () =>
      cssVariables.map((cssVar): () => JSX.Element => {
        const color = `var(${cssVar})`;
        return () => {
          const [computedColor, getComputedSwatchColor] = useComputedColor(cssVar)
          
          return (
          <Swatch
            flex="grow"
            basis="0%"
            background={color}
            color={color}
            align="center"
            justify="center"
            onMouseEnter={getComputedSwatchColor}
          >
            <Code>
              {computedColor ?? cssVar}
            </Code>
          </Swatch>
        );}
      }),
    [count, prefix]
  );

  return (
    <PaletteWrapper flex="grow" direction="column" gap="xsmall">
      {colors.map((Color, index) => <Color key={cssVariables[index]} />)}
    </PaletteWrapper>
  );
}

function useComputedColor(cssVar: string): [string, React.MouseEventHandler] {
  const [computedColor, setComputedColor] = React.useState(cssVar);

  React.useEffect(() => {
    getComputedStyle(document.body).getPropertyValue(cssVar);
  }, [cssVar])

  const handleHover = function getComputedSwatchColor(event: React.MouseEvent<HTMLDivElement>): void {
    setComputedColor(getComputedStyle(document.body).getPropertyValue(cssVar));
  }

  return [computedColor, handleHover];
}
