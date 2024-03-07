import { Box, BoxExtendedProps, ThemeContext } from "grommet";
import React from "react";
import { styled } from "styled-components";
import { Font } from "../../theme/constants";
import { themeMode } from "../../utils/styled";

const CodeElement = styled(Box).attrs({ forwardedAs: "code" })`
  font-family: ${Font.Mono};
  color: color-mix(in oklch, currentColor, ${themeMode("black", "white")} 25%);
`;

export function Code(props: BoxExtendedProps) {
  return (
    <CodeElement
      pad={{ horizontal: "0.2rem", vertical: "0.1rem" }}
      round="xxsmall"
      style={{ display: "inline-block", lineHeight: "1em" }}
      background="lightGrey"
      margin={{ horizontal: "hair" }}
      {...props}
    />
  );
}
