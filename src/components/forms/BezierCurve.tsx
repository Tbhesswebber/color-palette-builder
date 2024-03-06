import "react-bezier-curve-editor/index.css";
import React from "react";
import { BezierCurveEditor } from "react-bezier-curve-editor";
import { styled } from "styled-components";
import { Box, BoxProps } from "grommet";
import { props, themeColor } from "../../utils/styled";

interface ContainerProps extends BoxProps {
  line: string;
  secondaryLine: string;
  background: string;
  secondaryBackground: string;
}

const Container = styled(Box)<ContainerProps>`
  min-width: fit-content;

  .BezierCurveEditor_handle.BezierCurveEditor_active {
    box-shadow:
      0 0 4.5px 4.5px var(--bce-colors-handle-active-shadow),
      0 0 4px 4px currentColor;
  }

  --bce-sizes-curve-handle: 16px;
  --bce-padding-sm: 4px;
  --bce-padding-md: 8px;
  --bce-padding-lg: 12px;
  --bce-padding-xl: 16px;
  --bce-colors-handle-line: ${props("secondaryLine")};
  --bce-colors-curve-line: ${props("line")};
  --bce-colors-row: ${props("secondaryBackground")};
  --bce-colors-background: ${props("background")};
  --bce-colors-outerarea: ${themeColor("black")};
  --bce-colors-axisline: transparent;
  --bce-colors-handle-fixed: ${props("line")};
  --bce-colors-handle-start: ${themeColor("primary")};
  --bce-colors-handle-end: ${themeColor("secondary")};
  --bce-colors-preview: white;
  --bce-colors-preview-border: black;
  --bce-colors-handle-active-shadow: rgba(0, 0, 0, 0.25);
`;

export type BezierValue = [number, number, number, number];

export interface BezierCurveProps extends BoxProps {
  value: BezierValue;
  handleChange: (value: BezierValue) => void;
}

export const BezierCurve = React.forwardRef(function BezierCurveComponent({value, handleChange, ...props}: BezierCurveProps, ref: React.Ref<HTMLDivElement>) {

  return (
    <Container
      ref={ref}
      {...props}
      background="transparent"
      secondaryBackground="var(--colors_black_7)"
      line="var(--colors_black_0)"
      secondaryLine="var(--colors_black_1)"
    >
      <BezierCurveEditor value={value} onChange={handleChange} size={200}/>
    </Container>
  );
})
