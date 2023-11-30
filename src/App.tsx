import styled, { StyleSheetManager } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { oklchFormLogic, type Formula } from "./logics/oklchFormLogic";
import { Palette } from "./Palette";
import { ColorForm } from "./ColorForm";
import { useValues } from "kea";
import { Box, Grommet } from "grommet";
import { applyColorsToTheme } from "./theme";
import React from "react";
import { ModeToggle, useModeToggle } from "./ModeToggle";
import isPropValid from "@emotion/is-prop-valid";

const AppWrapper = styled(Box)`
  height: 100dvh;
  width: 100dvw;
  min-height: 100dvh;
  max-width: 100dvw;
`;

export function App() {
  const [mode, toggle] = useModeToggle("system");
  const { greys, colors, cssVars, tintCount } = useValues(oklchFormLogic);

  const theme = React.useMemo(() => {
    return applyColorsToTheme({
      // there are two extra shades in the grey scale for white and black
      black: `var(--colors_black_${tintCount + 2 - 1})`,
      hint: {
        dark: `var(--colors_secondary_${Math.round((tintCount) / 2) - Math.floor((tintCount) / 4)})`,
        light: `var(--colors_secondary_${Math.round((tintCount) / 2) + Math.floor((tintCount) / 4) - 1})`,
      },
      primary:  `var(--colors_primary_${Math.floor((tintCount) / 2 + 0.25) - 1})`,
      secondary:  `var(--colors_secondary_${Math.floor((tintCount) / 2 + 0.25) - 1})`,
      grey: {
        light: `var(--colors_black_${Math.round((tintCount) / 2) - Math.floor((tintCount) / 3)})`,
        dark: `var(--colors_black_${Math.round((tintCount) / 2) + Math.floor((tintCount) / 3)})`,
      }
    });
  }, [tintCount]);

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Grommet
        full
        options={{
          box: { cssGap: true },
          drop: { checkContainingBlock: true },
        }}
        theme={theme}
        themeMode={mode === "system" ? "auto" : mode}
      >
        <GlobalStyles vars={cssVars} />
        <AppWrapper
          direction="column"
          pad="medium"
          gap="medium"
          background={{dark: "black", light: "white"}}
        >
          <ModeToggle mode={mode} toggle={toggle}/>
          <ColorForm />
          <Box direction="row" basis="100%" justify="between" gap="xsmall">
            <Palette prefix="colors_black" count={greys.length} />
            {colors.map((paletteColors, index) => (
              <Palette
                key={paletteColors[0]?.css}
                prefix={`colors_${index}`}
                count={tintCount}
              />
            ))}
          </Box>
        </AppWrapper>
      </Grommet>
    </StyleSheetManager>
  );
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: any) {
    if (typeof target === "string") {
        // For HTML elements, forward the prop if it is a valid HTML attribute
        return isPropValid(propName);
    }
    // For other elements, forward all props
    return true;
}
