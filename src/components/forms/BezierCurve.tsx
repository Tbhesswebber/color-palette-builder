import "react-bezier-curve-editor/index.css";
import React from "react";
import { BezierCurveEditor } from "react-bezier-curve-editor";
import { styled } from "styled-components";
import { Box, BoxProps } from "grommet";
import { themeColor } from "../../utils/styled";

const Container = styled(Box)`
  min-width: fit-content;
  margin: 0 auto;

  .BezierCurveEditor_root {
    pointer-events: none;
  }

  .BezierCurveEditor_handle {
    pointer-events: initial;
  }

  .BezierCurveEditor_handle.BezierCurveEditor_active {
    box-shadow:
      0 0 4.5px 4.5px var(--bce-colors-handle-active-shadow),
      0 0 4px 4px currentColor;
  }
  

  --bce-sizes-curve-handle: 24px;
  --bce-padding-sm: 4px;
  --bce-padding-md: 8px;
  --bce-padding-lg: 12px;
  --bce-padding-xl: 16px;
  --bce-colors-handle-line: ${themeColor("text")};
  --bce-colors-curve-line: ${themeColor("text")};
  --bce-colors-row: color-mix(in oklab, ${themeColor("grey")}, transparent 75%);
  --bce-colors-background: color-mix(
    in oklab,
    ${themeColor("darkGrey")},
    transparent 75%
  );
  --bce-colors-outerarea: transparent;
  --bce-colors-axisline: ${themeColor("background")};
  --bce-colors-handle-fixed: ${themeColor("text")};
  --bce-colors-handle-start: ${themeColor("primary")};
  --bce-colors-handle-end: ${themeColor("secondary")};
  --bce-colors-preview: ${themeColor("lightGrey")};
  --bce-colors-preview-border: ${themeColor("darkGrey")};
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
    >
      <BezierCurveEditor value={value} onChange={handleChange} size={200} />
    </Container>
  );
})
