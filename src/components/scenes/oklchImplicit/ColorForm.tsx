import { FieldProps, Form } from "kea-forms";
import React from "react";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Field } from "../../forms/Field";
import { RangeInput } from "../../forms/RangeInput";
import { FormulaInput } from "../../forms/FormulaInput";
import { Code } from "../../typography/code";
import { ControlGridArea, useRangeGrid } from "./hooks/useRangeGrid";
import { BezierCurve } from "../../forms/BezierCurve";
import { oklchImplicitFormLogic } from "../../../logics/oklchImplicitLogic";
import { styled } from "styled-components";
import { useMeasure } from "react-use";

const CurveContainer = styled(Box)`
  flex-wrap: wrap;
  /* 24px at 650px screen width, 192px at 1300px screen width */
  gap: clamp(24px, -9rem + 25.846153846153847vw, 192px);
`;

const contentWidth = {
  min: "fit-content",
} as const;

export function ColorForm() {
  const rangeGrid = useRangeGrid();

  const [chromaRef, { height: chromaHeight }] = useMeasure<HTMLDivElement>();
  const [lightnessRef, { height: lightnessHeight }] =
    useMeasure<HTMLDivElement>();
  const [hueRef, { height: hueHeight }] = useMeasure<HTMLDivElement>();
  const [containerRef, { height: containerHeight }] =
    useMeasure<HTMLDivElement>();
  const isHueWrapped = containerHeight - chromaHeight >= hueHeight;
  const isLightnessWrapped = containerHeight - chromaHeight >= lightnessHeight;

  return (
    <Form logic={oklchImplicitFormLogic} formKey="colorForm" enableFormOnSubmit>
      <Box direction="column" flex gap="medium">
        <Grid
          columns={rangeGrid.columns}
          rows={rangeGrid.rows}
          areas={rangeGrid.areas}
        >
          <Field
            name={ControlGridArea.TintCount}
            label="Colors Per Hue"
            area={rangeGrid.areas ? ControlGridArea.TintCount : undefined}
          >
            <RangeInput
              min="5"
              max="15"
              name="tintCount"
              id="tintCount"
              step="1"
            ></RangeInput>
          </Field>
          <Field
            name={ControlGridArea.CenterPoint}
            label="Origin"
            area={rangeGrid.areas ? ControlGridArea.CenterPoint : undefined}
          >
            <RangeInput
              min="0"
              max="360"
              step="1"
              name="centerPoint"
              id="centerPoint"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.AnalogousHueCount}
            label="Analogous Hues"
            area={
              rangeGrid.areas ? ControlGridArea.AnalogousHueCount : undefined
            }
          >
            <RangeInput
              min="0"
              max="10"
              step="1"
              name="analogousHueCount"
              id="analogousHueCount"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.AnalogousHueGap}
            label="Analogous Hue Spacing"
            area={rangeGrid.areas ? ControlGridArea.AnalogousHueGap : undefined}
          >
            <RangeInput
              min="0.01"
              minLabel={"Min Possible"}
              max="1"
              maxLabel={"Max Possible"}
              step="0.01"
              name="analogousHueGap"
              id="analogousHueGap"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.ComplementaryHueCount}
            label="Complementary Hues"
            area={
              rangeGrid.areas
                ? ControlGridArea.ComplementaryHueCount
                : undefined
            }
          >
            <RangeInput
              min="0"
              max="10"
              step="1"
              name={ControlGridArea.ComplementaryHueCount}
              id={ControlGridArea.ComplementaryHueCount}
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.ComplementaryHueGap}
            label="Complementary Hue Spacing"
            area={
              rangeGrid.areas ? ControlGridArea.ComplementaryHueGap : undefined
            }
          >
            <RangeInput
              min="0.01"
              minLabel={"Min Possible"}
              max="1"
              maxLabel={"Max Possible"}
              step="0.01"
              name="complementaryHueGap"
              id="complementaryHueGap"
            ></RangeInput>
          </Field>
        </Grid>

        <CurveContainer ref={containerRef} direction={"row"}>
          <Field
            name={"chromaFormula"}
            label="Chroma Shift"
            hint={
              <>
                The <Code>x</Code>-axis represents the tint progression
                <br />
                The <Code>y</Code>-axis represents the chroma
              </>
            }
            stack
            width={contentWidth}
            flex="grow"
            align={isHueWrapped ? "center" : "end"}
          >
            {({ value, onChange }) => (
              <BezierCurve
                value={value}
                handleChange={onChange}
                ref={chromaRef}
              />
            )}
          </Field>

          <Field
            name={"lightnessFormula"}
            label="Lightness Shift"
            hint={
              <>
                The <Code>x</Code>-axis represents the tint progression
                <br />
                The <Code>y</Code>-axis represents the lightness
              </>
            }
            stack
            width={contentWidth}
            align={isHueWrapped && !isLightnessWrapped ? "start" : "center"}
          >
            {({ value, onChange }) => (
              <BezierCurve
                ref={lightnessRef}
                value={value}
                handleChange={onChange}
              />
            )}
          </Field>

          <Field
            name={"hueFormula"}
            label="Hue Shift"
            hint={
              <>
                The <Code>x</Code>-axis represents the tint progression
                <br />
                The <Code>y</Code>-axis represents the hue
              </>
            }
            stack
            width={contentWidth}
            flex="grow"
            align={isHueWrapped ? "center" : "start"}
          >
            {({ value, onChange }) => (
              <BezierCurve value={value} handleChange={onChange} ref={hueRef} />
            )}
          </Field>
        </CurveContainer>
      </Box>
    </Form>
  );
}
