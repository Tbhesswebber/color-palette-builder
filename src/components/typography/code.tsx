import { Text, TextExtendedProps } from "grommet";
import React from "react";
import { styled } from "styled-components";
import { Font } from "../../theme/constants";
import { themeEdgeSize, themeColor, themeMode } from "../../utils/styled";

const CodeElement = styled(Text).attrs({ forwardedAs: "code" })`
  margin: 0 ${themeEdgeSize("hair")};
  padding: 0 0.2em;

  font-size: 1.25em;

  background-color: ${themeColor("lightGrey")};

  border-radius: ${themeEdgeSize("xxsmall")};

  color: color-mix(in oklch, currentColor, ${themeMode("black", "white")} 25%);
  font-family: ${Font.Mono};
`;

export function Code(props: TextExtendedProps) {
  return (
    <CodeElement
      {...props}
    />
  );
}
