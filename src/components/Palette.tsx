import React from "react";
import { Box, BoxExtendedProps} from "grommet";
import { styled } from "styled-components";
import { props } from "../utils/styled";
import { Code } from "./typography/code";

interface PaletteProps extends BoxExtendedProps {
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
  border-radius: 2px;
  margin: 2px;

  code {
    margin: 0;
    padding: 0;
    line-height: 1em;
    font-size: clamp(8.5px, 5.67cqw + 0rem, 17px);

    // approximate light or dark text based on background
    background: inherit;
    color: transparent;
    background-clip: text;
    // avoids some edge cases where the color is too mid-tone to invert
    text-shadow: 0px 0px 0px #0000000d;
    filter: invert(100%) grayscale(100%) contrast(9000%);

    visibility: hidden;
    opacity: 0;
    will-change: opacity, display;
    transition: opacity 2000ms ease-in-out;
    white-space: nowrap;
  }

  &:hover code {
    visibility: visible;
    opacity: 1;
    transition: opacity 150ms ease-in-out;
  }

  @container swatch (max-width: 150px) {
    && code {
      visibility: hidden;
    }
  }
`;

export function Palette({ count, prefix, ...props }: PaletteProps) {
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
            basis="fit-content"
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
    <PaletteWrapper flex="grow" direction="row" {...props}>
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
